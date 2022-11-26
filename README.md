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
