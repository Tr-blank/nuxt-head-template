const Brand = (data) => {
  const json = {
    '@context': 'http://schema.org',
    '@type': 'Brand',
    'name': data.title,
    'url': data.webPageUrl,
    'description': data.description,
    'image': data.fbImageUrl || data.imageUrl,
  } 
  if (data.logo) { json['logo'] = data.logo }
  if (data.slogan) { json['slogan'] = data.slogan }
  if (data.socialLinks) { json['sameAs'] =  data.socialLinks }
  return json
}

const ContactPoint = (data) => {
  const json = {
    '@context': 'http://schema.org',
    '@type': 'ContactPoint',
    // 'contactOption': 'TollFree',
    'hoursAvailable': []
  }
  if (data.telephone) { json['telephone'] = data.telephone }
  if (data.contactType) { json['contactType'] = data.contactType }
  if (data.email) { json['email'] = data.email }
  if (data.hoursAvailable) {
    data.hoursAvailable.forEach((item) => {
      json.itemListElement.push({
        '@type': 'OpeningHoursSpecification',
        'opens': data.hoursAvailable.opens,
        'closes': data.hoursAvailable.closes,
        'dayOfWeek': 'http://schema.org/' + item
      })
    })
  }
  return json
}
const BreadcrumbList = (data) => {
  const json = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': []
  }
  data.breadcrumbList.forEach((item, index) => {
    json.itemListElement.push({
      '@type': 'ListItem',
      'position': index,
      'item': {
        '@type': 'Thing',
        '@id': item.link,
        'name': item.name
      }
    })
  })
  return json
}

const WebPage = (data) => {
  const json = {
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
      'description': data.description
    }
  }
  if (data.copyright) { 
    json['copyrightHolder'] = {
      '@type': 'Organization'
    }
    if (data.copyright.name) { 
      json.copyrightHolder['name'] = data.copyright.name
    }
    if (data.copyright.legalName) { 
      json.copyrightHolder['legalName'] = data.copyright.legalName
    }
    if (data.copyright.year) { 
      json.c['copyrightYear'] = data.copyright.year
    }
  }
  if (data.socialLinks) { json.isPartOf['sameAs'] =  data.socialLinks }
  if (data.searchUrlTemplate) {
    json.isPartOf['potentialAction'] = [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": data.searchUrlTemplate
        },
        "query-input": {
          "@type": "PropertyValueSpecification",
          "valueRequired": "http://schema.org/True",
          "valueName": "search_term_string"
        }
      }
    ]
  }
  return json
}

const templateArray = {
  Brand,
  ContactPoint,
  BreadcrumbList,
  WebPage
}

const jsonLd = (typeArray, data) => {
  const schema = {
    script: [
      {
        type: 'application/ld+json',
        json: []
      }
    ]
  }
  typeArray.forEach((item) => {
    schema.script[0].json.push(templateArray[item](data))
  })
  return schema
}

module.exports = jsonLd
