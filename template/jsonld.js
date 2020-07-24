const Brand = (data) => {
  return {
    '@context': 'http://schema.org',
    '@type': 'Brand',
    'name': data.webSiteTitle,
    'url': data.webSiteUrl,
    'description': data.webSitedescription,
    'image': data.imageUrl,
    ...data.logo ? {'logo': data.logo} : {},
    ...data.lslogan ? {'lslogan': data.lslogan} : {},
    ...data.sameAs ? {'sameAs': data.sameAs} : {}
  } 
}

const ContactPoint = (data) => {
  return {
    '@context': 'http://schema.org',
    '@type': 'ContactPoint',
    // 'contactOption': 'TollFree',
    ...data.telephone ? {'telephone': data.telephone} : {},
    ...data.contactType ? {'contactType': data.contactType} : {},
    ...data.email ? {'email': data.email} : {},
    ...data.hoursAvailable ? {
      'hoursAvailable': data.hoursAvailable.days.map((item) => {
        return {
          '@type': 'OpeningHoursSpecification',
          'opens': data.hoursAvailable.opens,
          'closes': data.hoursAvailable.closes,
          'dayOfWeek': 'http://schema.org/' + item
        }
      })
    } : {}
  }
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
  return {
    '@context': 'http://schema.org',
    '@type': data.pageType,
    'name': data.title,
    'url': data.webPageUrl,
    'image': data.imageUrl,
    'description': data.description,
    'isPartOf': {
      '@type': 'WebSite',
      'name': data.webSiteTitle,
      'url': data.webSiteUrl,
      'description': data.webSitedescription,
    },
    ...data.socialLinks ? {'sameAs': data.socialLinks} : {},
    ...data.copyright ? {'copyrightHolder': {
      '@type': 'Organization',
      ...data.copyright.name ? {'name': data.copyright.name} : {},
      ...data.copyright.legalName ? {'legalName': data.copyright.legalName} : {},
      ...data.copyright.year ? {'name': data.copyright.year} : {}
    }} : {},
    ...data.searchUrlTemplate ? {
      'isPartOf': {
        'potentialAction': [
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
    } : {},
  }
}

const templateList = {
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
    schema.script[0].json.push(templateList[item](data))
  })
  return schema
}

export default jsonLd
