'use strict';

var iltorb = require('iltorb');

module.exports = {
  onResponse: function(ctx, callback) {
    if (ctx.serverToProxyResponse.headers['content-encoding']
        && ctx.serverToProxyResponse.headers['content-encoding'].toLowerCase() === 'br') {
      delete ctx.serverToProxyResponse.headers['content-encoding'];
      ctx.addResponseFilter(iltorb.decompressStream());
    }
    return callback();
  }
};
