import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <div>
            {courseParts.map((t) => {
                return <Part part={t} />;
            })}
        </div>
    );
};

export default Content;
