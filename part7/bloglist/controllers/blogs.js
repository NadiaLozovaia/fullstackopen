const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const token = request.token;

  const user = request.user;

  try {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);

  } catch (error) {
    response.status(400).json(error)
  }

});
blogsRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const token = request.token;
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      return response.status(403).json({
        error: "you can not delete this blog",
      });
    }
  }
);

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.put("/:id", async (request, response) => {

  const blogOld = await Blog.findById(request.params.id);
  console.log(blogOld);

  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedblog = await Blog.findByIdAndUpdate(request.params.id, blog,
    {
      new: true,
    });

  response.status(201).json(updatedblog);
});

blogsRouter.post("/:id/comments", async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  const body = request.body;

  try {
    const comment = new Comment({
      comment: body.comment,
      blog: blog.id,
    });
    const savedComment = await comment.save();
    blog.comments = blog.comments.concat(savedComment._id);
    await blog.save();
    response.status(201).json(savedComment);
  } catch (error) {
    response.status(400).json(error)
  }

});

blogsRouter.get("/:id/comments", async (request, response) => {

  const blogId = request.params.id
  try {
    const comments = await Comment.find({ blog: blogId })

    response.json(comments)
  } catch (error) {
    response.status(400).json(error)
  }

});


module.exports = blogsRouter;
