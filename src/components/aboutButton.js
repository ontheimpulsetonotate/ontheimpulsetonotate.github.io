import _ from 'lodash'

import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useIsAbout from '../hooks/useIsAbout'
import useToPrev from '../hooks/useToPrev'


const AboutButton = () => {
  const isAbout = useIsAbout()
  const navigate = useNavigate()
  const toPrev = useToPrev()
  return (
    <LinkContainer>
      <button
        onClick={() => isAbout ? toPrev() : navigate('/about')}>
        [{isAbout ? 'CLOSE' : '+'}]
      </button>
    </LinkContainer>
  )
}

const LinkContainer = styled.div`
  display: inline;
  padding-left: 1em;
`



export default AboutButton