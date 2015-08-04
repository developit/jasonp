jasonp
======

A tiny module that provides a logical interface for making JSONP requests.

> _This is supposed to be funny because my name is Jason._


Usage
-----

##### `jasonp(url, callback) -> (err, ...data)`

Make a JSONP request.

* The callback is node-style (works nicely with [praline]).
* Include a `{{callback}}` placeholder in the URL to replace it with the callback ID.
* Requests time out after 10 seconds with `err='Timed out'`


Example
-------

```js
import get from 'jasonp';
let url = 'http://foo.com/test.json';
get(`${url}?callback={{callback}}`, (err, ...data) => {
	if (err) return console.error(err);
	console.log(...data);
});
```


License
-------

MIT

[praline]: (https://github.com/developit/praline)
