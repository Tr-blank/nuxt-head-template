# Nuxt Head Template
依賴Nuxt的Head模板，模板包含網頁中常用的Meta Tag及Json-ld。

只要在專案中設定完整的網站資訊，便可輸出符合SEO的HTML Head內容。

## 安裝
```
npm i nuxt-head-template --save
```

## 使用方式

1. 在Nuxt專案裡的pluhins目錄新增head.js檔案
```js
// plugins/head.js

const { defaultMeta, pageMeta, jsonLd } = require('nuxt-head-template')

// 設定網頁基本資訊
const websiteData = {
  title: '品牌網站標題',
  description: '品牌網站簡介',
  webPageUrl: '品牌網站首頁網址',
  imageUrl: '品牌網站分享縮圖網址',
  fbImageUrl: '品牌網站FB分享縮圖網址',
  slogan: '品牌標語',
  logo: '品牌網站logo網址',
  socialLinks: [
    '品牌相關社群網址:FB粉絲團',
    '品牌相關社群網址:youtube'
  ],
  telephone: '聯絡電話',
  contactType: '服務內容',
  email: '聯絡信箱',
  copyright: {
    name: '公司名稱',
    legalName: '公司正式名稱',
    year: '版權年份'
  },
  hoursAvailable: {
    opens: '客服開始時間',
    closes: '客服結束時間'
  }
}

// 將 網站資訊 跟Mate基本模板和指定的schema Type模板結合
const defaultHead = () => {
  return {
    ...defaultMeta(websiteData),
    ...jsonLd(['Brand', 'ContactPoint'], websiteData)
  }
}

// 將 各個頁面資料 跟Mate頁面模板和指定的schema Type模板結合
const pageHead = (typeArray, pageData) => {
  const data = {
    ...websiteData,
    ...pageData
  }
  return {
    ...pageMeta(data),
    ...jsonLd(typeArray, data)
  }
}

module.exports = {
  defaultHead,
  pageHead
}

```

2. 將head object加到Nuxt設定檔裡
```js
// nuxt.config.js
const { defaultHead } = require('./plugins/head')

module.exports = {
  head: {
    ...defaultHead()
  }
}
```
3. 在各個Vue頁面中加上head設定
```js
// pages/index.vue
import { pageHead } from '~/plugins/head'

export default {
  head () {
    const headData = {
      pageType: 'CollectionPage',
      title: this.pageTitle,
      webPageUrl: this.routePath
    }
    return pageHead(['webpage'], headData)
  }
}
```


## HTML Mate Tag 模板

```js
{
  title: data.title,
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    // 優先使用 IE 最新版本和 Chrome
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
    { name: 'copyright', content: data.copyright.legalName || data.copyright.name },
    { name: 'description', hid: 'description', content: data.description },
    // Open Graph data
    { property: 'fb:app_id', content: '<app_id>' },
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
    { name: 'google-play-app', content: 'app-id=<app id>' },
    { name: 'apple-itunes-app', content: 'app-id=<app id>' },
    // apple手機瀏覽時不要自動為電話、信箱、地址加上撥號連結、發送信件、開啟地圖
    { name: 'format-detection', content: 'telephone=no,email=no,adress=no' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
}
```

## Json-ld 模板

- Brand
```js
{
  '@context': 'http://schema.org',
  '@type': 'Brand',
  'name': data.title,
  'url': data.webPageUrl,
  'logo': data.logo,
  'slogan': data.slogan,
  'description': data.description,
  'image': data.fbImageUrl,
  'sameAs': data.socialLinks
}
```

- ContactPoint
```js
{
  '@context': 'http://schema.org',
  '@type': 'ContactPoint',
  'telephone': data.telephone,
  'contactType': data.contactType,
  'contactOption': 'TollFree',
  'email': data.email,
  'hoursAvailable': [
    {
      '@type': 'OpeningHoursSpecification',
      'opens': data.hoursAvailable.opens,
      'closes': data.hoursAvailable.closes,
      'dayOfWeek': 'http://schema.org/Monday'
    },
    {
      '@type': 'OpeningHoursSpecification',
      'opens': data.hoursAvailable.opens,
      'closes': data.hoursAvailable.closes,
      'dayOfWeek': 'http://schema.org/Tuesday'
    },
    {
      '@type': 'OpeningHoursSpecification',
      'opens': data.hoursAvailable.opens,
      'closes': data.hoursAvailable.closes,
      'dayOfWeek': 'http://schema.org/Wednesday'
    },
    {
      '@type': 'OpeningHoursSpecification',
      'opens': data.hoursAvailable.opens,
      'closes': data.hoursAvailable.closes,
      'dayOfWeek': 'http://schema.org/Thursday'
    },
    {
      '@type': 'OpeningHoursSpecification',
      'opens': data.hoursAvailable.opens,
      'closes': data.hoursAvailable.closes,
      'dayOfWeek': 'http://schema.org/Friday'
    }
  ]
}
```

- BreadcrumbList
```js
{
  '@context': 'http://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [
    {
      '@type': 'ListItem',
      'position': index,
      'item': {
        '@type': 'Thing',
        '@id': item.link,
        'name': item.name
      }
    },
    {
      '@type': 'ListItem',
      'position': index,
      'item': {
        '@type': 'Thing',
        '@id': item.link,
        'name': item.name
      }
    }
  ]
}
```

- webpage
```js
{
  '@context': 'http://schema.org',
  '@type': data.pageType,
  'name': data.title,
  'url': data.webPageUrl,
  'image': data.fbImageUrl,
  'description': data.description,
  'isPartOf': {
    '@type': 'WebSite',
    'name': data.title,
    'url': data.webPageUrl,
    'description': data.description,
    'sameAs': data.socialLinks,
    'copyrightHolder': {
      '@type': 'Organization',
      'name': data.copyright.name,
      'legalName': data.copyright.legalName
    },
    'copyrightYear': data.copyright.year
  }
}
```