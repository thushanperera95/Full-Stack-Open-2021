import deepFreeze from 'deep-freeze'
import filterReducer from './filterReducer'

describe('filter reducer', () => {
  test('returns initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = filterReducer(undefined, action)
    expect(newState).toEqual('')
  })

  test('setFilter results in the filter being set', () => {
    const action = {
      type: 'filter/setFilter',
      payload: 'test'
    }
    const initialState = 'a'

    deepFreeze(initialState)
    const newState = filterReducer(initialState, action)
    expect(newState).toEqual('test')
  })
})