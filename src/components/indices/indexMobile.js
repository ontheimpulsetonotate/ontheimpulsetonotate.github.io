import _ from 'lodash'
import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { COLORS, FONT_FAMILIES, FONT_SIZES, SIZES, TIMINGS } from '../../constants/stylesConstants'
import apiServices from '../../services/apiServices'
import { padNumber, validateString } from '../../utils/commonUtils'
import Size from '../../utils/helpers/size'
import mixins from '../../utils/mixins'
import FullContainer from '../common/containers/fullContainer'
import Header from '../common/header/header'
import { FilterImgContainer } from '../common/img/filteredImg'
import SortArrow from '../common/text/sortArrow'


const IndexMobile = ({ onRowClick, onClose }) => {
  const [sort, setSort] = useState({ index: 0, isAscending: true })
  const data = apiServices.indexTabData

  const headers = [
    ['section', () => _.sortBy(data, frag => frag.imgNum[0])],
    ['read', () => _.sortBy(data, frag => frag.pageNum[0])]
  ]

  const handleRowClick = (e, { imgNum }) => {
    e.stopPropagation()
    onRowClick(imgNum[0])
    onClose()
  }

  const sortedData = useMemo(() => {
    const sorted = headers[sort.index][1]()
    return sort.isAscending ? sorted : _.reverse(sorted)
  }, [sort.index, sort.isAscending])

  return (
    <IndexContainer>
      <TableContainer>
        <TableHead>
          {
            headers.map(([name], i) => {
              const isSorting = sort.index === i
              const isPageHeader = name === 'page'
              return (
                <p key={name} onClick={() => setSort(prev => ({
                  index: i,
                  isAscending: isSorting ? !prev.isAscending : true
                }))}>
                  {!isPageHeader && name}
                  <SortArrow isSorting={isSorting} isAscending={sort.isAscending} />
                  {isPageHeader && name}
                </p>
              )
            })
          }
        </TableHead>
        {sortedData.map((nodeData, i) => {
          const {
            artistFirstName,
            artistLastName,
            pageNum
          } = nodeData
          return (
            <Row key={i} onClick={e => handleRowClick(e, nodeData)}>
              <p>
                {artistLastName}{validateString(artistFirstName, `, ${artistFirstName}`)}
              </p>
              <p>
                {!!pageNum.length && `P. ${pageNum.map(num => padNumber(num)).join('—')}`}
              </p>
            </Row>
          )
        }
        )}
      </TableContainer>
    </IndexContainer>
  )
}

const IndexContainer = styled(FullContainer)`
${mixins.highZIndex(4)}
  box-sizing: border-box;
  padding: 0 ${SIZES.PAGE_MARGIN_MOBILE.css}; // TODO
  background-color: ${COLORS.LIGHT_BEIGE};
  user-select: none;
`

const TableContainer = styled.div`
  ${mixins.noScrollBar}
  position: absolute;
  width: calc(100% - ${SIZES.PAGE_MARGIN_DESKTOP.mult(2).css});
  top: ${SIZES.INDEX_STICKY_TOP.css};
  overflow-y: scroll;
  height: ${Size.subFromFullHeight(SIZES.INDEX_STICKY_TOP).css};
`
const HeaderContainer = styled(Header)`
  ${mixins.flex('initial', 'space-between')}

  ${FilterImgContainer} {
    position: absolute;
    top: ${SIZES.PAGE_MARGIN_DESKTOP.css};
    right: ${SIZES.PAGE_MARGIN_DESKTOP.css};
  }
`

const Row = styled.div`
  ${mixins
    .chain()
    .border()
    .flex('center', 'space-between')}
  width: 100%;

  &:last-child {
      border: none;
  }
  cursor: pointer;

  p {
    font-family: ${FONT_FAMILIES.APERCU_COND};
    font-weight: normal;
    line-height: ${FONT_SIZES.LEADING_M.css};
    text-transform: uppercase;
    margin: 0.75em 0;
    &:not(:last-child){
      margin-right: 0.25em;
    }
  }

  th {
    text-align: left;
  }

  td, th {
    padding: 0;
  }

  :last-child {
    justify-self: end;
  }
`

const TableHead = styled(Row)`
  ${mixins.border(2)}
  position: sticky;
  top: -1px;
  background-color: ${COLORS.LIGHT_BEIGE};
  cursor: initial;

  p {
    width: fit-content;
    font-weight: 500;
    cursor: pointer;
  }
`


export default IndexMobile