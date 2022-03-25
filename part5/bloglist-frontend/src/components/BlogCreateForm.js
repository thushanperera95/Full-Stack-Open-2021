import React from 'react'

const BlogCreateForm = ({ titleState, authorState, urlState, handleCreateNewBlog }) => (
  <div>
    <h2>create new</h2>
    <form onSubmit={handleCreateNewBlog}>
      <div>
        title:
        <input
          type="text"
          value={titleState.title}
          name="title"
          onChange={({ target }) => titleState.setTitle(target.value)}
          required
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={authorState.author}
          name="author"
          onChange={({ target }) => authorState.setAuthor(target.value)}
          required
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={urlState.url}
          name="author"
          onChange={({ target }) => urlState.setUrl(target.value)}
          required
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
)

export default BlogCreateForm