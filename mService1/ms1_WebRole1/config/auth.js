// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1464374773592610', // your App ID
        'clientSecret'  : 'fe27572f72fcc7a2d665b90e51986360', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
        'profileFields' : ['id', 'email', 'gender']
    },

    'twitterAuth' : {
        'consumerKey'       : 'XmpWlTTFzimjdsC1fdS8mIkKq',
        'consumerSecret'    : 'phzqVW8v8q925eG5XBtYTHEDd3wol6D3WFs21STEmrueXRERD7',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '959378227277-ke16hmbng7t5j1slr247bq847b0ljhu6.apps.googleusercontent.com',
        'clientSecret'  : 'dU8FknAM3uHoA_1GdOsiprB7',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};

