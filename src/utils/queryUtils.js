import breakpts from '../data/breakpoints'
import { loopObject } from './commonUtils'



// const createQueries = (sizePrefix) =>
//   loopObject(breakpts, (_, breakpt) =>
//     `only screen and (${sizePrefix}-width: ${breakpt + (sizePrefix === 'min' ? 1 : 0)}px)`)

// export const minQueries = createQueries('min')
// export const maxQueries = createQueries('max')
// export const desktopQuery = minQueries.l
// export const mobileQuery = maxQueries.l