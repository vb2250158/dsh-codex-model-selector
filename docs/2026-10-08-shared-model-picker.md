# 独立模型设置复用入口

公开服务 modelPickers.Picker 由模型选择插件注册并随插件卸载撤销。其目录仍由 modelDirectories 提供，常用排序使用插件实例已有 RecentModels。独立 current/select 只属于调用者，不执行会话模型切换，不创建第二份隐藏规则或选择计数。原设置中的 SettingsModelPicker 和输入框 ModelSelect 共同复用。

菜单使用 MenuSurface 的主题材质。嵌入模式在父浮层内布局，避免绝对定位菜单被裁切。测试覆盖目录过滤、常用条目的提供商标签、独立选择以及会话选择不变。
