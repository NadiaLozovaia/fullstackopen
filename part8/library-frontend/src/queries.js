import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment bookDetails on Book {
      title
      published
      id
      genres
      author {
        name
      } 
        
    }
`



export const ALL_AUTHORS = gql`
query allAuthors{
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
  `
export const ALL_BOOKS = gql`
  query allBooks ($genres: String) {
    allBooks(genres: $genres){
    ...bookDetails
    }
  } 
  ${BOOK_DETAILS}
  `
  export const ALL_GENRES = gql`
  query allGenres {
    allGenres
  }
  `

export const FIND_AUTHOR = gql`
  query findAuthor($name: String!) {
    findAuthor(name: $name) {
      name
      id
      born
      bookCount
    }
  }
  `
export const FIND_BOOK = gql`
  query findBook($title: String!) {
    findBook(title: $title) {
      ...bookDetails
      }
    } 
    ${BOOK_DETAILS}
    `
export const FAVORITE_BOOKS = gql`
  query favoriteBooks {
    favoriteBooks {
      ...bookDetails
      }
    } 
    ${BOOK_DETAILS}
    `

export const ADD_AUTHOR = gql`
  mutation createAuthor ($name: String!, $born: Int, $bookCount: Int) {
    addAuthor(name: $name, born: $born, bookCount: $bookCount) {
      name
      id
      born
      bookCount
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $published: Int, $author: String, $genres: [String]) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      ...bookDetails
      }
    } 
    ${BOOK_DETAILS}
    `
export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int) {
    editAuthor(name: $name, born: $born) {
      name
      id
      bookCount
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...bookDetails
    }
  }
  ${BOOK_DETAILS}
`