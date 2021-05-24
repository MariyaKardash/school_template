/* Function for rendering main elements */
const renderMain = () => {
  const divMain = document.createElement('div')

  const inputCity = document.createElement('input')
  const inputCountry = document.createElement('input')
  const buttonSubmit = document.createElement('button')
  const divWeather = document.createElement('div')

  divMain.id = 'mainContainer'
  divMain.classList.add('main-container')

  divWeather.id = 'weatherContainer'
  divWeather.classList.add('weather-container')

  inputCity.placeholder = 'Enter your city...'
  inputCountry.placeholder = 'Enter your country...'
  buttonSubmit.innerText = 'Submit'

  inputCity.id = 'inputCity'
  inputCountry.id = 'inputCountry'
  buttonSubmit.id = 'submit'

  document.getElementById('container').appendChild(divMain)

  document.getElementById('mainContainer').appendChild(inputCity)
  document.getElementById('mainContainer').appendChild(inputCountry)
  document.getElementById('mainContainer').appendChild(buttonSubmit)

  document.getElementById('container').appendChild(divWeather)
}

/* Function for rendering weather div */
const renderWeather = (data) => {
  const location = document.createElement('p')
  const temperature = document.createElement('p')
  const time = document.createElement('p')
  const wind = document.createElement('p')
  const feelsLike = document.createElement('p')
  const speed = document.createElement('p')
  const description = document.createElement('p')

  location.classList.add('location')
  temperature.classList.add('temperature')

  temperature.innerText = `${data.current.temperature} ℃`
  location.innerText = data.request.query
  time.innerText = `Time: ${data.current.observation_time}`
  wind.innerText = `Wind: ${data.current.wind_dir}`
  feelsLike.innerText = `Feels like: ${data.current.feelslike}`
  speed.innerText = `Speed: ${data.current.wind_speed}`
  description.innerText = data.current.weather_descriptions

  document.getElementById('weatherContainer').appendChild(temperature)
  document.getElementById('weatherContainer').appendChild(location)
  document.getElementById('weatherContainer').appendChild(time)
  document.getElementById('weatherContainer').appendChild(wind)
  document.getElementById('weatherContainer').appendChild(feelsLike)
  document.getElementById('weatherContainer').appendChild(speed)
  document.getElementById('weatherContainer').appendChild(description)
}

function cleanWeather() {
  document.getElementById('weatherContainer').innerHTML = ''
}

/* Function for checking request status */
function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res
  }
  const error = new Error(res.statusText)
  error.res = res
  throw error
}

/* Function for parse JSON */
function parseJSON(res) {
  return res.json()
}

renderMain()

/* Function to create a request */
const request = (city, country) => {
  fetch(`http://api.weatherstack.com/current?access_key=fcb9758d342fc84687212148795b57b3&query=${city}, ${country}`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      cleanWeather()
      renderWeather(data)
    })
    .catch((error) => {
      console.log('request failed', error)
    })
}

/* Adding events */
document.getElementById('submit').addEventListener('click', async () => {
  const city = document.getElementById('inputCity').value
  const country = document.getElementById('inputCountry').value
  await request(city, country)
})

const pressEnter = async (event) => {
  if (event.key === 'Enter') {
    const city = document.getElementById('inputCity').value
    const country = document.getElementById('inputCountry').value
    await request(city, country)
  }
}

document.getElementById('inputCity').addEventListener('keypress', (e) => {
  pressEnter(e)
})

document.getElementById('inputCountry').addEventListener('keypress', (e) => {
  pressEnter(e)
})
