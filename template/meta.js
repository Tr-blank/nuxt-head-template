const defaultMeta = (data) => {
  return {
    title: data.title,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // 優先使用 IE 最新版本和 Chrome
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { name: 'copyright', content: data.copyright.legalName || data.copyright.name },
      { name: 'description', hid: 'description', content: data.description },
      // Open Graph data
      { property: 'fb:app_id', content: '389428227789915' },
      // 基本
      { property: 'og:type', content: 'website' },
      { property: 'og:title', hid: 'og:title', content: data.title },
      { property: 'og:description', hid: 'og:description', content: data.description },
      { property: 'og:url', hid: 'og:url', content: data.webPageUrl },
      // 選填
      { property: 'og:site_name', content: data.title },
      { property: 'og:locale', content: 'zh-TW' },
      // image
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image', hid: 'og:image', content: data.fbImageUrl },
      { property: 'og:image:secure_url', hid: 'og:image:secure_url', content: data.fbImageUrl },
      { property: 'og:image:alt', hid: 'og:image', content: data.title },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      // 在手機開啟頁面時會出現是否有裝app的banner
      { name: 'google-play-app', content: 'app-id=com.owlting' },
      { name: 'apple-itunes-app', content: 'app-id=com.owlting' },
      // apple手機瀏覽時不要自動為電話、信箱、地址加上撥號連結、發送信件、開啟地圖
      { name: 'format-detection', content: 'telephone=no,email=no,adress=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  }
}

const pageMeta = (data) => {
  return {
    title: data.title,
    meta: [
      { name: 'description', hid: 'description', content: data.description },
      { property: 'og:title', hid: 'og:title', content: data.title },
      { property: 'og:description', hid: 'og:description', content: data.description },
      { property: 'og:url', hid: 'og:url', content: data.webPageUrl },
      { property: 'og:image', hid: 'og:image', content: data.fbImageUrl },
      { property: 'og:image:secure_url', hid: 'og:image:secure_url', content: data.fbImageUrl },
      { property: 'og:image:alt', hid: 'og:image', content: data.title }
    ]
  }
}

module.exports = {
  defaultMeta,
  pageMeta
}
