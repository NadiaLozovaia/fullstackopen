import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blogs'

describe('<Blog>', () => {

    const blog = {
        title: 'Title',
        author: 'Author',
        url: 'Url',
        likes: 0,
        user: {
            username: 'Nadia',
            name: 'us239'
        }
    }
    let container
    const mockHandler = jest.fn()

    beforeEach(() => {
        container = render(
            <Blog key={blog.id} blog={blog} likedBlog={mockHandler} />
        ).container
    })

    test('renders content', () => {

        const element = screen.getByText('Url')
        expect(element).toBeDefined()

    })

    test('clicking the button calls event handler once', async () => {

        const user = userEvent.setup()
        const button = screen.getByText('Like')
        await user.click(button)

        expect(mockHandler.mock.calls).toHaveLength(1)
    })

    test('title and author, but does not render its URL or number of likes by default', () => {
        const div = container.querySelector('.blogInfo')
        expect(div).toHaveStyle('display: none')

        const element = screen.getByText(blog.title)
        expect(element).toBeDefined()

    })

    test('theURL and number of likes are shown when the button controlling the shown details has been clicked', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const div = container.querySelector('.blogInfo')
        expect(div).not.toHaveStyle('display: none')
    })

    test('the like button is clicked twice, the event handler the component received as props is called twice', async () => {

        const user = userEvent.setup()
        const button = screen.getByText('Like')
        await user.click(button)
        await user.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })

})
