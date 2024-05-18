import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { SIZES } from '../constants/stylesConstants'
import mixins from '../utils/mixins'


const AboutButton = ({ onClick }) => {
  return (
    <LinkContainer>
      <Link to='about' onClick={onClick}>
        About
      </Link>
    </LinkContainer>
  )
}

const LinkContainer = styled.div`
  ${mixins.highZIndex(1)}
  position: fixed;
  bottom: ${SIZES.PAGE_MARGIN};
`



export default AboutButton