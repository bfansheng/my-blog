module.exports = {
  title: "bin",
  description: "行到水穷处，坐看云起时",
  dest: "dist",
  locales: { '/': { lang: 'zh-cn' } },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    // 顶栏颜色
    ['meta', { name: 'theme-color', content: '#409EFF' }],
    // 是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    // 设置苹果工具栏颜色
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    // iOS 图标
    ['link', { rel: 'apple-touch-icon', href: '/256.png' }],
    // Apple Safari浏览器
    // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#000000' }],
    // Windows 8 磁贴图标
    ['meta', { name: 'msapplication-TileImage', content: '/256.png' }],
    // Windows 8 磁贴颜色
    ['meta', { name: 'msapplication-TileColor', content: '#409EFF' }],
    // 用于控制页面缩放，多用于响应式页面开发中
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
  ],
  theme: "reco",
  themeConfig: {
	authorAvatar: "/head.png",
    nav: [
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
    type: "blog",
    blogConfig: {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    logo: "/head.png",
    search: true,
    searchMaxSuggestions: 10,
    sidebar: "auto",
    lastUpdated: "Last Updated",
    author: "bin",
    startYear: "2017",
	friendLink: [
      {
        title: '激萌小超超',
        desc: '性感小超超 在线发图',
        link: 'http://chaonnect.xyz/'
      }
    ]
  },
  markdown: {
    lineNumbers: true,
    toc: {
      markerPattern: /^\[toc\]/im
    },
	extendMarkdown: md => {
      // 使用更多的 markdown-it 插件!
      md.use(require('markdown-it-task-lists'))
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
    ],
	[
      "@vuepress-reco/vuepress-plugin-kan-ban-niang",
      {
        theme: ["miku"],
        clean: true,
        modelStyle: {
          position: "fixed",
          left: "0px",
          bottom: "0px",
          zIndex: 99999
        }
      }
    ]
  ]
}