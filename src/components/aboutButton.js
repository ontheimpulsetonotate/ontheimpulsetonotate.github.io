import _ from 'lodash'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import useIsAbout from '../hooks/useIsAbout'


const AboutButton = () => {
  const isAbout = useIsAbout()

  return (
    <LinkContainer>
      <Link to={isAbout ? '..' : 'about'}>
        [{isAbout ? 'CLOSE' : '+'}]
      </Link>
    </LinkContainer>
  )
}

const LinkContainer = styled.div`
  display: inline;
  padding-left: 1em;
`



export default AboutButton