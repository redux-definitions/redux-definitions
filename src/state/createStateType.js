import { update, get } from 'lodash/object'
import { createAction } from 'redux-actions'
import { scopeReductionFactory } from 'state/scopeReductionFactory'

const isFunction = (fn) => typeof fn === 'function'

export const createStateType = ({
  actions,
  selectors,
  defaultState,
  transformInitialState,
  invalidAtTopLevel = false,
}) => {

  const generate = (options = {}) =>
    generateModel({
      options,
      defaultState,
      actionFns: actions,
      selectorFns: selectors,
      transformInitialState,
      invalidAtTopLevel,
    })

  const Type = (options) => ({
    generate: generate(options)
  })

  Type.generate = generate()

  return Type
}

export const generateModel = ({
  options,
  defaultState,
  actionFns,
  selectorFns,
  transformInitialState,
  invalidAtTopLevel,
}) => (namespacing, topLevel) => {
  if (invalidAtTopLevel && topLevel) {
    throw Error('Redux Enterprise: State Type cannot be used at the reducer top level. Redux reducers do not support entire state being this state value.')
  }

  const namespace = namespacing.join('/')
  const getType = (type) => `${namespace}/${type}`
  const scopeReduction = scopeReductionFactory(namespacing)
  const reducers = {}
  const selectors = {}
  const actions = {}

  const actionFnsObject =
    isFunction(actionFns) ? actionFns(options) : actionFns

  for (const [key, fn] of Object.entries(actionFnsObject)) {
    const type = getType(key)
    actions[key] = createAction(type)
    reducers[type] = scopeReduction(fn)
  }

  for (const [key, fn] of Object.entries(selectorFns)) {
    selectors[key] = (state, params) =>
      fn(get(state, namespacing), params)
  }

  const transform = transformInitialState || ((s) => s)

  const { initialState } = options

  return {
    actions,
    reducers,
    selectors,
    initialState: initialState ?
      transform(initialState) : defaultState,
  }
}

