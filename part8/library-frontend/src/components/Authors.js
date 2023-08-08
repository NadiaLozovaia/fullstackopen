
import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from '../queries'

import AuthorForm from '../components/AuthorForm'


const Authors = ({setError}) => {

  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }

  // if (!props.show) {
  //   return null
  // }

  const authors = result.data.allAuthors || []
  console.log(result, 'authors')
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorForm setError={setError}  authors={result.data.allAuthors}/>
    </div>
    
  )
}

export default Authors
