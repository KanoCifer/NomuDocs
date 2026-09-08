---
title: 归组与尺寸变体组
---

# 归组与尺寸变体组

商品上架到 Noon 时，面对多件同款不同规格的商品，Nomu 提供两条并行的「变体」路径——它们都把多件商品组织在一起发布，但语义、平台数据形态、入口都不同：

| 路径 | 平台 UI 位置 | 平台产物 | 单件独立性 | 典型场景 |
| --- | --- | --- | --- | --- |
| 归组（Group） | Noon 后台 Group Tab | `skuGroup`（`ZD…`） | 保留：每件走自己的 `product/create` 链 | 同款多尺码 / 多型号，颜色系列 |
| 尺寸变体组（Sizes） | Noon 后台 Sizes Tab | `parentGroupKey` / `skuParent`（`ZA…`） | 子品继承父品，价格独立 | 标准尺码表（衣服 / 鞋） |

两条路径**互不影响**——单商品上架（既不归组也不挂 Sizes）依旧按原来的流水线跑，没有强制要求。

## 归组上架（Group）

### 适用场景

「同一品牌同类目」的多件商品，每件有自己的 partnerSku 与图片，但**标题 / 介绍 / 卖点 / 类目 / 部门**要保持一致。归组让买家在前台看到一个统一商品页，下方有规格变体可挑。

### 怎么走

1. 抓取或新建多件同款商品
2. 在上架抽屉里勾选要归组的若干件
3. 配置「组名」（`partnerRef`）与「规格轴」（`size` / `model_name` / `colour_name`）
4. 提交后引擎按归组路径走：组内**第一件** `group/upsert` 建组拿到 `skuGroup`（`ZD…`），**后续件**带 `skuGroup` 加入；每件在归组后额外写入自己的轴值

### 关键规则

- **同品牌是硬门禁**（口径 = `BrandRef.code`）：仓储层 create/replace 事务校验；任一方未设 brand 放行，**组内品牌必须一致**才允许建组
- **同类目不设门禁**：组内类目一致性只靠「编辑组共享字段时覆盖成员」维持，没有事务级校验
- 每件商品在归组后仍走自己完整的 `product/create` 链与内容，不共享 SKU 链——「组」是扁平商品模型之上的**可选聚合视图**（[CONTEXT.md](https://github.com/KanoCifer/noon-tool/blob/main/CONTEXT.md) ADR-0001 / 0006）
- 任务面板里归组任务标 `taskKind: 'group'`，行展示「X 件 · 父/子 · #N」

### 概念区分

- `skuGroup`（`ZD…`）—— 归组路径的组标识
- `skuParent`（`ZA…`）—— 单件路径下每个商品自己的父编码（在单商品路径下两者同值）
- **不要**把「归组」与「Sizes 变体组」混为一谈——它们是平台 UI 上并列的两套机制

## 尺寸变体组（Sizes）

### 适用场景

Noon 后台 `Sizes` Tab 下的标准尺码表：父品（带价格 / 介绍 / 图片），子品是 N 个尺码变体。子品内容**自动继承**父品（图、标题、介绍、brand 等），**仅价格需单独 upsert**。

### 怎么走

1. 父品先按单商品路径走完上架（[快速上手](./quick-start)），落到「已上架」状态
2. 在操作菜单（Action Sheet）Sizes 段选父品，弹出「尺寸变体组」抽屉
3. 填写父品 size + 子品行（每行带自己的 partnerSku）
4. 提交后引擎走 `product/update` 的 `parent + axesUpdate + childrenCreate` 链路，子品以 `sku = 父品-{childIx}` 归属

### 关键规则

- **轴只允许 1 个 = size**，不可挂 color / style 等多轴
- 单商品路径下「每个商品都是自己的父」——父子关系是便于区分的本地标识，不是「一组共享 size 集合」
- 子品价格单独走 `offer/upsert/price` 写入
- 父品 publication 必填：`category`（FullTypeCategory）+ `brand`（BrandRef）+ `price > 0` + `warrantyType` —— 缺一父品发布步骤直接报错

### 父品未上架怎么办

Sizes 入口**不要求父品已上架**。父品上架由后端 sizes.worker 全权处理：

- `sizes.parentPublish` 步骤先看 `parent.status === 'active' && parent.parentGroupKey` —— 满足则跳过；否则走单商品路径完成父品上架
- `sizes.assertParentPublished` 放行后继续走 `childrenUpdate` / `childrenCreate` / `zskuUpsert` / `virtualCompute`

父品 publication 已落库、必填字段齐了，CTA 直接发 sizes scope 批次，后端兜底；不齐就在提交前 throw 出来，CTA hint 给用户可读文案。

### 任务面板标识

- 任务面板里 Sizes 任务标 `taskKind: 'sizes'`
- 行的 child 区展示 `parentGroupKey` / `pskuCode` / `sku` / `childIx`

## 删 Sizes 变体组

删除 Sizes 变体组会把父品与子品**真删**，不留归档残留（修复过删除残留 bug）。删之前请确认没有未完成的发布任务。

## 选 Group 还是 Sizes？

| 想做的事 | 用什么 |
| --- | --- |
| 标准尺码表（S / M / L / XL …） | **Sizes** |
| 颜色系列（红 / 蓝 / 黑），各色独立商品图 | **Group** |
| 同一型号有多个细分型号（手机 128G / 256G / 512G） | **Group** + `model_name` 轴 |
| 不同商品图片需要按颜色变体独立展示 | **Group** + `colour_name` 轴 |
| 子品内容需要严格继承父品 | **Sizes** |

## 常见问题

### 归组了为什么组里商品的状态还是独立的？

归组是平台层面的「共享段 + 成员」组织，**不是**「所有成员一起成功或一起失败」。每件商品仍走自己的 `product/create` 链与步骤表，任务面板里能看到每件独立状态。

### 归组要选同品牌吗？

要。同品牌是硬门禁——`BrandRef.code` 一致才允许建组；任一方未设 brand 会被放过，但实际建组时仍会被仓储层校验。

### 归组和 Sizes 能不能同时存在？

**不能**。一个商品是 Sizes 子品就不会是 Group 成员；操作菜单里 Sizes 段只对 `variantRole='parent'` 的行展示，Group 段只对未上架单商品展示。

### Sizes 父品未上架能直接建子品吗？

能。Sizes 抽屉的「添加 N 个 size」CTA 不因父品未上架禁用；后端 worker 会兜底先把父品上架完，再建子品。
