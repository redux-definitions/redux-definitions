import { makeScope } from './index'
import { Action } from 'redux-actions'


describe('makeScope', () => {
  it('default', () => {
    const scope = makeScope(['x', 'y'])

    const reducer = (s: {}, { payload }: Action<string>) => ({ foo: payload })
    const res = scope('z', reducer)

    const action = res.action('string')

    expect(action).toEqual({
      type: 'z',
      payload: 'string'
    })
  })
})