# Nuxt Head Template
整合常用SEO Meta Tag和Json-ld的Head模板，依賴Nuxt。

## 安裝
```
npm i nuxt-head-template --save
```

## 使用方式

### 1. 在Nuxt專案裡的pluhins目錄新增head.js檔案
```js
// plugins/head.js

// 載入模板
const { meta, jsonLd } = require('head_template')

// 設定網頁基本資訊
const websiteData = {
  title: '網站標題',
  description: '網站簡介'
  ...
}

// 建立在nuxt.config使用的head function
const websiteHead = {
  ...meta.website(websiteInfo),
  ...jsonLd(websiteInfo.jsonLdType, websiteInfo)
}

// 建立在頁面組件使用的head function
const pageHead = (typeArray, pageData) => {
  const data = { ...websiteInfo, ...pageData }
  return {
    ...meta.page(data),
    ...jsonLd(typeArray, data)
  }
}

module.exports = {
  websiteHead,
  pageHead
}

```

### 2. 將head object加到Nuxt設定檔裡
```js
// nuxt.config.js
const { websiteHead } = require('./plugins/head')

module.exports = {
  head: {
    ...websiteHead
  }
}
```
### 3. 在各個Vue頁面中加上head設定
```js
// pages/index.vue
import { pageHead } from '~/plugins/head'

export default {
  head () {
    const headData = {
      pageType: 'WebPage',
      title: this.pageTitle,
      webPageUrl: this.routePath
    }
    return pageHead(['WebPage'], headData) // 指定此頁的json-ld模板
  }
}
```

## 網頁常用的Schema Type（視資料類型去選擇）
- 全站共用：Brand、ContactPoint
- 首頁：WebPage
- 分類頁、列表頁：CollectionPage、BreadcrumbList
- 介紹頁、關於頁：AboutPage、BreadcrumbList
- 商品頁：ItemPage、Product、BreadcrumbList



## 各模板需填寫的資料格式

### Mate模板
- 全站頁面預設共用資料（必填）
```js
{
  // ===== SEO必填 =====
  'webSiteTitle': '網站標題', // 例如：Nuxt Head Template
  'webSiteDescription': '網站簡介', // 例如：依賴Nuxt的Head模板
  'webSiteUrl': '網站首頁網址',
  // 當此頁面分享到社群平台或通訊軟體時，出現的縮圖(尺寸:1200x630)
  'imageUrl': '網站縮圖網址',
  // ===== 選填 =====
  'locale': '當地語言', // 例如：zh-TW
  'fbAppId': 'Facebook應用程式ID',
  'copyright': {
    'legalName': '公司正式名稱',
  },
  // 在手機開啟頁面時會出現是否有裝app的banner
  'iosAppId': '蘋果APP ID'
}
```

- 個別頁面資料

```js
{
  // ===== SEO必填 =====
  'title': '網頁標題', // 例如： 安裝及使用方式 - Nuxt Head Template
  'description': '網頁簡介', // 例如：在Nuxt專案下執行安裝指令...
  'webPageUrl': '網頁網址',
  // ===== 選填 =====
  // 有特別行銷需求的網頁可另外指定縮圖，例如：主打商品介紹頁、活動頁...等
  'imageUrl': '網頁縮圖網址'
}
```
[查看模板輸出結果](https://github.com/Tr-blank/nuxt-head-template/tree/master/template)
### Json-ld模板 
- [Brand 品牌](https://schema.org/Brand)
```js
{
  // ===== 選填 =====
  'logo': '網站logo網址',
  'slogan': '品牌標語',
  'socialLinks': [
    '品牌相關社群網址:FB粉絲團',
    '品牌相關社群網址:youtube頻道',
    ...
  ] 
}
```

- [ContactPoint 聯絡資訊](https://schema.org/ContactPoint)
```js
{
  // ===== 選填 =====
  'contactType': '提供的服務種類', // 例如：客服、異業合作
  'telephone': '聯絡電話',
  'email': '聯絡信箱',
  'hoursAvailable': {
    // 必須為英文，例如：['Monday','Tuesday','Wednesday']
    'days': ['星期幾有開'], 
    'opens': '服務開始時間', // 格式為"時:分:秒"，例如：09:00:00
    'closes': '服務關閉時間' // 例如：18:30:00
  }
}
```
- [Organization 公司廠商](https://schema.org/Organization)
```js
{
  // ===== 選填 =====
  'organization': {
    'name': '公司廠商名稱',
    'url': '公司廠商官網',
    'legalName': '公司廠商正式名稱',
    'telephone': '公司廠商聯絡電話',
    'email': '公司廠商聯絡信箱',
    'brand': {
      'name': '公司廠商旗下品牌名稱',
      'url': '公司廠商旗下品牌名稱'
    }
  }
}
```

- [BreadcrumbList 麵包屑(網頁目錄)](https://schema.org/BreadcrumbList)
```js
{
  // ===== 必填 =====
  'breadcrumbList': [
    {
      'name': '第一層目錄名稱',
      'link': '第一層目錄連結網址'
    },
    {
      'name': '第二層目錄名稱',
      'link': '第二層目錄連結網址'
    },
    ...
  ],
}
```
 
- [WebPage 網頁（可指定更具體的網頁類型）](https://schema.org/WebPage)
```js
{
  // ===== 必填 =====
  // 填入Schema支援的特定網頁類型，例如：AboutPage、CollectionPage、ItemPage...等
  'pageType': '網頁類型',
  // ===== 選填 =====
  'copyright': {
    'name': '公司簡稱',
    'legalName': '公司正式名稱',
    'year': '版權年份' // 數字格式，例如：2020 
  },
  // 如果網站內有搜尋頁，則可增加搜尋行為網址，例如：https://xxx.com/search?q={search_term_string}
  // {search_term_string}為Schema指定參數，不可省略，加在搜尋頁網址中顯示"搜尋字串"的位置
  'searchUrlTemplate': '搜尋頁面網址' 
}
```
- [Product 商品](https://schema.org/Product)
```js
{
  'product': {
    'name': '商品名稱',
    'description': '商品簡介',
    'sku': '商品庫存數',
    'id': '商品ID',
    'category': '商品所屬分類',
    'weight': '商品重量',
    'material': '商品成分',
  },
  'bestRating': '最高評分',
  'worstRating': '最低評分',
  'review': [
    {
      'title': '評論標題',
      'ratingValue': '評分',
      'author': '評論人名字',
      'datePublished': '評論日期',
      'reviewBody': '評論內容',
    }
  ],
  'aggregateRating' : {
    'ratingValue': '平均評價星數',
    'reviewCount': '商品評論數量'
  },
  'offers': {
    'priceCurrency': '商品幣別',
    'price': '商品價格',
    'priceValidUntil': '價格有效日期'
    'availability': '商品狀態（填英文）'
    // 現貨InStock、售完SoldOut、缺貨OutOfStock、預購PreOrder
  }
}
```

[查看模板輸出結果](https://github.com/Tr-blank/nuxt-head-template/tree/master/template)
