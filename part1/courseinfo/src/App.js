const Header = ({ course }) => {
  // console.log(course)
  return (
    <div>
      <h1>
        {course.name}
      </h1>
    </div>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(element => {
        console.log(element);
        return (
          <div>
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

const Total = ({ course }) => {
  // console.log(props)
  const sumEx = course.parts.reduce((prev, cur) => prev + cur.exercises, 0)
  // const sumEx = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  return (
    <div>
      <p>
        Number of exercises {sumEx}
      </p>
    </div>
  )
}


const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>

  )
}

export default App