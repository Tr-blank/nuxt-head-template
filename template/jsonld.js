const Brand = (data) => {
  return {
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
}

const ContactPoint = (data) => {
  return {
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

const webpage = (data) => {
  return {
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
}

const templateArray = {
  Brand,
  ContactPoint,
  BreadcrumbList,
  webpage
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
