import { CoursePart } from "../types"

const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
  return (
    <div>{courseParts.map(c=> <p key={c.name}>{c.name} {c.exerciseCount}</p>)}</div>
  )
}

export default Content