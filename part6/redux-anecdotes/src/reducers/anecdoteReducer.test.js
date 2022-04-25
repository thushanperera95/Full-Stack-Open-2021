import deepFreeze from 'deep-freeze'
import anecdoteReducer from './anecdoteReducer'

describe('anecdote reducer', () => {
  const initialState = [
    {
      content: 'Test Anecdote',
      id: 12345,
      votes: 0
    },
    {
      content: 'Test Anecdote 2',
      id: 4567,
      votes: 0
    }
  ]

  test('returns initial state of default anecdotes when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = anecdoteReducer(undefined, action)
    expect(newState.length).toEqual(6)
  })

  test('vote is incremented on target anecdote', () => {
    const state = initialState
    const action = {
      type: 'anecdotes/vote',
      payload: 4567
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState).toEqual(
      [
        {
          content: 'Test Anecdote',
          id: 12345,
          votes: 0
        },
        {
          content: 'Test Anecdote 2',
          id: 4567,
          votes: 1
        }
      ]
    )
  })

  test('add results in new anecdote added to the list of anecdotes', () => {
    const state = initialState
    const action = {
      type: 'anecdotes/add',
      payload: 'This is a new anecdote'
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState.length).toEqual(3)

    const newlyAddedAnecdote = newState.find(n => n.content === 'This is a new anecdote')
    expect(newlyAddedAnecdote.content).toEqual('This is a new anecdote')
    expect(newlyAddedAnecdote.votes).toEqual(0)
    expect(newlyAddedAnecdote.id).toBeDefined()
  })
})