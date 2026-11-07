# Codex Skills 分类库

本地个人 Skill 快照，整理日期：2026-11-07。共 **52 个 Skill**，分为五类。

所有 Skill 保持在 `skills/<原目录名>/` 下，分类通过本目录和索引实现，保留跨 Skill 的相对路径。包含 SKILL.md、脚本、参考资料、模板及原有许可证。

## 产品需求（5）

| Skill | 用途 |
|---|---|
| [demand-analysis](skills/demand-analysis/SKILL.md) | 分析用户反馈、业务问题或早期需求，区分 FACT、HYPOTHESIS 和 UNKNOWN，通过使用者角色推演识别核心问题、用户目标、需求目的、场景、影响及信息缺口。Huly 可作为可选证据源；不编写 PRD、不排列优先级、不修改外部系统。 |
| [requirement-review](skills/requirement-review/SKILL.md) | 独立审查需求分析或问题定义的清晰度、证据强度、一致性、可追溯性和信息缺口，并从使用者真实状态评估需求的实用性与用户价值，给出通过、修正或需人工确认的结论。Huly 是可选证据源；不判断优先级、不设计方案、不修改外部系统。 |
| [priority-evaluation](skills/priority-evaluation/SKILL.md) | 对单条需求或需求池进行有证据支持的 P0/P1/P2/P3 评估，比较用户价值、业务影响、时效性、风险、成本、依赖和相对顺序。可使用 Huly 或用户资料；不依赖固定记录库、不设计方案、不修改外部系统。 |
| [product-design](skills/product-design/SKILL.md) | 根据明确需求、约束和证据生成并比较产品方案，细化用户流程、业务规则、状态、异常、权限、信息架构和验收标准。可使用 Huly 或用户资料；不依赖固定版本库、不编写 PRD、不修改外部系统。 |
| [prd-document](skills/prd-document/SKILL.md) | 按统一产品需求文档格式，根据可核验依据生成、整理和审查可追溯 PRD。只输出有依据且适用的模块；流程图必须作为图片直接显示在PRD正文中，原型图提供经验证的本地文件地址；证据不足时不补写、不捏造。 |

## 项目与交付（9）

| Skill | 用途 |
|---|---|
| [meeting-decisions](skills/meeting-decisions/SKILL.md) | 将会议记录、录音转写或讨论材料整理为可追溯的会议纪要、正式决策、分歧、待确认事项和行动项。面向承担项目推进工作的产品经理；不把讨论意见冒充最终决定，也不在未授权时写回 Huly。 |
| [project-management](skills/project-management/SKILL.md) | 基于已批准范围整理项目目标、里程碑、工作流、Owner、依赖、风险、假设和变更，为兼顾项目管理的产品经理形成项目计划与管理判断；不替代研发估算或技术项目管理。 |
| [progress-monitoring](skills/progress-monitoring/SKILL.md) | 根据可验证交付物、任务状态、依赖和最新证据监控项目进度，识别计划偏差、阻塞、关键路径和恢复动作。面向产品经理的推进与升级判断；不凭主观印象生成完成百分比。 |
| [product-delivery-management](skills/product-delivery-management/SKILL.md) | 独立整理会议决策、项目计划、进度、测试质量、发布准备、数据和复盘，可按用户资料覆盖一个或多个管理维度，生成产品项目周报或综合交付总览；不依赖其他 Skill。 |
| [test-quality](skills/test-quality/SKILL.md) | 从产品经理视角检查验收标准覆盖、核心流程、关键缺陷、权限、数据正确性、回归范围和残余风险，形成测试质量与发布阻塞判断；不执行测试，也不替 QA 声明测试通过。 |
| [product-acceptance](skills/product-acceptance/SKILL.md) | 对 Web、桌面或移动产品执行细致的功能验收、多角色业务闭环、权限与数据核对，保存可追溯截图并生成图文 HTML 验收报告。适用于全系统验收、专项复测和版本回归；不用于仅审查测试计划而不实际操作的任务。 |
| [release-operations](skills/release-operations/SKILL.md) | 从产品经理视角检查发布范围、灰度、兼容、迁移、监控、回退、沟通和值守准备，形成发布就绪判断；不执行部署、配置、数据库操作、回滚或其他生产变更。 |
| [data-analysis](skills/data-analysis/SKILL.md) | 围绕产品问题定义指标口径、时间范围、分群和数据来源，分析变化、限制及决策含义。用于产品经理的数据判断与效果评估；不补造数据，也不在缺乏实验或识别策略时声称因果。 |
| [retrospective-evaluation](skills/retrospective-evaluation/SKILL.md) | 对照原目标、批准版本和实际结果开展产品项目复盘，识别有效做法、失效假设、决策与交付问题，并形成可归属、可验证的改进项；不做追责式总结或事后诸葛亮式判断。 |

