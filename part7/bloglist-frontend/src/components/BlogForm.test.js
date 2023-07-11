import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'


test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const addBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm
        createBlog={addBlog} />)

    const input = screen.getAllByRole('textbox')

    const sendButton = screen.getByText('create')

    await user.type(input[0], 'testing a form...')
    await user.type(input[1], 'testing a form...')
    await user.type(input[2], 'testing a form...')

    await user.click(sendButton)

    console.log(addBlog.mock.calls[0][0])
    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('testing a form...')
    expect(addBlog.mock.calls[0][0].author).toBe('testing a form...')
    expect(addBlog.mock.calls[0][0].url).toBe('testing a form...')
})