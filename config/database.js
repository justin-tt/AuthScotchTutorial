// config/database.js
module.exports = {

    'url' : 'mongodb://' + process.env.MONGOLAB_USER + ':' + process.env.MONGOLAB_PASSWORD + '@ds023485.mlab.com:23485/webdev' // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot

};