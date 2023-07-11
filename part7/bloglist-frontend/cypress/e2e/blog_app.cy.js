describe('Blog app', function () {


    beforeEach(function () {
        cy.visit('http://localhost:3000')
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'User3',
            username: 'us3',
            password: '123'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
    })
    describe('Login', function () {
        it('Login form is shown', function () {
            cy.contains('Login')
            cy.contains('username')
            cy.contains('password')
            cy.contains('login')
        })


        it('succeeds with correct credentials', function () {
            cy.get('#username').type('us3')
            cy.get('#password').type('123')
            cy.get('#login-button').click()
            cy.contains('User3 logged in')
        })
        it('fails with wrong credentials', function () {

            cy.get('#username').type('us3')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('.error').should('contain', 'Wrong credentials')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('.error').should('have.css', 'border-style', 'solid')
        })
    })
    describe('when logged in', function () {
        beforeEach(function () {
            cy.get('#username').type('us3')
            cy.get('#password').type('123')
            cy.get('#login-button').click()

        })

        it('a new blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#Title').type('a blog created by cypress')
            cy.get('#Author').type('a blog created by cypress')
            cy.get('#URL').type('a blog created by cypress')
            cy.get('#create-button').click()
            cy.contains('a blog created by cypress')
        })
        describe('when blog added', function () {
            beforeEach(function () {
                cy.contains('new blog').click()
                cy.get('#Title').type('a blog created by cypress')
                cy.get('#Author').type('a blog created by cypress')
                cy.get('#URL').type('a blog created by cypress')
                cy.get('#create-button').click()
            })
            it('confirms users can like a blog', function () {

                cy.contains('view').click()
                cy.contains('Like').click()
                cy.get('#likes').contains('1')
            })
            it('confirms users can like a blog', function () {

                cy.contains('view').click()
                cy.contains('Remove').click()
                cy.get('.info').should('contain', 'You deleted')


            })
            it('only creater can see Remove button', function () {

                const user = {
                    name: 'User4',
                    username: 'us4',
                    password: '123'
                }
                cy.request('POST', 'http://localhost:3003/api/users/', user)

                cy.contains('view').click()
                cy.contains('Remove')

                cy.contains('logout').click()
                cy.get('#username').type('us4')
                cy.get('#password').type('123')
                cy.get('#login-button').click()
                cy.contains('User4 logged in')
                cy.contains('view').click()
                    .should('not.contain', 'Remove')

            })


            it('blogs are ordered according to likes', function () {
                cy.contains('new blog').click()
                cy.get('#Title').type('a blog created by cypress 1')
                cy.get('#Author').type('a blog created by cypress 1')
                cy.get('#URL').type('a blog created by cypress 1')
                cy.get('#create-button').click()
                cy.contains('view').click()
                cy.contains('view').click()
                cy.get('.blog').eq(0).should('contain', 'a blog created by cypress')
                cy.get('.blog').eq(1).should('contain', 'a blog created by cypress 1')
                    .contains('Like').click()
                cy.get('.blog').eq(0).should('contain', 'a blog created by cypress 1')
                cy.get('.blog').eq(1).should('contain', 'a blog created by cypress')



            })




        })
    })
})

