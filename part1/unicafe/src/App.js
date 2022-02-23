import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = ({ text, value }) =>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

const DetailedStatistics = ({ sum, avg, positivity }) => {
  if (sum > 0) {
    return (
      <>
        <StatisticLine text="all" value={sum} />
        <StatisticLine text="average" value={Number(avg).toFixed(1)} />
        <StatisticLine text="positive" value={Number(positivity).toFixed(1) + ' %'} />
      </>
    )
  }
  else {
    return (
      <tr>
        <td>
          <p>No feedback given</p>
        </td>
      </tr>
    )
  }
}

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad
  const avg = (good + bad * -1) / sum
  const positivity = good / sum * 100

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <DetailedStatistics sum={sum} avg={avg} positivity={positivity} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App