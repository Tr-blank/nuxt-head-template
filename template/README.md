# 各模板輸出後欄位及資料對應- Nuxt Head Template

- ## Meta
```html
<meta charset="utf-8">
 <!-- 優先使用 IE 最新版本和 Chrome -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<title>{{ title }}</title>
<meta name="description" content="{{ description }}" />
<meta name="copyright" content="{{ copyright.legalName }}" >
<!--Open Graph data -->
<meta property="og:type" content="website" />
<meta property="fb:app_id" content="{{ fbAppId }}">
<meta property="og:title" content="{{ title }}" />
<meta property="og:description" content="{{ description }}" />
<meta property="og:url" content="{{ webPageUrl }}" />
<meta property="og:site_name" content="{{ title }}" />
<meta property="og:locale" content="{{ locale }}" />
<!--Open Graph data image -->
<meta property="og:image" content="{{ imageUrl }}" />
<meta property="og:image:alt" content="{{ title }}" />
<meta property="og:image:secure_url" content="{{ imageUrl }}" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<!-- Mobile Safari 特有 Tags -->
<!-- apple手機瀏覽時不要自動為電話、信箱、地址加上撥號連結、發送信件、開啟地圖 -->
<meta name="format-detection" content="telephone=no,email=no,adress=no">
<!-- 在手機開啟頁面時會出現是否有裝app的banner  -->
<meta name="Apple-tunes-app" content="app-id={{ iosAppId }}">
<meta name="google-play-app" content="app-id={{ iosAppId }}">
<link rel="icon" href="/favicon.ico" sizes="16x16" type="image/png">
```
- ## Branch
```html
<script type="application/ld+json">
  {
    "@context":"http://schema.org",
    "@type": "Brand",
    "name": "{{ title }}",
    "url": "{{ webPageUrl }}",
    "logo": "{{ logo }}",
    "slogan": "{{ slogan }}",
    "description": "{{ description }}",
    "image": "{{ imageUrl }}",
    "sameAs": "{{ socialLinks }}"
  }
</script>
```
- ## ContactPoint
```html
<script type="application/ld+json">
  {
    "@context":"http://schema.org",
    "@type": "ContactPoint",
    "telephone": "{{ telephone }}",
    "contactType": "{{ contactType }}",
    "email":"{{ email }}",
    "hoursAvailable": [
      {
        "@type": "OpeningHoursSpecification",
        "opens": "{{ hoursAvailable.opens }}",
        "closes": "{{ hoursAvailable.closes }}",
        "dayOfWeek": "http://schema.org/{{ hoursAvailable.days[0] }}"
      },
      {
        "@type": "OpeningHoursSpecification",
        "opens": "{{ hoursAvailable.opens }}",
        "closes": "{{ hoursAvailable.closes }}",
        "dayOfWeek": "http://schema.org/{{ hoursAvailable.days[1] }}"
      },
      {
        "@type": "OpeningHoursSpecification",
        "opens": "{{ hoursAvailable.opens }}",
        "closes": "{{ hoursAvailable.closes }}",
        "dayOfWeek": "http://schema.org/{{ hoursAvailable.days[2] }}"
      }
    ]
  }
</script>
```
- ## BreadcrumbList
```html
<script type="application/ld+json">
  {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 0,
        "item": {
          "@type": "Thing",
          "@id": "{{ breadcrumbList[0].link }}",
          "name": "{{ breadcrumbList[0].name }}"
        }
      },
      {
        "@type":"ListItem",
        "position":1,
        "item":{
          "@type":"Thing",
          "@id": "{{ breadcrumbList[1].link }}",
          "name": "{{ breadcrumbList[1].name }}"
        }
      }
    ]
  }
</script>
```
- ## WebPage
```html
<script type="application/ld+json">
  {
    "@context":"http://schema.org",
    "@type":"WebPage",
    "name":"{{ title }}",
    "description": "{{ description }}",
    "url": "{{ webPageUrl }}",
    "image": "{{ imageUrl }}",
    "isPartOf": {
      "@type": "WebSite",
      "name": "{{ webSiteTitle }}",
      "url": "{{ webSiteUrl }}",
      "description": "{{ webSitedescription }}",
      "sameAs": "{{ socialLinks }}"
      "copyrightHolder": {
        "@type": "Organization",
        "name": "{{ copyright.name }}",
        "legalName": "{{ copyright.legalName }}"
      },
      "copyrightYear": "{{ copyright.year }}",
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "{{ searchUrlTemplate}}"
          },
          "query-input": {
            "@type": "PropertyValueSpecification",
            "valueRequired": "http://schema.org/True",
            "valueName": "search_term_string"
          }
        }
      ]
    }
  }
</script>
```
