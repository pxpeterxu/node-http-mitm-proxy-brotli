HTTP MITM Proxy Brotli middleware
=================================

`http-mitm-proxy-brotli` is a middleware that helps decode Brotli requests when
working with the wonderful [`node-http-mitm-proxy`](https://github.com/joeferner/node-http-mitm-proxy)
package.

Install
-------
`npm install --save http-mitm-proxy-brotli`

Usage
-----
Simply include it in your `onRequest` handlers, similar to the built-in
`Proxy.gunzip` response filter.

```js
var Proxy = require('http-mitm-proxy');
var brotliMiddleware = require('http-mitm-proxy-brotli');
var proxy = Proxy();

proxy.onError(function(ctx, err) {
  console.error('proxy error:', err);
});

proxy.onRequest(function(ctx, callback) {
  if (ctx.clientToProxyRequest.headers.host == 'www.google.com' &&
      ctx.clientToProxyRequest.url.indexOf('/search') == 0) {
    ctx.use(Proxy.gunzip);
    ctx.use(brotliMiddleware);

    // Additional code goes here
  }
  return callback();
});

proxy.listen({port: 8081});
```
