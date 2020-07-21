const defaultMeta = (data) => {
  const json = {
    title: data.webSiteTitle,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { name: 'description', hid: 'description', content: data.webSiteDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', hid: 'og:title', content: data.webSiteTitle },
      { property: 'og:description', hid: 'og:description', content: data.webSiteDescription },
      { property: 'og:url', hid: 'og:url', content: data.webPageUrl },
      { property: 'og:site_name', content: data.webSiteTitle },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image', hid: 'og:image', content: data.imageUrl },
      { property: 'og:image:secure_url', hid: 'og:image:secure_url', content: data.imageUrl },
      { property: 'og:image:alt', hid: 'og:image', content: data.webSiteTitle },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'format-detection', content: 'telephone=no,email=no,adress=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  }
  if (data.iosAppId) {
    json.meta.push({ name: 'google-play-app', content: 'app-id=' + data.iosAppId })
    json.meta.push({ name: 'apple-itunes-app', content: 'app-id=' + data.iosAppId })
  }
  if (data.fbAppId) { json.meta.push({ property: 'fb:app_id', content: data.fbAppId }) }
  if (data.locale) { json.meta.push({ property: 'og:locale', content: data.locale }) }
  if (data.copyright && (data.copyright.name || data.copyright.legalName)) {
    json.meta.push({ name: 'copyright', content: data.copyright.legalName || data.copyright.name })
  } 
  return json
}

const pageMeta = (data) => {
  return {
    title: data.title,
    meta: [
      { name: 'description', hid: 'description', content: data.description },
      { property: 'og:title', hid: 'og:title', content: data.title },
      { property: 'og:description', hid: 'og:description', content: data.description },
      { property: 'og:url', hid: 'og:url', content: data.webPageUrl },
      { property: 'og:image', hid: 'og:image', content: data.imageUrl },
      { property: 'og:image:secure_url', hid: 'og:image:secure_url', content: data.imageUrl },
      { property: 'og:image:alt', hid: 'og:image', content: data.title }
    ]
  }
}

module.exports = {
  defaultMeta,
  pageMeta
}
