import { CoursePart } from "../types";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.type) {
        case "normal":
            return (
                <div>
                    <b>
                        {part.name}:{part.exerciseCount}
                    </b>
                    <br />
                    <i>{part.description}</i>
                </div>
            );
        case "groupProject":
            return (
                <div>
                    <b>
                        {part.name}:{part.exerciseCount}
                    </b>
                    <br />
                    Project exercises: {part.groupProjectCount}
                </div>
            );
        case "submission":
            return (
                <div>
                    <b>
                        {part.name}:{part.exerciseCount}
                    </b>
                    <br />
                    <i>{part.description}</i>
                    <br />
                    Submit to: {part.exerciseSubmissionLink}
                </div>
            );
        case "special":
            return (
                <div>
                    <b>
                        {part.name}:{part.exerciseCount}
                    </b>
                    <br />
                    <i>{part.description}</i>
                    <br />
                    Required skills: {part.requirements.toString()}
                </div>
            );
        default:
            assertNever(part);
            return null;
    }
};

export default Part;
