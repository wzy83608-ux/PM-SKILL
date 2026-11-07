# run.json 记录契约

报告生成器只读本地JSON和引用截图，不操作受测系统，不调用网络。Node.js 18+，无第三方依赖。

```text
node scripts/render-report.mjs /path/run.json /path/report-output
```

`run.json` 相对图片路径相对于该 JSON 所在目录。输出目录内 `report.html` 引用复制后的 `screenshots/`；整个目录是可移交报告。

## 字段

- `title`、`system`、`period`、`generatedAt`：字符串，使用实际值。
- `summary`：字符串数组，记录验收结论及限制，不作无证据推断。
- `environment`：`[{item,value}]`，地址、版本、阶段、范围、时区、账号角色；密码不写入。
- `flow`：`[{id,actor,entry,action,recipient,before,after,record,evidence:[]}]`。
- `results`：`[{subject,role,target,actual,result,status,evidence:[]}]`；一行一个唯一对象/人，重叠身份在 role 内说明。实际值与计算值可写为可读字符串。
- `cases`：`[{id,module,phase,role,entry,preconditions,steps:[],expected,basis,actual,status,evidence:[]}]`。每一项字段都应有实际记录；尚未执行的 `actual` 写“未执行”，状态 not_tested。
- `issues`：`[{id,title,status,severity,phase,role,object,preconditions,steps:[],expected,basis,actual,impact,recheck,recommendation,caseIds:[],evidence:[]}]`。confirmed 必须有P0/P1/P2/P3及证据。ignored在recheck写用户确认/排除依据，不记为当前缺陷。
- `data`：`[{object,id,change,finalState}]`，记录新建/修改测试数据及保留状态。
- `limits`：字符串数组，明确未测范围与工具限制。
- `evidence`：`[{id,path,caption,phase}]`；id 唯一，图片存在且为真实PNG/JPEG/WebP。记录引用这些id。

HTML 中所有文本按纯文本转义，禁止把UI内容当作可执行HTML。每条 case/issue/flow/result 的 evidence 引用必须存在。渲染器验证记录和图片基本完整性，但不判断测试是否真实执行，不能替代人工/AI的视觉核对。

## 最小形状（结构示意，不得当已执行记录）

```json
{
  "title": "系统名称产品验收报告",
  "system": "用户指定的环境",
  "period": "实际测试起止时间及角色范围",
  "generatedAt": "实际生成日期",
  "summary": ["根据实际记录填写结论"],
  "environment": [],
  "flow": [],
  "results": [],
  "cases": [],
  "issues": [],
  "data": [],
  "limits": ["尚未执行时不可声明通过"],
  "evidence": []
}
```
