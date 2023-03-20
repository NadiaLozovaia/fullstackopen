import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  
  <button onClick={handleClick}>
    {text}
  </button>
)
const Content = ({text}) => (
  <h1>{text}</h1>
)
const StatisticsLine = ({text, score}) =>{
  return(
  <tr>
  <td>{text} </td> 
  <td>{score}</td>
  </tr>
)
  }
const Statistics = ({good, neutral, bad}) => {

  const total = (good + neutral + bad)
  const avarage = ((good - bad)/total)
  const positive = String(good/(total)*100)+'%' 
  if (total === 0) {
    return (<p>No feedback given</p>)
  }
  return(
    <table>
    <tbody>
      <StatisticsLine text = 'good' score = {good}/> 
      <StatisticsLine text = 'neutral' score = {neutral}/> 
      <StatisticsLine text = 'bad' score = {bad}/>    
      <StatisticsLine text = 'total' score = {total}/>  
      <StatisticsLine text = 'avarage' score = {avarage}/>  
      <StatisticsLine text = 'positive' score =  {positive}/>
    </tbody>
    </table>
  )
}



const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const increaseGood = () => {setGood(good + 1)
    console.log('increasing, value before', good) }

  const increaseNeutral = () => {setNeutral(neutral + 1)
    console.log('increasing, value before', neutral)}
  
  const increaseBad = () => {setBad(bad + 1)
    console.log('increasing, value before', bad)}
  
  
  return (
    <div>
      <Content text = 'give feedback'/>
      <Button
        handleClick={increaseGood}
        text='good'
      />
      <Button
        handleClick={increaseNeutral}
        text='neutral'
      />     
      <Button
        handleClick={increaseBad}
        text='bad'
      /> 
      <Content text = 'statistics'/>  
      
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
      
    </div>
  )
}


export default App