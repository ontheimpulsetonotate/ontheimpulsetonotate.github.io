import styled from 'styled-components'
import { SIZES } from '../../../constants/stylesConstants'


const SortArrow = ({ isSorting, isAscending }) => {
  return isSorting &&
    <ArrowContainer>{isAscending ? '↑' : '↓'} </ArrowContainer>
}

const ArrowContainer = styled.span`
  &:last-child {
    padding-left: ${SIZES.ARROW_PADDING};
  }

  &:first-child {
    padding-right: ${SIZES.ARROW_PADDING};
  }
`

export default SortArrow