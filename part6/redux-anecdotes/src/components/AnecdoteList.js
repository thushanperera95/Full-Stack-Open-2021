import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify, reset } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes.filter(a => a.content.includes(filter)))
  const dispatch = useDispatch()

  const handleVote = (id) => {
    dispatch(vote(id))

    const anecdote = anecdotes.find(n => n.id === id)
    dispatch(notify(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(reset())
    }, 5000)
  }

  return (
    <div>
      {[...anecdotes]
        .sort((a, b) => a.votes > b.votes ? -1 : 1)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
              <button onClick={() => handleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList
