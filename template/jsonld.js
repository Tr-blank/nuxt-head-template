const Brand = (data) => {
  return {
    '@context': 'http://schema.org',
    '@type': 'Brand',
    'name': data.webSiteTitle,
    'url': data.webSiteUrl,
    'description': data.webSiteDescription,
    'image': data.imageUrl,
    ...data.logo ? {'logo': data.logo} : {},
    ...data.slogan ? {'slogan': data.slogan} : {},
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

const Organization = (data) => {
  return {
    '@context': 'http://schema.org',
    '@type': 'Organization',
    'name': data.organization.name,
    'url': data.organization.url,
    ...data.organization.legalName ? {'telephone': data.organization.legalName} : {},
    ...data.organization.telephone ? {'telephone': data.organization.telephone} : {},
    ...data.organization.email ? {'email': data.organization.email} : {},
    ... data.organization.brand ? {
      'brand': data.organization.brand.map((brand) => {
        return {
          '@type': 'Brand',
          'name': brand.name,
          'url': brand.url,
        }
      })
    } : {}
  }
}

const BreadcrumbList = (data) => {
  return {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': data.breadcrumbList.map((item, index) => {
      return {
        '@type': 'ListItem',
        'position': index,
        'item': {
          '@type': 'Thing',
          '@id': item.link,
          'name': item.name
        }
      }
    })
  }
}

const WebPage = (data) => {
  const fullTitle = data.titleTemplate ? data.titleTemplate.replace('%s', data.title) : data.webSiteTitleTemplate ? data.webSiteTitleTemplate.replace('%s', data.title) : data.title

  return {
    '@context': 'http://schema.org',
    '@type': data.pageType,
    'name': fullTitle,
    'url': data.webPageUrl,
    'image': data.imageUrl,
    'description': data.description,
    'isPartOf': {
      '@type': 'WebSite',
      'name': data.webSiteTitle,
      'url': data.webSiteUrl,
      'description': data.webSiteDescription,
      ...data.searchUrlTemplate ? {
        'potentialAction': [
          {
            '@type': 'SearchAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': data.searchUrlTemplate
            },
            'query-input': {
              '@type': 'PropertyValueSpecification',
              'valueRequired': 'http://schema.org/True',
              'valueName': 'search_term_string'
            }
          }
        ]
      } : {}
    },
    ...data.socialLinks ? {'sameAs': data.socialLinks} : {},
    ...data.copyright ? {'copyrightHolder': {
      '@type': 'Organization',
      ...data.copyright.name ? {'name': data.copyright.name} : {},
      ...data.copyright.legalName ? {'legalName': data.copyright.legalName} : {}
    }} : {},
    ...data.copyright.year ? {'copyrightYear': data.copyright.year} : {}
  }
}

const Product = (data) => {
  return {
    '@context': 'http://schema.org',
    '@type': 'Product',
    'name': data.product.name,
    'url': data.webPageUrl,
    'description': data.product.description,
    'sku': data.product.sku,
    'mpn': data.product.mpn | '',
    'productID': data.product.id,
    ...data.product.category ? {'category': data.product.category} : {},
    ...data.product.weight ? {'weight': data.product.weight} : {},
    ...data.product.material ? {'material': data.product.material} : {},
    'image': data.imageUrl,
    'brand': {
      '@type': 'Brand',
      'name': data.webSiteTitle,
      'url': data.webSiteUrl,
      'description': data.webSiteDescription,
      'image': data.imageUrl,
      ...data.logo ? {'logo': data.logo} : {},
      ...data.slogan ? {'slogan': data.slogan} : {},
      ...data.sameAs ? {'sameAs': data.sameAs} : {}

    },
    ...data.review ? { 
      'review': data.review.map((review) => {
        return {
          '@type': 'Review',
          'reviewRating': {
            '@type': 'Rating',
            ...review.bestRating ? {'bestRating': review.bestRating} : {},
            ...review.ratingValue ? {'ratingValue': review.ratingValue} : {},
            ...review.worstRating ? {'worstRating': review.worstRating} : {}
          },
          ...review.author ? {
            'author': {
              '@type': 'Person',
              'name': review.author
            }
          } : {},
          ...review.title ? { 'name': review.title} : {},
          ...review.datePublished ? {'datePublished': review.datePublished} : {},
          ...review.reviewBody ? {'reviewBody': review.reviewBody} : {}
        }
      })
    } : {},
    'aggregateRating': {
      '@type': 'AggregateRating',
      'reviewCount': data.aggregateRating.reviewCount,
      ...data.aggregateRating.bestRating ? {'bestRating': data.aggregateRating.bestRating} : {},
      ...data.aggregateRating.ratingValue ? {'ratingValue': data.aggregateRating.ratingValue} : {},
      ...data.aggregateRating.worstRating ? {'worstRating': data.aggregateRating.worstRating} : {}
    },
    'offers': {
      '@type': 'Offer',
      'url': data.webPageUrl,
      'priceCurrency': data.offers.priceCurrency,
      'price': data.offers.price,
      'priceValidUntil': data.offers.priceValidUntil,
      'availability': 'https://schema.org/' + data.offers.availability
    },
    ...data.organization ? {
      'manufacturer': [
        {
          '@type': 'Organization',
          'name': data.organization.name,
          ...data.organization.description ? {'description': data.organization.description} : {}
        }
      ]
    } : {}
  }
}

module.exports = {
  Brand,
  ContactPoint,
  Organization,
  BreadcrumbList,
  WebPage,
  Product
}
