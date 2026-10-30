## 0.1.18 (2026-10-30)

- Add a public catalog picker for independent plugin settings, sharing the chat model chooser, recent models, search, provider groups, and locale. Selection returns to the caller without changing the chat model.
- 新增独立设置的公开目录选择组件，与聊天共用模型选择、常用记录、搜索、提供商分组和语言；选择结果交回调用插件保存。

## 0.1.17 (2026-10-20)

- Declare the session Remote namespace used by the rc.2 model directory resolver; cover the model seat with real Cordis plugin scopes.
- 声明 rc.2 模型目录所需的会话 Remote 注入，修复模型选择入口报错，并用真实 Cordis 插件作用域验证。

## 0.1.16 (2026-10-19)

- Keep keyboard focus in the menu when returning from model search, so Escape can back out and close the floating menu.
- 从模型搜索返回时保留菜单焦点，使 Escape 能逐层返回并关闭浮层。

## 0.1.15 (2026-10-19)

- Prevent model menus in narrow, scrolling side panels from clipping labels or search fields; preserve portal focus and outside-click dismissal.
- 修复窄侧栏与滚动面板裁剪模型菜单，保留搜索、焦点与外部点击关闭行为。

# 0.1.12

独立补齐模型选择改用主题 Modal，直接展示搜索、常用模型和提供商分组。复用 ModelSelect 的过滤、标记及草稿选择逻辑；会话模型入口保持原交互。

Independent completion selection opens a native searchable Modal with frequent models and provider groups, reusing ModelSelect filtering and draft selection.

# 0.1.11

新增供输入补齐等独立设置复用的 modelPickers.Picker，沿用原 ModelSelect、可见目录、常用排序与当前标记。菜单改用主题 MenuSurface，支持父浮层内展开；会话模型选择保持原行为。

# Changelog

## 0.1.10 (2026-10-07)

- 缩小图标绘制内容约三分之一，增加方框内的留白。
- Reduce icon artwork by one third with a centered, padded viewBox.

## 0.1.9 (2026-10-07)

- 为插件列表提供中英文名称与说明，并发布独立的 SVG 图标。
- Publish English and Chinese plugin display metadata and a dedicated SVG icon.

## 0.1.8

- Align maintenance lockfiles and peer versions with the DSH 0.2 runtime.

## 0.1.7

- Update DSH compatibility requirements and interfaces for 0.2.1-alpha.1.

## 0.1.2 - 2026-09-11

- Add local provider/model search to the model list.

## 0.1.1 - 2026-09-09

- Publish the existing local plugin as an independent MIT Git repository.
- Add repository metadata and portable installation instructions.
- Preserve existing runtime behavior and documented limitations.
- Keep DeepSeek attribution and make test dictionaries repository-local.
