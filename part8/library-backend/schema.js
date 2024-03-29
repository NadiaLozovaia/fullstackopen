const typeDefs = `
 
type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }
  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
    findAuthor(name: String!): Author
  }
  type Book {
      title: String!
      published: Int
      author: Author
      id: ID!
      genres: [String]
    }
    type User {
      username: String!
      favoriteGenre: String!
      id: ID!
    }
    
    type Token {
      value: String!
    }
  type Query {
    me: User
    allBooks(author: String, genres:String): [Book!]!
    findBook(title: String!): Book
    bookCount: Int!
    allGenres: [String]
    favoriteBooks:[Book!]
  }


  type Mutation {
      addBook(
        title: String!
        author: String
        published: Int
        genres: [String]
      ): Book!

    addAuthor(
      name: String!
      born: Int
      bookCount: Int
    ): Author
    
    editAuthor(
      name: String!
      born: Int
    ): Author

    createUser(
      username: String!
      favoriteGenre: String
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

module.exports = typeDefs