interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}

interface CourseDetailPartBase extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CourseDetailPartBase {
  type: "normal"
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject"
  groupProjectCount: number
}

interface CourseSubmissionPart extends CourseDetailPartBase {
  type: "submission"
  exerciseSubmissionLink: string
}

interface CourseSkillsPart extends CourseDetailPartBase {
  type: "special"
  requirements: string[]
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSkillsPart;