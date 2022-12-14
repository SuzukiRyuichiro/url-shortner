import shortId from 'shortid'
import { createClient } from 'redis'

const client = createClient({
  url: process.env.REDISCLOUD_URL || 'redis://redis:6379',
})

client.on('connect', () => {
  console.log('Connected')
})

client.on('ready', () => {
  console.log('ready')
})

client.on('error', (err) => {
  console.log('Error', err)
  process.exit(0)
})

await client.connect()

export const findURL = async (key) => {
  const value = await client.get(key)
  return value
}

export const saveURL = async (url) => {
  // Check if the url exists already
  const key = await client.get(url)
  if (key) return key

  // if not, generate key
  const newKey = shortId.generate()
  await client.set(newKey, url)
  await client.set(url, newKey)
  return newKey
}
