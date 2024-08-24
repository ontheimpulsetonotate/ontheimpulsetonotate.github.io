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
    'projects',
    'interview'
  ]

  const data = Array.from(main.querySelector('tbody').children)
    .slice(2)
    .map(tr => {
      const tdArray = Array.from(tr.querySelectorAll('td')).slice(0, dataKeys.length)
      let type
      if (tdArray[0].innerText.match(/^\[[0-9]+\]/))
        type = 'main'
      else if (tdArray[0].innerText.match(/^\[DIALOGUE [A-Z][0-9]\]/))
        type = 'interview'
      else return false

      const data = tdArray.reduce((trData, td, i) => {
        const key = dataKeys[i]
        const strippedHtml = strip(td.innerHTML)

        if (['imgNum', 'pageNum'].includes(key)) {
          trData[key] = parseNumRange(td.innerHTML)
          if (key === 'imgNum' && type === 'interview') {
            trData.interviewPrefix = td.innerHTML.match(/\[DIALOGUE ([A-Z])[0-9]\]/)?.[1]
          }
        }

        else if (['workDetails', 'text'].includes(key))
          trData[key] = td.innerHTML
        else if (['footnotes', 'projects'].includes(key)) {
          const notesArray = td.innerHTML
            .split('<br><br>')
            .filter(n => n)
          const notes = {}
          notesArray.forEach(note => {
            const noteNum = note.match(/\[([0-9]+)\]/)?.[1]
            if (noteNum)
              notes[noteNum] = note.replace(/^\[[0-9]+\] /, '')
          })
          trData[key] = notes
        }
        else if (key)
          trData[key] = strippedHtml

        return trData
      }, {})

      data.type = type
      // TODO: data.imgNum - multiple
      if (type === 'main')
        data.imgLink = `01_Primary-Text/REF_${_.padStart(data.imgNum[0], 3, '0')}.webp`
      else data.imgLink = `04_Interviews/Interview_${data.interviewPrefix}${data.imgNum}.webp`
      return data
    })
    .filter(d => d)

  return _.groupBy(data, 'type')
})()

const textData = [
  ...parsedData.main.filter(({ text }) => text),
  ...parsedData.interview.filter(({ text }) => text),
] // TODO

console.log(parsedData.interview)

const getImgsByTitle = title =>
  parsedData
    .main
    .filter(({ sectionTitle }) => title === sectionTitle)
// .map(data => _.pick(data, 'imgLink', 'imgNum'))

const dataServices = {
  strip,
  parseNumRange,
  getImgsByTitle,
  parsedData,
  textData
}

export default dataServices