const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')


const api = supertest(app)
const Blog = require('../models/blog')

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

    }, 100000)


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
    // beforeEach(async () => {
    //     await Blog.deleteMany({})
    // })
    test('new blogs are saved correctly', async () => {
        const newBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 0
        }

        await api
            .post('/api/blogs')
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



    test('likes property is missing from the request, it will default to the value 0', async () => {
        const newBlog = {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)

        const blogsAtEnd = await helper.blogsInDb()
        const contents = blogsAtEnd[6].likes
        expect(contents).toBe(0)

    })
    test('blog without content is not added, code 400', async () => {
        const newBlog = {

            author: "Edsger W. Dijkstra",
            likes: 10
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

    }
    )

})

describe('deletion of a blog', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

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

afterAll(async () => {
    await mongoose.connection.close()
})
