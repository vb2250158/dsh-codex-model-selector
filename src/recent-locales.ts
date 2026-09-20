/** 常用列表文案，与模型目录自己的文案分别注册。 */
export const recentLocales = {
  zh: { more: '更多模型', back: '返回常用模型', empty: '暂无最近使用记录，请从更多模型中选择。', unavailable: '请求用量刷新失败，暂用已有记录排序。', loading: '正在读取最近使用记录…' },
  en: { more: 'More models', back: 'Back to frequent models', empty: 'No recent usage. Choose from more models.', unavailable: 'Usage refresh failed. Ranking existing records.', loading: 'Loading recent usage…' },
}
export type RecentText = (key: keyof typeof recentLocales.zh) => string
