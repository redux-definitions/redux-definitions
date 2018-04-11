import { update } from 'lodash/object'

export const scopeReductionFactory = (namespacing) => (fn) => (state, action) => {
  const [_, ...namespacingWithoutRoot] = namespacing
  const namespacingWithoutRootOrField = namespacingWithoutRoot.slice(0, -1)
  const nextState = { ...state }

  if (namespacingWithoutRootOrField.length) {
    return update(
      nextState,
      namespacingWithoutRootOrField.join('.'),
      (scopedState) => fn(scopedState, action),
    )
  }

  return fn(state, action)
}

