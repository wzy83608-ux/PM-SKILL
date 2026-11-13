#!/usr/bin/env node
// Local-only, dependency-free report rendering. No product interaction or network access.
import fs from 'node:fs/promises';
import path from 'node:path';

const [input, destination] = process.argv.slice(2);
if (!input || !destination) {
  console.error('Usage: node render-report.mjs <run.json> <output-directory>');
  process.exit(2);
}
const inputPath = path.resolve(input), out = path.resolve(destination);
const run = JSON.parse(await fs.readFile(inputPath, 'utf8'));
const arrays = ['summary','environment','flow','results','cases','issues','data','limits','evidence'];
for (const key of arrays) {
  if (!Array.isArray(run[key])) throw new Error(`${key} must be an array`);
}
for (const key of ['title','system','period','generatedAt']) {
  if (typeof run[key] !== 'string' || !run[key].trim()) throw new Error(`Missing ${key}`);
}
const statuses = new Set(['passed','failed','blocked','not_tested']);
const issueStatuses = new Set(['confirmed','suggestion','needs_confirmation','ignored','fixed','not_reproduced']);
const severity = new Set(['P0','P1','P2','P3']);
const evidence = new Map(), caseIds = new Set();
function unique(items, kind) {
  const ids = new Set();
  for (const item of items) {
    if (!item.id || ids.has(item.id)) throw new Error(`Missing/duplicate ${kind} id: ${item.id}`);
    ids.add(item.id);
  }
  return ids;
}
unique(run.evidence, 'evidence'); unique(run.issues, 'issue'); unique(run.flow, 'flow');
for (const c of run.cases) {
  if (!c.id || caseIds.has(c.id)) throw new Error(`Missing/duplicate case id: ${c.id}`);
  caseIds.add(c.id);
  if (!statuses.has(c.status)) throw new Error(`Invalid case status: ${c.id}`);
  for (const k of ['module','role','entry','expected','basis','actual']) {
    if (typeof c[k] !== 'string' || !c[k].trim()) throw new Error(`Case ${c.id}: missing ${k}`);
  }
  if (!Array.isArray(c.steps) || !c.steps.length) throw new Error(`Case ${c.id}: steps required`);
}
for (const i of run.issues) {
  if (!issueStatuses.has(i.status)) throw new Error(`Invalid issue status: ${i.id}`);
  if (i.status === 'confirmed' && (!severity.has(i.severity) || !i.evidence?.length)) {
    throw new Error(`Confirmed issue ${i.id} needs severity and evidence`);
  }
  for (const id of i.caseIds || []) if (!caseIds.has(id)) throw new Error(`Unknown case ${id}`);
}

// Validate all inputs before writing any output. Determine MIME from bytes, not filenames.
for (const e of run.evidence) {
  if (!e.path || !e.caption) throw new Error(`Evidence ${e.id}: path/caption required`);
  const source = path.resolve(path.dirname(inputPath), e.path);
  const bytes = await fs.readFile(source);
  let ext;
  if (bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) ext = '.png';
  else if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) ext = '.jpg';
  else if (bytes.toString('ascii',0,4) === 'RIFF' && bytes.toString('ascii',8,12) === 'WEBP') ext = '.webp';
  else throw new Error(`Unsupported/corrupt screenshot ${e.id}: ${source}`);
  const file = `screenshots/${String(evidence.size+1).padStart(3,'0')}${ext}`;
  evidence.set(e.id, {...e, source, bytes, file});
}
for (const item of [...run.cases,...run.issues,...run.flow,...run.results]) {
  if (item.evidence != null && !Array.isArray(item.evidence)) throw new Error('evidence references must be arrays');
  for (const id of item.evidence || []) if (!evidence.has(id)) throw new Error(`Unknown evidence ${id}`);
}

const esc = v => String(v ?? '—').replaceAll('&','&amp;').replaceAll('<','&lt;')
  .replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const text = v => esc(v).replaceAll('\n','<br>');
