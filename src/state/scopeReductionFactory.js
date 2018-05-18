import { update } from 'lodash/object'

export const scopeReductionFactory =
  (namespacing, excludeField) =>
  (fn) =>
  (state, action) => {
  const keyPath = excludeField
    ? namespacing.slice(1, -1)
    : namespacing.slice(1)

  const nextState = { ...state }

  if (keyPath.length) {
    return update(
      nextState,
      keyPath.join('.'),
      (scopedState) => fn(scopedState, action),
    )
  }

  return fn(state, action)
}