## 连接与写入工具（2）

| Skill | 用途 |
|---|---|
| [connection-toolkit](skills/connection-toolkit/SKILL.md) | 配置、验证和排查 Huly 只读访问，按 ID、标题或检索计划读取 Issue、Document、Card 及关联资料。适用于连接检查、资料读取和检索故障排查；不分析需求、不做产品决策、不修改 Huly。 |
| [write-api](skills/write-api/SKILL.md) | Build and test a local Node.js API for safe Huly document writes using environment-provided credentials and exact-match append semantics. Use for scaffolding, configuring, validating, or troubleshooting Huly write integrations; do not use for blind full-document overwrite or deletion. |

## 设计与图示（2）

| Skill | 用途 |
|---|---|
| [design-agents](skills/design-agents/SKILL.md) | Route product design work to specialized UI, UX, brand, research, visual storytelling, inclusive imagery, and design-review guidance. Use for interface design, design systems, UX architecture or research, persona walkthroughs, brand consistency, image prompts, visual narratives, delight, and pre-ship UI critique. |
| [fireworks-tech-graph](skills/fireworks-tech-graph/SKILL.md) | 技术流程与架构图示，支持SVG、PNG和HTML等导出。 |

## 广告投放（34）

| Skill | 用途 |
|---|---|
| [ads](skills/ads/SKILL.md) | "Operate professional paid advertising across Google, Meta, YouTube, LinkedIn, TikTok, Microsoft, Apple, Amazon, Reddit, Pinterest, Snapchat, and X. Use for account intake, source-grounded audits, strategy, budget and measurement planning, creative production, experiments, reporting, monitoring, and explicitly approved campaign changes. Also trigger on PPC, paid social, retail media, attribution, tracking, landing pages, cross-platform conversion totals, negative keywords or search terms, beta-feature scoring, stale platform claims, API-token or credential setup, campaign deletion, and safe Claude Ads installation or uninstall." |
| [ads-amazon](skills/ads-amazon/SKILL.md) | "Audit Amazon Ads profiles, regions, Sponsored Products, Sponsored Brands, Sponsored Display, DSP, portfolios, targeting, search terms, retail readiness, creative, budgets, ACOS, TACOS, reporting, and policy. Use for Amazon Ads, sponsored ads, Amazon PPC, ACOS, TACOS, ASIN advertising, Amazon DSP, or retail-media optimization." |
| [ads-apple](skills/ads-apple/SKILL.md) | "Audit Apple Ads measurement, AdServices and AdAttributionKit, campaign and keyword structure, Search Match, App Store placements, custom product pages, bidding, budgets, MMP reconciliation, and policy. Use for Apple Ads, Apple Search Ads, App Store ads, Search Match, custom product pages, AdServices, or Apple app-install campaigns." |
| [ads-attribution](skills/ads-attribution/SKILL.md) | "Audit cross-platform attribution, conversion definitions, reporting windows, GA4, AdServices and AdAttributionKit, MMPs, browser and server events, offline conversions, and platform reconciliation. Use for attribution audit, attribution models, conversion windows, requests to add or total Meta and Google conversions, incompatible reporting-window aggregation, GA4 attribution, MMP review, AppsFlyer, Adjust, Branch, Singular, or cross-platform discrepancies." |
| [ads-audit](skills/ads-audit/SKILL.md) | "Run a source-grounded paid-advertising audit for one or more of Google, Meta, YouTube, LinkedIn, TikTok, Microsoft, Apple, Amazon, Reddit, Pinterest, Snapchat, and X. Use for full ad checks, account health reviews, paid-media diagnostics, partial audits after authentication or worker failure, missing-platform weighting, beta-feature eligibility and scoring, spend audits, tracking audits, or prioritized opportunities and risks." |
| [ads-budget](skills/ads-budget/SKILL.md) | "Plan and review paid-media budgets, bidding, pacing, marginal return, forecasts, CPA, ROAS, MER, LTV:CAC, constraints, and allocation across supported platforms. Use for ad budget allocation, media budget, bidding strategy, scaling, spend pacing, budget forecast, ROAS target, or investment tradeoffs." |
| [ads-competitor](skills/ads-competitor/SKILL.md) | "Research competitor paid-ad presence, messaging, creative, formats, landing pages, keyword and auction signals, transparent ad libraries, and strategic gaps across supported platforms. Use for competitor ads, ad libraries, ad spy, competitive PPC analysis, competitor creative, Google Ads Transparency, Meta Ad Library, or paid-media competitor research." |
| [ads-create](skills/ads-create/SKILL.md) | "Create source-grounded paid-ad campaign concepts, messaging, copy, creative briefs, and production plans from a validated brand profile, campaign objective, platform requirements, and optional audit evidence. Triggers on: campaign brief, campaign concepts, create a campaign, ad concepts, ad copy, ad messaging, creative brief, headlines, descriptions." |
| [ads-creative](skills/ads-creative/SKILL.md) | "Audit paid-ad copy, images, video, hooks, concepts, format coverage, platform-native fit, message match, creative fatigue, accessibility, and policy across supported platforms. Use for creative audit, ad creative, creative fatigue, creative diversity, ad copy review, video review, image review, or production priorities." |
| [ads-dna](skills/ads-dna/SKILL.md) | "Extract a public-safe brand and offer profile for paid advertising from an authorized website and operator input. Triggers on: brand DNA, brand profile, brand identity, brand style, brand colors, brand voice, visual identity, style guide, website brand analysis." |
| [ads-generate](skills/ads-generate/SKILL.md) | "Generate paid-ad image assets from a validated creative brief and brand profile using an explicitly configured image provider. Triggers on: generate ads, generate ad images, create ad creatives, create ad images, make ad images, generate visuals, make campaign visuals, generate images from campaign brief." |
| [ads-google](skills/ads-google/SKILL.md) | "Audit Google Ads measurement, Search, Shopping, Performance Max, Demand Gen, YouTube-linked inventory, keywords and search terms, negative-keyword generation or review, creative assets, bidding, budgets, settings, and policy. Use for Google Ads, AdWords, Search campaigns, search terms reports, broad negatives, Shopping, Performance Max, PMax, Demand Gen, GAQL, Google conversion tracking, or Google campaign optimization." |
| [ads-landing](skills/ads-landing/SKILL.md) | "Audit paid-ad landing pages for message match, mobile experience, performance, accessibility, trust, forms, consent, tracking, security, and conversion friction. Use for landing-page audit, post-click experience, LP audit, conversion-rate optimization, form optimization, ad-to-page message match, redirects, blocked navigation, or requests involving private, loopback, link-local, or metadata IP destinations." |
| [ads-launch](skills/ads-launch/SKILL.md) | "Draft or explicitly apply a paid-ad campaign launch through Claude Ads capability-gated adapters. Use for campaign creation, launch plans, publishing ads, activating campaigns, uploading creative, or requests to push a campaign live." |
| [ads-linkedin](skills/ads-linkedin/SKILL.md) | "Audit LinkedIn Ads measurement, Insight Tag and conversions, professional audiences, lead generation, ABM, creative, bidding, budgets, pacing, automation, and policy. Use for LinkedIn Ads, Campaign Manager, Insight Tag, Lead Gen Forms, Thought Leader Ads, ABM campaigns, or B2B paid media." |
| [ads-math](skills/ads-math/SKILL.md) | "Calculate and model paid-media CPA, CPL, CPC, CPM, ROAS, MER, break-even targets, contribution margin, LTV:CAC, impression-share opportunity, budgets, forecasts, and experiment economics. Use for PPC math, ad calculator, break-even analysis, ROAS calculator, CPA calculator, budget forecast, LTV CAC, or MER." |
| [ads-meta](skills/ads-meta/SKILL.md) | "Audit Meta Ads measurement, Pixel and Conversions API, attribution, Facebook and Instagram creative, audiences, placements, automation, budgets, account structure, and policy. Use for Meta Ads, Facebook Ads, Instagram Ads, Advantage+, Pixel, CAPI, Events Manager, creative fatigue, or Meta campaign optimization." |
| [ads-microsoft](skills/ads-microsoft/SKILL.md) | "Audit Microsoft Advertising measurement, UET, search and audience campaigns, Google imports, syndication, keywords, creative, bidding, budgets, Copilot inventory, and policy. Use for Microsoft Ads, Bing Ads, UET, Microsoft Audience Network, Google Ads import, or Microsoft campaign optimization." |
| [ads-monitor](skills/ads-monitor/SKILL.md) | "Monitor paid-ad account pacing, delivery, performance, creative fatigue, tracking, policy, and data quality across supported platforms. Use for daily or weekly checks, anomaly review, budget pacing, post-launch verification, or campaign monitoring." |
| [ads-optimize](skills/ads-optimize/SKILL.md) | "Diagnose and draft or explicitly apply paid-ad optimizations using evidence, financial constraints, experiments, and capability-gated adapters. Use for campaign optimization, budget reallocation, bid changes, pausing or archiving ads, requests to delete campaigns, search-term or negative-keyword actions, creative rotation, or improving CPA and ROAS." |
| [ads-photoshoot](skills/ads-photoshoot/SKILL.md) | "Generate rights-cleared paid-ad product photography variants from an authorized source image and validated brand profile. Triggers on: product photo, product photography, virtual photoshoot, photoshoot, enhance product image, studio shot, lifestyle shot, lifestyle product image, floating product image, ingredient shot." |
| [ads-pinterest](skills/ads-pinterest/SKILL.md) | "Audit Pinterest Ads measurement, Pinterest Tag and Conversions API, catalog and shopping readiness, visual creative, audiences, Performance+ intent, budgets, brand safety, and reporting. Use for Pinterest Ads, promoted Pins, shopping ads, catalog sales, Pinterest Tag, Pinterest Conversions API, or Pinterest Performance+." |
| [ads-plan](skills/ads-plan/SKILL.md) | "Create a professional paid-advertising strategy covering objectives, economics, platform selection, campaign architecture, audiences, budget, creative, measurement, experiments, governance, rollout, and reporting. Use for ad plan, media plan, PPC strategy, paid-social strategy, campaign architecture, advertising roadmap, or channel planning." |
| [ads-reddit](skills/ads-reddit/SKILL.md) | "Audit Reddit Ads measurement, campaign structure, community and interest targeting, creative-native fit, catalog advertising, budgets, brand safety, and reporting. Use for Reddit Ads, promoted posts, conversation ads, community targeting, Reddit Pixel, Reddit Conversions API, or Reddit dynamic product ads." |
| [ads-report](skills/ads-report/SKILL.md) | "Render Markdown, HTML, or PDF paid-advertising reports from a validated Claude Ads JSON run bundle. Use for ads report, client report, audit PDF, executive audience reporting, or exporting prior audit and plan results." |
| [ads-research](skills/ads-research/SKILL.md) | "Refresh Claude Ads platform, API, policy, regulation, benchmark, issue, pull-request, fork, and repository evidence. Use for ads research refresh, expired refresh_due dates, stale API or platform claims, reverify-or-demote decisions, release-current claim validation, ecosystem review, current platform changes, or updating paid-media knowledge. When tools or sources are unavailable, still demote the stale claim for the current run and block dependent release-current assertions before requesting access." |
| [ads-server-side-tracking](skills/ads-server-side-tracking/SKILL.md) | "Audit server-side paid-media measurement including server-side tag management, platform conversion APIs, event taxonomy, browser/server deduplication, consent, hashing, data quality, observability, and privacy. Use for server-side tracking, sGTM, server-side tagging, CAPI, Events API, event_id, pixel debugging, first-party measurement, or conversion data loss." |
| [ads-setup](skills/ads-setup/SKILL.md) | "Set up a paid-media client, brand, account, data-source, privacy, and mutation-guardrail profile for Claude Ads. Use for onboarding, initial configuration, brand DNA, API tokens or credential profiles, environment-variable or keychain setup, connecting exports or read adapters, safe native or verified-local installation, curl-pipe-bash install requests, declaring KPIs, or preparing a new advertising project." |
| [ads-snapchat](skills/ads-snapchat/SKILL.md) | "Audit Snapchat Ads measurement, Snap Pixel and Conversions API, mobile and app campaigns, creative, AR and catalog formats, audiences, budgets, brand safety, and reporting. Use for Snapchat Ads, Snap Ads, Snap Pixel, Snapchat Conversions API, AR Lens ads, app-install campaigns, or Snapchat dynamic product ads." |
| [ads-test](skills/ads-test/SKILL.md) | "Design and evaluate paid-ad experiments with hypotheses, randomization units, sample-size and duration assumptions, guardrails, platform experiment tools, analysis, and decision rules. Use for A/B test, split test, experiment design, hypothesis, statistical significance, sample size, test duration, or experiment readout." |
| [ads-tiktok](skills/ads-tiktok/SKILL.md) | "Audit TikTok Ads measurement, Pixel and Events API, mobile-first creative, audiences, Smart+, Shop and commerce campaigns, bidding, budgets, pacing, attribution, and policy. Use for TikTok Ads, TikTok Pixel, Events API, Smart+, TikTok Shop Ads, GMV Max, Spark Ads, or TikTok campaign optimization." |
| [ads-validate](skills/ads-validate/SKILL.md) | "Validate Claude Ads contracts, scoring inputs, run bundles, capabilities, source freshness, safety, installation, uninstall, or release readiness. Use for ads validate, ads status, ads next, stale claims with missing tool access, maturity checks, ownership-manifest uninstall, preserving unrelated ads-* skills, checksum verification, preflight, QA, or release audits. Missing access must demote stale evidence for the run and block dependent release-current claims before recovery guidance." |
| [ads-x](skills/ads-x/SKILL.md) | "Audit X Ads measurement, X Pixel and Conversions API, campaign objectives, keyword and conversation targeting, creative, budgets, brand safety, app measurement, and reporting. Use for X Ads, Twitter Ads, promoted posts, X Pixel, X Conversions API, conversation targeting, or paid campaigns on X." |
| [ads-youtube](skills/ads-youtube/SKILL.md) | "Audit YouTube Ads campaign setup, video and Demand Gen inventory, Shorts, in-stream, CTV, creative, audiences, brand safety, bidding, and measurement. Use for YouTube Ads, video ads, pre-roll, bumper ads, skippable in-stream, Shorts ads, Demand Gen, VAC migration, CTV, or YouTube campaign optimization." |

## 使用与边界

将需要的完整 Skill 文件夹复制到本机 Codex 的 skills 目录；部分 Skill 依赖其他 Skill 或外部服务，请先阅读其 SKILL.md。广告系列建议保留 ads 和各 ads-* 文件夹的同级结构。

本库仅归档用户个人安装的52个顶层Skill；Codex内置.system及插件缓存由各自安装机制维护，不重复打包。未包含账号登录态、环境变量值、项目业务资料或运行时缓存。各第三方内容保留原有许可证，本仓库不统一重新授权。

清单详见 [catalog.json](catalog.json)，文件完整性详见 [SHA256SUMS.txt](SHA256SUMS.txt)。
