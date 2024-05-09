import styled from 'styled-components'
import _ from 'lodash'
import { COLORS, FONT_FAMILIES, FONT_SIZES, SIZES } from '../constants/stylesConstants'
import mixins from '../utils/mixins'
import Header from './common/header'
import { remify, toggleStyle } from '../utils/styleUtils'
import { useEffect, useMemo, useState } from 'react'
import dataServices from '../services/dataServices'
import { addEventListener } from '../utils/reactUtils'
import { getDataStringSorter } from '../utils/commonUtils'
import SortArrow from './common/text/sortArrow'
import FilteredImg, { FilterImgContainer } from './common/img/filteredImg'


const IndexTab = ({ onRowClick }) => {
  const [indexIsOpened, setIndexIsOpened] = useState(false)
  const [sort, setSort] = useState({ index: 0, isAscending: true })
  const [hoverIndex, setHoverIndex] = useState()
  const [imgIsLoaded, setImgIsLoaded] = useState()

  const data = dataServices.parsedData

  const headers = [
    {
      name: 'artist',
      getSorted: () => _.sortBy(data, frag => frag.imgNum[0])
    },
    {
      name: 'medium',
      getSorted: () => [...data].sort(getDataStringSorter('medium'))
    },
    {
      name: 'section',
      getSorted: () => [...data].sort(getDataStringSorter('sectionTitle'))
    },
    {
      name: 'page',
      getSorted: () => _.sortBy(data, frag => frag.pageNum[0])
    }
  ]

  const handleClick = (e, state) => {
    e.stopPropagation()
    setIndexIsOpened(state)
  }

  const handleRowClick = (e, data) => {
    e.stopPropagation()
    const { textData } = dataServices
    const matchByTitle = ({ sectionTitle }) => sectionTitle === data.sectionTitle
    const matches = textData.filter(matchByTitle)
    const index = matches.length === 1 ?
      textData.findIndex(matchByTitle) :
      textData.findIndex(({ text }) => data.text === text)
    onRowClick(index)
    setIndexIsOpened(false)
  }

  const sortedData = useMemo(() => {
    const sorter = headers[sort.index]
    const sorted = sorter.getSorted()
    return sort.isAscending ? sorted : _.reverse(sorted)
  }, [sort.index, sort.isAscending])

  useEffect(() => addEventListener(document, 'click', () => setIndexIsOpened(false)))

  const { imgLink } = sortedData[hoverIndex] ?? {}

  useEffect(() => {
    if (!imgLink) return
    const img = document.createElement('img')
    img.onload = () => setImgIsLoaded(true)
    img.src = imgLink
  }, [hoverIndex])

  const handleMouseEnter = i => {
    setHoverIndex(i)
    setImgIsLoaded(false)
  }


  const buttonFocus = indexIsOpened ? undefined : -1

  return (
    <IndexTabContainer $open={indexIsOpened} onClick={e => handleClick(e, true)}>
      <HeaderContainer>
        <h2>Index</h2>
        {!imgLink &&
          <button
            onClick={e => handleClick(e, false)}
            tabIndex={buttonFocus}>[CLOSE]</button>}
        {hoverIndex !== undefined && imgIsLoaded &&
          <FilteredImg
            backgroundColor={COLORS.BROWN}
            src={imgLink}
            maxSize={SIZES.IMG_MAX_SIZE + 'px'} />}
      </HeaderContainer>
      <TableContainer>
        <TableHead>
          {
            headers.map(({ name }, i) => {
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
        {sortedData.map((data, i) => {
          const { imgNum, artistLastName, medium, sectionTitle, pageNum } = data
          return <Row
            key={i}
            onMouseOver={() => handleMouseEnter(i)}
            onMouseOut={() => setHoverIndex()}
            onClick={e => handleRowClick(e, data)}>
            <p>
              {i === hoverIndex && <HoverArrow>→</HoverArrow>}
              [{imgNum.map(num => _.padStart(num, 3, '0')).join('—')}] {artistLastName}
            </p>
            <p>{medium}</p>
            <p>{sectionTitle}</p>
            <p>
              {!!pageNum.length && `P. ${pageNum.map(num => _.padStart(num, 3, '0')).join(' — ')}`}
            </p>
          </Row>
        }
        )}
      </TableContainer>
    </IndexTabContainer>
  )
}

const IndexTabContainer = styled.div`
${mixins.highZIndex(4)}
  width: 72.5vw;
  height: 100vh;
  position: absolute;
  transition: left 400ms ease-in-out;
  top: 0;
  left: ${toggleStyle('$open', `calc(27.5vw - ${SIZES.MARGIN} * 3)`, `calc(${SIZES.OPEN_INDEX_LEFT_VALUE}vw - ${SIZES.MARGIN})`)};
  padding: 0 ${SIZES.MARGIN};

  background-color: ${COLORS.DARK_BEIGE};
  user-select: none;
  cursor: ${toggleStyle('$open', '', 'pointer')};
`

const top = 'calc(180px + 20vh)'
const TableContainer = styled.div`
  position: absolute;
  width: calc(100% - ${SIZES.MARGIN} * 2);
  top: ${top}; // TODO
  overflow-y: scroll;
  height: calc(100vh - ${top});
  ${mixins.noScrollBar()}
`
const HeaderContainer = styled(Header)`
  ${mixins.flex('initial', 'space-between')}

  ${FilterImgContainer} {
    position: absolute;
    top: ${SIZES.MARGIN};
    right: ${SIZES.MARGIN};
  }
`

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 25%) 1fr ${remify(100)};
  width: 100%;
  border-bottom: ${COLORS.BROWN} 1px solid; // TODO: mixins
  cursor: pointer;

  p {
    font-family: ${FONT_FAMILIES.APERCU_COND};
    font-weight: normal;
    line-height: ${FONT_SIZES.LEADING_L};
    text-transform: uppercase;
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
  position: sticky;
  top: -1px;
  background-color: ${COLORS.DARK_BEIGE};
  cursor: initial;
  border-bottom: ${COLORS.BROWN} 2px solid; // TODO: mixins

  p {
    width: fit-content;
    font-weight: 500;
    cursor: pointer;
  }
`

const HoverArrow = styled.span`
  padding-right: ${SIZES.ARROW_PADDING};
`

export default IndexTab