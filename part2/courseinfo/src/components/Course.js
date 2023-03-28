
const Course = ({ courses }) => {
    return (
        courses.map(course => {
            // console.log(course)
            // console.log(course.parts)
            return (
                <div key={course.id}>
                    <Header header={course} />
                    <Content content={course} />
                    <Total total={course} />
                </div>
            )
        }
        ))
}
const Header = ({ header }) => {
    // console.log(header)
    return (
        <div>
            <h2>
                {header.name}
            </h2>
        </div>
    )
}

const Content = ({ content }) => {
    return (
        <div>
            {content.parts.map(element => {
                // console.log(element)
                return (
                    <div key={element.id}>
                        <Part part={element} />
                    </div>
                )
            })}
        </div>
    )
}

const Part = ({ part }) => {
    // console.log(part)
    return (
        <div>
            <p>{part.name} {part.exercises}</p>
        </div>
    )
}


const Total = ({ total }) => {
    // console.log(props)
    const sumEx = total.parts.reduce((prev, cur) => prev + cur.exercises, 0)

    return (
        <div>
            <b>
                total of {sumEx} exercises
            </b>
        </div>
    )
}
export default Course