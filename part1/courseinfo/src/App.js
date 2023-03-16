const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}


const Content = (props) => {
 
  console.log(props)

  return (
    <div>
      {props.parts.map(element => {
        console.log(element);
        return (
          <div>
            <Part part = {element} />
          </div>
        )

  })}
    </div>
  )
}
const Part = (props) => {
  console.log(props)

  return (
    <div>
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )
}
const Total = (props) => {
  // console.log(props)
const sumEx = props.parts.reduce((prev, cur) => prev + cur.exercises, 0)
  return (
    <div>
      <p>
        Number of exercises {sumEx}
          
      </p>
    </div>
  )
}


const App = () => {
 
  const course = 'Half Stack application development'
  const parts = [
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

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
      
    </div>
    
  )
}

export default App
