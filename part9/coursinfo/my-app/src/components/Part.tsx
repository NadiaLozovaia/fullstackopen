import { CoursePart } from '../types';
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ part }: { part: CoursePart }) => {


    switch (part.kind) {
        case 'background':
            // console.log(part.name, part.exerciseCount, part.description, part.backgroundMaterial)
            return (
                <div>
                    <div>
                        <b>{part.name}   {part.exerciseCount} </b>
                    </div>
                    <div>
                        <i>{part.description} </i>
                    </div>
                    <div>  {part.backgroundMaterial}  </div>
                </div>
            )
        case 'basic':
            // console.log(part.name, part.exerciseCount, part.description)
            return (
                <div>
                    <div>
                        <b>{part.name}   {part.exerciseCount} </b>
                    </div>
                    <div>
                        <i>{part.description} </i>
                    </div>
                </div>
            )
        case 'group':
            // console.log(part.name, part.exerciseCount, part.groupProjectCount)
            return (
                <div>
                    <div>
                        <b>{part.name}   {part.exerciseCount} </b>
                    </div>
                    <div> group project exercises {part.groupProjectCount}</div>
                </div>
            )
        case 'special':
            return (
                <div>
                    <div>
                        <b>{part.name}   {part.exerciseCount} </b>
                    </div>
                    <div> requirements: {part.requirements.map((r, i, a) => {
                        const delimiter = i === a.length - 1 ? "" : ", ";
                        return (
                            <i key={r}>
                                {r}{delimiter}
                            </i>
                        )
                    })}



                    </div>
                </div>
            )
        default:
            return assertNever(part);
    }




};



export default Part