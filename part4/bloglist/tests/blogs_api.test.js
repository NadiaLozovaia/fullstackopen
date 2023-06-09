const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')

const api = supertest(app)


const Blog = require('../models/blog')
const User = require('../models/user')


const helper = require('./test_helper')


describe('get blogs tests', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)

    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

    }, 5000)


    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('the unique identifier property is named id', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })


    test('blogs have id property named id instead of _id', async () => {
        const response = await api.get('/api/blogs')

        const ids = response.body.map((blog) => blog.id)

        for (const id of ids) {
            expect(id).toBeDefined()
        }
    })


})

describe('add blogs correctly', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('123', 10)
        const user = new User({ username: 'us1', passwordHash })

        await user.save()

    })


    test('new blogs are saved correctly', async () => {

        const tokenForAdd = await helper.userToken()
        console.log(tokenForAdd)
        // const user = await helper.usersInDb()

        const newBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 0
        }

        await api
            .post('/api/blogs')
            .set('Authorization', tokenForAdd)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const contents = blogsAtEnd.map(blog => blog.author)
        expect(contents).toContain(
            'Edsger W. Dijkstra'
        )

    })

    test('new blogs, code 401 Unauthorized if a token is not provided', async () => {

        const tokenForAdd = await helper.userToken()
        console.log(tokenForAdd)
        // const user = await helper.usersInDb()

        const newBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
        

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

        const contents = blogsAtEnd.map(blog => blog.author)
        expect(contents).toContain(
            'Edsger W. Dijkstra'
        )
    })

    test('likes property is missing from the request, it will default to the value 0', async () => {
        const tokenForAdd = await helper.userToken()
        const newBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
        }

        await api
            .post('/api/blogs')
            .set('Authorization', tokenForAdd)
            .send(newBlog)
            .expect(201)

        const blogsAtEnd = await helper.blogsInDb()
        const contents = blogsAtEnd[6].likes
        expect(contents).toBe(0)

    })
    test('blog without content is not added, code 400', async () => {
        const tokenForAdd = await helper.userToken()
        const newBlog = {

            author: "Edsger W. Dijkstra",
            likes: 10
        }

        await api
            .post('/api/blogs')
            .set('Authorization', tokenForAdd)
            .send(newBlog)
            .expect(400)

    }
    )

})

describe('deletion of a blog', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('123', 10)
        const user = new User({ username: 'us1', passwordHash })

        await user.save()

    })


    test('succeeds with status code 204 if id is valid', async () => {
        const tokenForAdd = await helper.userToken()

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        const newBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 0
        }

        const result = await api
            .post('/api/blogs')
            .set('Authorization', tokenForAdd)
            .send(newBlog)

        await api

            .delete(`/api/blogs/${result.body.id}`)
            .set('Authorization', tokenForAdd)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        const authtor = blogsAtEnd.map(request => request.author)

        expect(authtor).not.toContain(blogToDelete.authtor)
    })
})

describe('changes of a blog', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    test('succeeds with status code 201 if changed', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToChange = blogsAtStart[0]
        const changedBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12
        }

        await api
            .put(`/api/blogs/${blogToChange.id}`)
            .send(changedBlog)
            .expect(201)

    })
    test('changes just likes', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToChange = blogsAtStart[0]
        const changedBlog = {
            likes: 13
        }

        await api
            .put(`/api/blogs/${blogToChange.id}`)
            .send(changedBlog)
            .expect(201)

        const blogsAtEnd = await helper.blogsInDb()
        const contents = blogsAtEnd[0].likes
        expect(contents).toBe(13)
    })
})


describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root1', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'nadia',
            name: 'Nadia Lozovaia',
            password: 'pupsik',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root1',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('expected `username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    test('creation less 3 symbols password', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root2',
            name: 'Superuser',
            password: 'sa',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Password mast be min 3 symbols')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
    test('creation less 3 symbols user', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ro',
            name: 'Superuser',
            password: 'salt',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})



afterAll(async () => {


    await mongoose.connection.close()
})
