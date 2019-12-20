module.exports = {
  "title": "bin",
  "description": "而你的故事",
  "dest": "dist",
  locales: { '/': { lang: 'zh-cn' } },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    // 顶栏颜色
    ['meta', { name: 'theme-color', content: '#2196F3' }],
    // 是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    // 设置苹果工具栏颜色
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    // iOS 图标
    ['link', { rel: 'apple-touch-icon', href: '/head.png' }],
    // Apple Safari浏览器
    // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#000000' }],
    // Windows 8 磁贴图标
    ['meta', { name: 'msapplication-TileImage', content: '/head.png' }],
    // Windows 8 磁贴颜色
    ['meta', { name: 'msapplication-TileColor', content: '#2196F3' }],
    // 用于控制页面缩放，多用于响应式页面开发中
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "Timeline",
        "link": "/timeline/",
        "icon": "reco-date"
      }
    ],
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    "logo": "/head.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "sidebar": "auto",
    "lastUpdated": "Last Updated",
    "author": "bin",
    "startYear": "2017"
  },
  "markdown": {
    "lineNumbers": true,
    "toc": {
      "markerPattern": /^\[toc\]/im
    }
  },
  plugins: [
    [
      '@vuepress/pwa', 
      {
        serviceWorker: true,
        updatePopup: {
          message: "发现新内容可用",
          buttonText: "刷新"
        }
      }
    ]
  ]
}