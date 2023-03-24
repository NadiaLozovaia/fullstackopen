import { useState } from 'react'

const Button = ({ handleClick, text }) => (

  <button onClick={handleClick}>
    {text}
  </button>
)
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const Content = ({ text }) => (
  <p>{text}</p>
)
const Votes = ({ text }) => (
  <p>has {text} votes</p>
)
const Header = ({ text }) => (
  <h1>{text}</h1>
)

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const [best, setBest] = useState([0, 0])
  
  const newAnecdote = () => {
    let selectedNew
    selectedNew = getRandomInt(anecdotes.length)
    setSelected(selectedNew)
 
  }
 
  const newPoints = () => {
    const copyPoints = { ...points }
    copyPoints[selected] += 1
    setPoints(copyPoints)
    console.log(copyPoints)
   
    if (copyPoints[selected] > best[1]) {   
      const copyBest = [selected, copyPoints[selected]]
      setBest(copyBest)
      console.log(copyBest)

    }
    
  }
   
  return (
    <div>
      <Header text={'Anecdote of the day'} />
      <Content text={anecdotes[selected]} />
      <Votes text={points[selected]} />
      <Button
        handleClick={newAnecdote}
        text='next' />
      <Button
        handleClick={newPoints}
        text='vote anecdote' />
      <Header text={'Anecdote with most votes'} />
      <Votes text={best[1]} />
      <Content text={anecdotes[best[0]]} />
    </div>
  )
}

export default App

