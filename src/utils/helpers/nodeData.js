import _ from 'lodash'
import { FRAGMENT_TYPES } from '../../constants/apiConstants'
import { quickArray } from '../commonUtils'

class NodeData {
  constructor() {
    this.type = undefined
    this.imgNum = undefined
    this.imgLink = undefined
    this.sectionTitle = undefined
    this.pageNum = undefined
    this.artistLastName = undefined
    this.artistFirstName = undefined
    this.medium = undefined
    this.workDetails = undefined
    this.copyright = undefined
    this.text = undefined
    this.footnotes = undefined
    this.projects = undefined
    this.interview = undefined
    this.interviewPrefix = undefined

    this.imgLinks = []
  }

  get isText() {
    return this.type === FRAGMENT_TYPES.TEXT
  }

  get isInterview() {
    return this.type === FRAGMENT_TYPES.INTERVIEW
  }

  get isOrphan() {
    return this.type === FRAGMENT_TYPES.ORPHAN
  }



  getImgLinks() {
    const imgLinks = this.imgNum.length === 1 ?
      [this.getImgLink()] :
      quickArray(
        this.imgNum[1] - this.imgNum[0] + 1,
        i => this.imgNum[0] + i
      ).map(num => this.getImgLink(num))
    return this.imgLinks = imgLinks.filter(l => l)
  }

  getImgLink(imgNum = this.imgNum) {
    return this.isText ?
      `01_Primary-Text/REF_${_.padStart(imgNum, 3, '0')}.webp` :
      this.isInterview ?
        `04_Interviews/Interview_${this.interviewPrefix}${imgNum}.webp` :
        undefined
  }

  get isTextNode() {
    return this.text && !this.isOrphan
  }

  get isImgNode() {
    return !!this.imgLinks.length
  }
}

export default NodeData