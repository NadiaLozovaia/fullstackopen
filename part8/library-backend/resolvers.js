const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const jwt = require('jsonwebtoken')

const resolvers = {
    Query: {
        authorCount: async () => await Author.collection.countDocuments(),

        allAuthors: async (root, args) => {

            const authors = await Author.find({})
            console.log(authors)
            // authors.map(author => {
            //   author.bookCount = Book.collection.countDocuments({ author: author._id })
            // })

            return authors
        },

        bookCount: async () => Book.collection.countDocuments(),
        allBooks: async (root, args) => {
            // console.log(await Book.find({}).populate('author'))

            if (args.author && !args.genres) { return await Book.find({ author: args.author }).populate('author') }

            if (args.genres && !args.author) { return await Book.find({ genres: args.genres }).populate('author') }

            if (args.genres && args.author) { return await Book.find({ author: args.author, genres: args.genres }) }

            return await Book.find({}).populate('author')
        },
        allGenres: async () => {
            const allBooks = await Book.find({})
            const genresOfBooks = allBooks.map((b) => b.genres)
            const genres = genresOfBooks.flat(Infinity)

            const onlyUnique = (value, index, array) => {
                return array.indexOf(value) === index
            }
            const uniqueGenres = genres.filter(onlyUnique)

            return uniqueGenres
        },
        favoriteBooks: async (root, args, context) => {
            const user = context.currentUser
            // console.log(user)
            const userFavoriteGenre = user.favoriteGenre
            const books = await Book.find({ genres: userFavoriteGenre }).populate('author')
            // const books = await Book.find({}).populate('author')
            return books
        },
        findBook: async (root, args) => await Book.findOne({ title: args.titlt }).populate('author'),
        findAuthor: async (root, args) => await Author.findOne({ name: args.name }),
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Book: {
        title: (root) => root.title,
        published: (root) => root.published,
        genres: (root) => root.genres,
        author: (root) => root.author,
        id: (root) => root.id
    },
    Author: {
        name: (root) => root.name,
        born: (root) => root.born,
        id: (root) => root.id,
        bookCount: (root) =>
            root.bookCount

    },
    Mutation: {
        addAuthor: async (root, args, context) => {

            const author = new Author({ ...args })
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }
            try {
                await author.save()
            } catch (error) {
                throw new GraphQLError('Saving user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.name,
                        error
                    }
                })
            }

            return author
        },

        addBook: async (root, args, context) => {

            // console.log(args, 'args')

            let author = await Author.findOne({ name: args.author })

            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }

            if (!author) {
                author = new Author({
                    name: args.author
                })

                try {
                    await author.save()
                    // console.log(author._id)
                }
                catch (error) {
                    throw new GraphQLError('Saving user failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args,
                            error
                        }
                    })
                }
            }
           
            author.bookCount +=1 
            // console.log(author)
            try {
                await author.save()
            } catch (error) {
                throw new GraphQLError('Editing author failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.born,
                        error
                    }
                })
            }
            const book = new Book({ ...args, author: author })
            // console.log(book)
            try {

                await book.save()
            } catch (error) {
                throw new GraphQLError('Saving user failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args,
                        error
                    }
                })
            }
            pubsub.publish('BOOK_ADDED', { bookAdded: book })
            return book
        },

        editAuthor: async (root, args, context) => {
            const author = await Author.findOne({ name: args.name })
            author.born = args.born
            const currentUser = context.currentUser

            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }
            if (!author) {
                return null
            }
            try {
                await author.save()
            } catch (error) {
                throw new GraphQLError('Editing author failed', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        invalidArgs: args.born,
                        error
                    }
                })
            }
            return author
        },
        createUser: async (root, args) => {
            const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

            return user.save()
                .catch(error => {
                    throw new GraphQLError('Creating the user failed', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.name,
                            error
                        }
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new GraphQLError('wrong credentials', {
                    extensions: { code: 'BAD_USER_INPUT' }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id,
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        },

    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
    },

}

module.exports = resolvers