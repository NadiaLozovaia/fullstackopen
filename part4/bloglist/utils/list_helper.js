
const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sumLikes = 0
    if (blogs.length === 0) {
        sumLikes = 0
    }
    if (blogs.length === 1) {

        sumLikes = blogs[0].likes
    }
    if (blogs.length > 1) {

        const iterator = blogs.values()
        for (const value of iterator) {
            // console.log(value.likes)
            sumLikes = sumLikes + value.likes
        }
    }
    return sumLikes
}

const favoriteBlog = (blogs) => {
    let favorite = {}
    let numberOfLikes = 0
    const iterator = blogs.values()
    for (const value of iterator) {
        if (value.likes > numberOfLikes) {
            numberOfLikes = value.likes
            favorite = value
        }
    }
    delete favorite.url
    delete favorite.__v
    delete favorite._id
    return favorite
}

const mostBlogs = (blogs) => {

    const grouped = _.chain(blogs)

        .groupBy('author')
        .map((value, key) => ({ author: key, blogs: _.size(value) }))
        .maxBy('blogs')
        .value()

    // const result = _.size(grouped)
    console.log(grouped)
    return grouped
}

const mostLikes = (blogs) => {

    const grouped = _.chain(blogs)

        .groupBy('author')
        .map((value, key) => ({ author: key, likes: _.chain(value).sumBy('likes').value() }))
        .maxBy('likes')
        .value()

    // const result = _.size(grouped)
    console.log(grouped)
    return grouped
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}