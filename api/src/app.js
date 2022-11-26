import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { isWebUri } from 'valid-url'
import { findURL, saveURL } from './model.js'

// App
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const HOST = process.env.HOST || 'http://localhost:8080'

app.get('/', async (req, res) => {
  const shortUrl = req.body.url // should look like http://localhost:8080/L8ORlyFQa
  // Check if the URL is a URL
  if (!isWebUri(shortUrl)) {
    res.status(400).send({ error: 'Invalid URL' })
    return
  }

  const { hostname, pathname, host } = new URL(shortUrl)
  // If the short URL does not have the same host as the API, throw an error
  if (![hostname, host].includes(req.headers.host)) {
    res.status(400).send({ error: 'Invalid host' })
    return
  }

  // decode and redirect url
  const key = pathname.replace('/', '')
  // Fetch Real URL from the DB
  const actualUrl = await findURL(key)
  if (actualUrl) {
    res.send({ url: actualUrl })
  } else {
    res.status(404).send({ error: 'Could not find the URL' })
  }
})

app.post('/', async (req, res) => {
  const longUrl = req.body.url
  if (isWebUri(longUrl)) {
    // save the url in the DB and receive the key
    const key = await saveURL(req.body.url)
    res.send({ url: `${HOST}/${key}` })
  } else {
    res.status(400).send({ error: 'Invalid URL' })
  }
})

app.get('/ping', (req, res) => {
  res.send('pong')
})

export default app
