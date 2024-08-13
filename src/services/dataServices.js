import _ from 'lodash'
import html from '../data/data'


const strip = html => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent || ''
}

const parseNumRange = numRangeString =>
  [...numRangeString.matchAll(/[0-9]+/g)]
    .map(match => parseInt(match[0]))

const parsedData = (() => {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  const main = tempDiv.querySelector('.grid-container')

  // TODO: ENUM
  const dataKeys = [
    'imgNum',
    undefined,
    'imgLink',
    'sectionTitle',
    'pageNum',
    'artistLastName',
    'artistFirstName',
    'medium',
    'workDetails',
    'copyright',
    'text',
    'footnotes',
    'project',
    'interview'
  ]

  const data = Array.from(main.querySelector('tbody').children)
    .slice(2)
    .map(tr => {
      const tdArray = Array.from(tr.querySelectorAll('td')).slice(0, dataKeys.length)
      if (!tdArray[0].innerText.match(/^\[[0-9]+\]/)) return false
      const data = tdArray.reduce((trData, td, i) => {
        const key = dataKeys[i]
        const strippedHtml = strip(td.innerHTML)

        if (['imgNum', 'pageNum'].includes(key))
          trData[key] = parseNumRange(td.innerHTML)
        else if (['workDetails', 'text'].includes(key))
          trData[key] = td.innerHTML
        else if (['footnotes', 'project'].includes(key))
          trData[key] = td.innerHTML
            .split('<br><br>')
            .map(notation => notation.replace(/^\[[0-9]+\] /, ''))
            .filter(n => n)
        else if (key)
          trData[key] = strippedHtml

        return trData
      }, {})

      data.imgLink = `images/REF_${_.padStart(data.imgNum[0], 3, '0')}.webp`
      return data
    })
    .filter(d => d)

  console.log(data)
  return data
})()

const textData = parsedData.filter(({ text }) => text)

const getImgsByTitle = title =>
  parsedData
    .filter(({ sectionTitle }) => title === sectionTitle)
    .map(data => _.pick(data, 'imgLink', 'imgNum'))

const dataServices = {
  strip,
  parseNumRange,
  getImgsByTitle,
  parsedData,
  textData
}

export default dataServices