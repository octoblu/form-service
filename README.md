# form-service
Generic Form Service using JSON Schema

This service lets you pass a schema url and a post url as query parameters to a page that generates a form that on submit posts to that url. Its great for building forms that can post to a trigger in Octoblu!

## Example

### URL
```
 https://form-service.octoblu.com/
```

### Parameters
- schemaUrl ( this is a url to a hosted schema json )
- postUrl ( the url to post to )
- formSchemaUrl OPTIONAL ( a url to hosted form schema file )
- bearerToken OPTIONAL ( a meshblu token that can be passed along )

### Example call

```
https://form-service.octoblu.com/?schemaUrl=&postUrl=
```

https://form-service.octoblu.com/?schemaUrl=https://gist.githubusercontent.com/sqrtofsaturn/88bba93d271a3c97591880119b16ca63/raw/9373e1ab09e6d7f70e3c05eb1f67c784afc5d6cc/sonos.json&postUrl=https://triggers.octoblu.com/flows/3494aa3d-08c6-46d3-80c8-bb640de992a2/triggers/5860b0d0-3418-11e6-a298-19a48a9ab8ed

### JSON Example

We've found it easiest to host your json in a gist on github and link to the raw.

You can learn more about creating schema from schemaform.io !

```
{
  "type": "object",
  "title": "Octoblu Sonos - Play a Song",
  "properties": {
    "url": {
      "title": "MP3 URL",
      "type": "string"
    }
  }
}
```
