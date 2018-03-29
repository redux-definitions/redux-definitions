import Re from '../src'

const model = Re.createModel('todo', {}, {
  foo: 'setable',
  bar: 'setable',
})

const { reducer, actions, selectors, } = model

export default {
  reducer,
  actions,
  selectors,
}
