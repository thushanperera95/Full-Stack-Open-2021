import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = filterText.length == 0
    ? []
    : countries
      .filter(country => country.name.common.toLowerCase().includes(filterText.toLowerCase()))
      .sort((a, b) => a.name.common.localeCompare(b.name.common))

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  return (
    <div>
      <Filter filterText={filterText} onFilterChange={handleFilterChange} />
      <Countries countries={countriesToShow} />
    </div>
  )
}

export default App