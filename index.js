const meta = { ...require('./template/meta') }
const templateList = { ...require('./template/jsonld') }

const jsonLd = (typeArray, data) => {
  return {
    script: [
      {
        type: 'application/ld+json',
        json: typeArray.map((item) => {
          return templateList[item](data)
        })
      }
    ]
  }
}

module.exports = {
  meta,
  jsonLd
}

