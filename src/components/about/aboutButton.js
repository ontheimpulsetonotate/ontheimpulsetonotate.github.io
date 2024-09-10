import _ from 'lodash'

import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useIsAbout from '../../hooks/useIsAbout'
import useToPrev from '../../hooks/useToPrev'
import useIsMobile from '../../hooks/useIsMobile'


const AboutButton = ({ mobileIndexIsOpen, mobileOnClick = _.noop }) => {
  const isAbout = useIsAbout()
  const isMobile = useIsMobile()
  const navigate = useNavigate()
  const toPrev = useToPrev()

  const handleClick = () => {
    if (isAbout && !mobileIndexIsOpen)
      return toPrev()
    mobileOnClick()
    navigate('/about')
  }

  return (
    <LinkContainer>
      <button
        onClick={handleClick}>
        [{!isAbout ? '+' :
          (isMobile ? (mobileIndexIsOpen ? '+' : 'x') : 'CLOSE')}]
      </button>
    </LinkContainer>
  )
}

const LinkContainer = styled.div`
  display: inline;
  padding-left: 1em;
`



export default AboutButton