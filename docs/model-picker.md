# Model picker service

`dsh-codex-model-selector/model-picker` exports the types `ModelPickerService`, `IndependentPickerProps` and `CatalogPickerProps` and augments the Cordis client context with `modelPickers`. It is a type-only export; obtain components from `ctx.modelPickers` inside `ctx.inject(['modelPickers'], ...)`.

`Picker` and `Control` take `sessionId`, `current`, `locked`, `select`, and optional `onOpenChange`. Both read the session directory, but selection is delegated to the caller. `Control` also includes reasoning controls; use a model-only picker when the caller does not save reasoning effort.

`CatalogPicker`, available since 0.1.18, needs no session. It accepts caller-owned `groups`, `current`, `locked`, `select`, `load`, and optional `status`, `error`, `failures`, `onOpenChange`. Catalog fields use the host model catalog and directory types. `load` runs on open and retry; supply the resulting catalog or failure through props. The component reuses the chat selector's recent-model store, provider groups, search, localization, positioning and keyboard navigation. The first menu shows common models and “More models” opens searchable groups. It never mutates the supplied catalog or changes a chat session.

The caller owns persistence. `select` returns `false` when saving fails and displays its actionable error in the owning settings page. A false result retains the menu and does not record a recent choice. Successful selections close the menu. Independent settings read shared recent models without adding usage counts. Set `locked` while saving. A configured model absent from the directory remains visible by its provider and model ID.

When the service is missing or older than 0.1.18, keep unrelated settings available and display an install/enable/upgrade message. Dispose the injection subscription with the owning plugin; do not copy the selector implementation as a fallback.

## 中文

通过 `ctx.inject(['modelPickers'], ...)` 获取公共组件；`dsh-codex-model-selector/model-picker` 仅导出类型。`CatalogPicker` 从 0.1.18 起可用，不需要会话 ID，使用调用方的目录及当前选择，复用聊天选择器的常用模型、更多模型、搜索、分组、语言和键盘交互。模型身份始终为 provider/model，组件不会修改聊天会话。

调用方负责保存并在失败时返回 `false`、显示错误；失败保留菜单及原选择，成功关闭菜单。独立设置读取共享常用模型，不增加使用计数。保存期间传入 `locked`。目录缺少旧模型时继续显示旧 provider/model。服务缺失时显示安装、启用或升级提示，保留其它设置功能，不另建下拉替代。
