const displayErrorNotification = (message, setNotification) => {
  displayNotification(message, 'error', setNotification)
}

const displayInfoNotification = (message, setNotification) => {
  displayNotification(message, 'info', setNotification)
}

const displayNotification = (message, type, setNotification) => {
  setNotification({
    message: message,
    type: type
  })

  setTimeout(() => {
    setNotification(null)
  }, 5000)
}

export default {
  displayErrorNotification,
  displayInfoNotification
}