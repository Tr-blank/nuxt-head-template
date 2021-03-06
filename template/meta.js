const website = (data) => {
  const fullTitle = data.webSiteTitleTemplate ? data.webSiteTitleTemplate.replace('%s', data.webSiteTitle) : data.webSiteTitle
  return {
    title: data.webSiteTitle,
    ...data.webSiteTitleTemplate ? {titleTemplate: data.webSiteTitleTemplate} : {},
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      { name: 'description', hid: 'description', content: data.webSiteDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', hid: 'og:title', content: data.fbTitle || fullTitle },
      { property: 'og:description', hid: 'og:description', content: data.webSiteDescription },
      { property: 'og:url', hid: 'og:url', content: data.webPageUrl },
      { property: 'og:site_name', content: data.fbSiteName || fullTitle },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image', hid: 'og:image', content: data.imageUrl },
      { property: 'og:image:secure_url', hid: 'og:image:secure_url', content: data.imageUrl },
      { property: 'og:image:alt', hid: 'og:image', content: fullTitle },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'format-detection', content: 'telephone=no,email=no,adress=no' },
      ...data.fbAppId ? [{ property: 'fb:app_id', content: data.fbAppId }] : [],
      ...data.locale ? [{ property: 'og:locale', content: data.locale }] : [],
      ...data.copyright && (data.copyright.name || data.copyright.legalName) ? [{ name: 'copyright', content: data.copyright.legalName || data.copyright.name }] : [],
      ...data.iosAppId ? [
        { name: 'google-play-app', content: 'app-id=' + data.iosAppId },
        { name: 'apple-itunes-app', content: 'app-id=' + data.iosAppId }
      ] : []
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  }
}

const page = (data) => {
  const fullTitle = data.titleTemplate ? data.titleTemplate.replace('%s', data.title) : data.webSiteTitleTemplate ? data.webSiteTitleTemplate.replace('%s', data.title) : data.title
  return {
    title: data.title,
    ...data.titleTemplate ? {titleTemplate: data.titleTemplate} : {},
    meta: [
      { name: 'description', hid: 'description', content: data.description },
      { property: 'og:title', hid: 'og:title', content: fullTitle },
      { property: 'og:description', hid: 'og:description', content: data.description },
      { property: 'og:url', hid: 'og:url', content: data.webPageUrl },
      { property: 'og:image', hid: 'og:image', content: data.imageUrl },
      { property: 'og:image:secure_url', hid: 'og:image:secure_url', content: data.imageUrl },
      { property: 'og:image:alt', hid: 'og:image', content: fullTitle }
    ]
  }
}

module.exports = {
  website,
  page
}
