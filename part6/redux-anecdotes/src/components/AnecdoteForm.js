import { useDispatch } from 'react-redux'
import { add } from '../reducers/anecdoteReducer'
import { notify, reset } from '../reducers/notificationReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const handleAdd = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(add(content))

    dispatch(notify(`you created '${content}'`))
    setTimeout(() => {
      dispatch(reset())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAdd}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewAnecdote