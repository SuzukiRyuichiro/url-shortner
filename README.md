# Local setup

- Install docker if not

run

```
docker compose up --build
```

once build is done

```
curl http://localhost:8080/ping
```

-> should return `pong`

# End points

## `POST /` - Get a shortened URL

Give a long URL to get a shortened URL

## Body

```json
{
	"url": "https://www.google.com" // required
}
```

## Response

200

```json
{
	"url": "http://localhost:8080/bMoYt2Nx2"
}
```

400

```json
{
	"error": "Invalid URL"
}
```

## `POST /` - Retrieve original URL

Give one of the shortened URL to see what was the original URL

## Body

```json
{
	"url": "http://localhost:8080/bMoYt2Nx2" // required
}
```

## Responses

200

Found

```json
{
	"url": "https://www.google.com"
}
```

400

URL format is wrong

```json
{
	"error": "Invalid URL"
}
```

404

There is no record of given URL

```json
{
	"error": "Could not find the URL"
}
```

# Reasons of the stack

- I chose redis for database since URL shortener only requires a simple database that doesn't have relations between models. Given it's fastness and scalability, I chose redis.
- I chose Node as the frame work since I knew the logic of the app would be fairly simple, so I wanted to use something that I know I can write and something that does not have much boilerplate code to over complicate the app. Also, I chose Node since the community is large and I knew I would be able to find necessary libraries for the development.
- I used docker so it'd be simpler to test the API on other machines as well.
