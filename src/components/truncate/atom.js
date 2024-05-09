export const Atom = props => props.children || null

Atom.__rtm_atom = true

export const isAtomComponent = reactEl =>
  !!(reactEl && reactEl.type && reactEl.type.__rtm_atom === true)


export const ATOM_STRING_ID = '<Atom>'