const labels = {passed:'通过',failed:'未通过',blocked:'阻塞',not_tested:'未测试',confirmed:'已确认缺陷',suggestion:'体验建议',needs_confirmation:'规则待确认',ignored:'暂时忽略',fixed:'已修复',not_reproduced:'本轮未复现'};
const list = values => `<ol>${(values || []).map(v=>`<li>${text(v)}</li>`).join('\n')}</ol>`;
const refs = ids => (ids || []).map(id=>`<a href="#ev-${evidence.get(id).file.split('/')[1].split('.')[0]}">${esc(id)}</a>`).join(' · ') || '—';
const badge = state => `<span class="tag ${esc(state)}">${esc(labels[state] || state)}</span>`;
function table(headers, rows) {
  return rows.length ? `<div class="table"><table><thead><tr>${headers.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>\n${rows.map(r=>`<tr>${r.map(v=>`<td>${v}</td>`).join('')}</tr>`).join('\n')}\n</tbody></table></div>` : '<p class="meta">未记录适用内容。</p>';
}
function section(id, title, content) { return `<section id="${id}"><h2>${esc(title)}</h2>\n${content}</section>`; }
const css = `
*{box-sizing:border-box}body{margin:0;background:#f4f7fb;color:#203047;font:15px/1.75 "Microsoft YaHei",Arial,sans-serif}
header,section,nav,footer{max-width:1200px;margin:24px auto;padding:28px 36px;background:#fff;border:1px solid #dae3ef;border-radius:12px}
header{border-top:5px solid #2563eb}h1{font-size:32px;margin:8px 0}h2{font-size:23px;color:#174993}h3{font-size:18px}p{margin:10px 0}
nav{display:flex;flex-wrap:wrap;gap:18px;padding:16px 36px}a{color:#2463d9}section.notice{background:#fff6ed;border-color:#f6c28e}
.table{overflow:auto}table{border-collapse:collapse;width:100%;font-size:14px}th,td{padding:12px 14px;border:1px solid #dbe3ef;text-align:left;vertical-align:top;overflow-wrap:anywhere}th{background:#eef4ff;color:#244a80}
article{border-top:1px solid #e0e7f1;padding:20px 0}.tag{display:inline-block;padding:1px 9px;border-radius:5px;font-size:13px;background:#e5edff;color:#2459b1}
.failed,.confirmed{background:#fee2e2;color:#b91c1c}.passed,.fixed{background:#dcfce7;color:#166534}.blocked,.needs_confirmation{background:#fff0d2;color:#9b5b00}.ignored,.not_tested,.not_reproduced{background:#e8edf2;color:#526173}
.meta,figcaption{color:#64748b}.summary{display:flex;gap:12px;flex-wrap:wrap}.summary div{flex:1;min-width:135px;background:#f0f5ff;border-radius:8px;padding:15px}.summary strong{display:block;font-size:24px;color:#1d4ed8}
figure{margin:18px 0;min-width:0}img{width:100%;height:auto;border:1px solid #dce4ef;border-radius:6px}figcaption{font-size:13px}.gallery{display:grid;grid-template-columns:1fr 1fr;gap:22px}footer{font-size:13px;color:#64748b}ol{padding-left:22px}details{margin:12px 0}summary{cursor:pointer;font-weight:bold}
@media(max-width:700px){header,section,nav,footer{margin:10px;padding:18px}.gallery{grid-template-columns:1fr}h1{font-size:26px}}
@media print{nav{display:none}body{background:#fff}section{border:0}figure{break-inside:avoid}.table{overflow:visible}.gallery{grid-template-columns:1fr}img{max-height:650px;object-fit:contain}}
html{scroll-behavior:smooth;scroll-padding-top:24px}body{padding-left:248px}
#report-sidebar{position:fixed;inset:0 auto 0 0;width:232px;background:#fff;border-right:1px solid #dae3ef;padding:28px 18px;overflow-y:auto;z-index:20}
#report-sidebar .side-title{font-size:18px;font-weight:700;color:#174993;margin:0 10px 18px}
#report-sidebar nav{display:flex;flex-direction:column;gap:5px;border:0;border-radius:0;padding:0;margin:0;background:none}
#report-sidebar a{display:block;padding:10px 12px;border-radius:7px;text-decoration:none;color:#475569;font-size:14px}
#report-sidebar a:hover,#report-sidebar a.active{background:#edf4ff;color:#1d4ed8}
#case-filters{display:flex;align-items:end;flex-wrap:wrap;gap:14px;padding:18px;background:#f5f8fd;border:1px solid #dbe3ef;border-radius:9px;margin:18px 0}
#case-filters label{display:flex;flex-direction:column;gap:5px;font-size:13px;color:#526173}
#case-filters select,#case-filters input,#case-filter-reset{font:inherit;color:#203047;background:#fff;border:1px solid #bdcce0;border-radius:6px;min-height:38px;padding:7px 10px}
#case-search{width:240px}#case-filter-reset{cursor:pointer}#case-filter-count{font-size:13px;color:#526173;flex-basis:100%}
#case-filter-empty{padding:24px;text-align:center;color:#64748b;border:1px dashed #bdcce0;border-radius:7px}[hidden]{display:none!important}
@media(max-width:1000px){body{padding-left:0}#report-sidebar{position:static;width:auto;padding:18px;border-right:0;border-bottom:1px solid #dae3ef}#report-sidebar nav{flex-direction:row;flex-wrap:wrap;gap:4px}#report-sidebar a{padding:7px 10px}}
@media print{body{padding-left:0}#report-sidebar,#case-filters,#case-filter-empty{display:none!important}}
`;
const counts = Object.fromEntries([...statuses].map(s=>[s,run.cases.filter(c=>c.status===s).length]));
const confirmed = run.issues.filter(i=>i.status==='confirmed').length;
const modules = [...new Set(run.cases.map(c=>c.module))];
let html = `<!doctype html>\n<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(run.title)}</title><style>${css}</style></head><body>
<header id="report-top"><div class="meta">${text(run.system)} · ${text(run.period)}</div><h1>${esc(run.title)}</h1><div class="summary"><div><strong>${run.cases.length}</strong>验收记录</div><div><strong>${counts.passed}</strong>通过</div><div><strong>${counts.failed}</strong>未通过</div><div><strong>${counts.blocked} / ${counts.not_tested}</strong>阻塞 / 未测</div><div><strong>${confirmed}</strong>当前确认缺陷</div><div><strong>${run.results.length}</strong>核对对象</div><div><strong>${evidence.size}</strong>截图</div></div></header>
${section('conclusion','验收结论',run.summary.map(s=>`<p>${text(s)}</p>`).join('\n')).replace('<section','<section class="notice"')}
<aside id="report-sidebar" aria-label="报告章节菜单"><div class="side-title">验收报告</div><nav aria-label="章节导航">${[['report-top','报告首页'],['conclusion','验收结论'],['baseline','环境基线'],['flow','实际流转'],['results','对象结果'],['issues','异常与建议'],['coverage','模块覆盖'],['cases','用例明细'],['data','测试数据'],['limits','未覆盖范围'],['gallery','截图全集']].map(([id,name])=>`<a href="#${id}">${name}</a>`).join('\n')}</nav></aside>
`;
html += section('baseline','一、测试环境与基线',table(['项目','记录'],run.environment.map(e=>[text(e.item),text(e.value)])));
html += section('flow','二、实际操作与角色流转',table(['编号','角色／入口','操作','接收者','状态变化','单据／证据'],run.flow.map(f=>[text(f.id),`${text(f.actor)}<br>${text(f.entry)}`,text(f.action),text(f.recipient),`${text(f.before)} → ${text(f.after)}`,`${text(f.record)}<br>${refs(f.evidence)}`])));
html += section('results','三、逐人或逐对象结果核对',table(['对象／身份','目标或预期','实际值','最终结果','状态','证据'],run.results.map(r=>[`${text(r.subject)}<br>${text(r.role)}`,text(r.target),text(r.actual),text(r.result),text(r.status),refs(r.evidence)])));
let issues = '';
for (const state of issueStatuses) {
  const items = run.issues.filter(i=>i.status===state);
  if (!items.length) continue;
  issues += `<h3>${esc(labels[state])}（${items.length}）</h3>\n`;
  for (const i of items) issues += `<article><h3>${badge(state)} ${esc(i.id)} ${esc(i.severity || '')} · ${esc(i.title)}</h3><p class="meta">阶段：${text(i.phase)} · 角色：${text(i.role)} · 对象：${text(i.object)}</p><p><strong>前置：</strong>${text(i.preconditions)}</p><strong>复现步骤：</strong>${list(i.steps)}<p><strong>预期与依据：</strong>${text(i.expected)}<br>${text(i.basis)}</p><p><strong>实际表现：</strong>${text(i.actual)}</p><p><strong>影响：</strong>${text(i.impact)}</p><p><strong>复核／确认：</strong>${text(i.recheck)}</p><p><strong>建议：</strong>${text(i.recommendation)}</p><p>用例：${esc((i.caseIds||[]).join('、'))} · 证据：${refs(i.evidence)}</p></article>\n`;
}
html += section('issues','四、异常、建议与业务口径',issues || '<p>本轮未记录问题；结论仅限实际执行范围。</p>');
html += section('coverage','五、模块覆盖',table(['模块','通过','失败','阻塞','未测'],modules.map(m=>[esc(m),...['passed','failed','blocked','not_tested'].map(s=>String(run.cases.filter(c=>c.module===m && c.status===s).length))])));
const filterControls=`<div id="case-filters" role="search" aria-label="验收结果筛选"><label for="case-result">验收结果<select id="case-result"><option value="all">全部（${run.cases.length}）</option>${[...statuses].map(s=>`<option value="${s}">${labels[s]}（${counts[s]}）</option>`).join('')}</select></label><label for="case-search">关键词<input id="case-search" type="search" placeholder="搜索编号、模块、角色、操作或结果"></label><button id="case-filter-reset" type="button">重置筛选</button><div id="case-filter-count" role="status" aria-live="polite">显示 ${run.cases.length} / ${run.cases.length} 项验收记录</div></div><p class="meta">筛选只影响下方记录显示，不改变报告总计和原始证据。</p><noscript><p>当前未启用JavaScript，全部验收记录仍可阅读；启用后可使用筛选。</p></noscript>`;
html += section('cases','六、验收用例明细',filterControls+(run.cases.map(c=>`<article data-case-status="${c.status}"><h3>${esc(c.id)} · ${esc(c.module)} ${badge(c.status)}</h3><p class="meta">阶段：${text(c.phase)} · 角色：${text(c.role)} · 入口：${text(c.entry)}</p><p><strong>前置：</strong>${text(c.preconditions)}</p>${list(c.steps)}<p><strong>预期与依据：</strong>${text(c.expected)}<br>${text(c.basis)}</p><p><strong>实际：</strong>${text(c.actual)}</p><p>证据：${refs(c.evidence)}</p></article>`).join('\n') || '<p>未执行测试。</p>')+'<div id="case-filter-empty" hidden>没有符合条件的验收记录，请调整筛选条件。</div>');
html += section('data','七、测试数据与最终状态',table(['对象','ID','变更','最终状态'],run.data.map(d=>[text(d.object),text(d.id),text(d.change),text(d.finalState)])));
html += section('limits','八、未覆盖与限制',list(run.limits));
html += section('gallery','九、截图全集',`<div class="gallery">${[...evidence.values()].map((e,index)=>`<figure id="ev-${String(index+1).padStart(3,'0')}"><a href="${e.file}" target="_blank" rel="noopener"><img loading="lazy" src="${e.file}" alt="${esc(e.caption)}"></a><figcaption><strong>${esc(e.id)}</strong> · ${text(e.phase)} · ${text(e.caption)}</figcaption></figure>`).join('\n')}</div>`);
html += `<footer>生成日期：${text(run.generatedAt)}。本报告基于记录中的实际测试与可见证据，未测试内容不视为通过。分享时请携带 screenshots 目录。</footer>
<script id="report-interactions">
(()=>{
const records=Array.from(document.querySelectorAll('#cases article[data-case-status]'));
const select=document.getElementById('case-result'),search=document.getElementById('case-search'),count=document.getElementById('case-filter-count'),empty=document.getElementById('case-filter-empty');
function applyFilters(){const query=search.value.trim().toLocaleLowerCase();let visible=0;records.forEach(record=>{const matches=(select.value==='all'||record.dataset.caseStatus===select.value)&&(!query||record.textContent.toLocaleLowerCase().includes(query));record.hidden=!matches;if(matches)visible++});count.textContent='显示 '+visible+' / '+records.length+' 项验收记录';empty.hidden=visible!==0}
select.addEventListener('change',applyFilters);search.addEventListener('input',applyFilters);document.getElementById('case-filter-reset').addEventListener('click',()=>{select.value='all';search.value='';applyFilters()});applyFilters();
const links=Array.from(document.querySelectorAll('#report-sidebar a'));
function active(id){links.forEach(a=>{const selected=a.getAttribute('href')==='#'+id;a.classList.toggle('active',selected);if(selected)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}
links.forEach(a=>a.addEventListener('click',()=>active(a.getAttribute('href').slice(1))));active(location.hash.slice(1)||'report-top');
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);if(visible.length)active(visible[0].target.id)},{rootMargin:'-5% 0px -65% 0px',threshold:0});document.querySelectorAll('section[id],header[id]').forEach(e=>observer.observe(e))}
})();
</script></body></html>`;
// Avoid giant one-line documents and executable content originating from product text.
html = html.replaceAll('><','>\n<');
await fs.mkdir(path.join(out,'screenshots'),{recursive:true});
// Prevent overwriting a distinct input image with generated evidence filenames.
for (const e of evidence.values()) {
  const target = path.join(out,e.file);
  try {
    const existing = await fs.readFile(target);
    if (!existing.equals(e.bytes)) throw new Error(`Output collision: ${target}; choose a fresh output directory`);
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
}
for (const e of evidence.values()) await fs.writeFile(path.join(out,e.file),e.bytes);
await fs.writeFile(path.join(out,'report.html'),html,'utf8');
// The original run.json remains authoritative; store an output-local snapshot with copied image paths.
const snapshot = {...run,evidence:run.evidence.map(e=>({...e,path:evidence.get(e.id).file}))};
await fs.writeFile(path.join(out,'run.json'),JSON.stringify(snapshot,null,2)+'\n','utf8');
console.log(JSON.stringify({report:path.join(out,'report.html'),cases:run.cases.length,confirmedIssues:confirmed,screenshots:evidence.size},null,2));
