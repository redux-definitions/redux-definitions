import { update } from 'lodash/object'

export const scopeReductionFactory = (namespacing) => (fn) => (state, action) => {
  const [_, ...namespacingWithoutRoot] = namespacing
  const namespacingWithoutRootOrField = namespacingWithoutRoot.slice(0, -1)
  const nextState = { ...state }

  if (namespacingWithoutRoot.length) {
    return update(
      nextState,
      namespacingWithoutRoot.join('.'),
      (scopedState) => fn(scopedState, action),
    )
  }

  return fn(state, action)
}

