
import { useQuery } from '@apollo/client'

import { FAVORITE_BOOKS } from '../queries'



const FavoriteBooks = (props) => {

  const result = useQuery(FAVORITE_BOOKS)
    console.log(result)

  if (result.loading) {
    return <div>loading...</div>
  }
 

  const books = result.data.favoriteBooks || []


  return (
    <div>
      <h2>recomendations</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  )
}

export default FavoriteBooks
