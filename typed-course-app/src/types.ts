export type CoursePart =
    | CourseNormalPart
    | CourseProjectPart
    | CourseSubmissionPart
    | CourseSpecialPart;

interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CoursePartSolo extends CoursePartBase {
    description: string;
}

interface CourseNormalPart extends CoursePartSolo {
    type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartSolo {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartSolo {
    type: "special";
    requirements: string[];
}
