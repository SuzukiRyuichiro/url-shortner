import app from './app.js'
// Constants
const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || '0.0.0.0'

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`)
})
