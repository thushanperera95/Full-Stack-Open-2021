import { CoursePart } from "../types"

const PartDetails = ({part}: {part: CoursePart}) => {
  switch (part.type) {
    case "normal":
      return (
        <>
          {part.description}
        </>
      )
    case "groupProject":
      return (
        <>
          project exercises {part.groupProjectCount}
        </>
      )
    case "submission":
      return (
        <>
          {part.description}<br />
          submit to {part.exerciseSubmissionLink}
        </>
      )
    case "special": 
      return (
        <>
            {part.description}<br />
            required skills: {part.requirements.toString()}
        </>
      )
    default:
      return null
  }
}

const Part = ({part}: {part: CoursePart}) => {
  return (
    <p>
      <b>{part.name} {part.exerciseCount}</b><br />
      <PartDetails part={part} />
    </p>
  )
}

export default Part