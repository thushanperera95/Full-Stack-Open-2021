import React, { useState, useEffect } from 'react'

import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import LoginDetails from './components/LoginDetails'
import BlogCreateForm from './components/BlogCreateForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'
import notificationService from './services/notification'

function App() {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      notificationService.displayErrorNotification(exception.response.data.error, setNotification)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)

    notificationService.displayInfoNotification('you have logged out', setNotification)
  }

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }

      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))

      setTitle('')
      setAuthor('')
      setUrl('')

      notificationService.displayInfoNotification(
        `a new blog ${savedBlog.title} by ${savedBlog.author} added`,
        setNotification
      )
    } catch (exception) {
      notificationService.displayErrorNotification(exception.response.data.error, setNotification)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      {user === null &&
        <LoginForm
          usernameState={{ username, setUsername }}
          passwordState={{ password, setPassword }}
          handleLogin={handleLogin}
        />
      }
      {user !== null &&
        <>
          <LoginDetails
            user={user}
            handleLogout={handleLogout}
          />
          <BlogCreateForm
            titleState={{ title, setTitle }}
            authorState={{ author, setAuthor }}
            urlState={{ url, setUrl }}
            handleCreateNewBlog={handleCreateNewBlog}
          />
          <Blogs
            blogs={blogs}
          />
        </>
      }
    </div>
  )
}

export default App
