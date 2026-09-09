# DSH Codex Model Selector

独立的模型选择器样式插件。紧凑卡片包含模型入口、推理等级分档滑条及默认等级重置；模型和等级列表仍来自官方 `modelDirectories` 服务。选择经原有接口保存，不另建配置数据源。

安装：`dsh plugin --profile web add github:vb2250158/dsh-codex-model-selector#<commit>`，重启 DSH 并刷新页面。禁用插件会释放模型槽和样式，恢复官方选择器。无需修改官方源码。

组件基于 DeepSeek 的 MIT 授权 ModelSelect 改写，保留原有失败反馈、加载重试和模型分组。版权见 LICENSE。源码和构建产物均在此插件内维护。

验证：`pnpm test`，`pnpm run build`。

闪电按钮复用已安装订阅插件的 `loadSpeed` / `setSpeed` 注入接口：只有当前模型目录确认支持快速档时才可操作。普通速度控件在本插件启用时被同一槽位的较高优先级空视图替代，避免重复入口；卸载本插件自动恢复。快速模式会使用更多用量。底部按钮同时显示模型名称与推理等级。

配色全部继承 DSH 主题变量；插件只调整布局、尺寸和控件形状，不覆盖主题色。
滑条拖动过程中只预览档位，松手后提交一次。保存导致的临时失焦不会关闭卡片；点击外部或按 Escape 仍可关闭。
快速模式开启时，收起状态的模型按钮在模型名前显示实心闪电；首次加载也会读取已有速度状态。

## Git 安装来源

将 `<commit>` 替换为本仓库完整提交号。插件代码与运行所需产物随 Git 交付；用户设置、凭据和聊天记录不属于本仓库。

上游组件来自 https://github.com/deepseek-ai/deepseek-harness 的 `packages/client/ui-model-selection`；本仓库维护独立插件改动，并保留 DeepSeek MIT 版权声明。测试词典是同一上游词典的本地测试夹具。
