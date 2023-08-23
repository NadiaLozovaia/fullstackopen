import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ parts }: { parts: CoursePart[] }) => {
    console.log(parts)
    return <div>
        {parts.map(part => {
            return (
                <div key={part.name}>
                    <Part part={part} />
                </div>
            )
        })
        }

    </div>
}
export default Content;