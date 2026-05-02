/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable arrow-parens */
/* eslint-disable no-param-reassign */
const jwt = require('express-jwt');
const get = require('lodash/get');
const { has } = require('lodash');

module.exports = (secret) => (roles = [], credentialsRequired = true) => {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object
    jwt({
      secret,
      algorithms: ['HS256'],
      requestProperty: 'auth',
      credentialsRequired,
    }),

    // authorize based on user role
    (req, res, next) => {
      // console.log('-----*****auth*****-------',req.auth);
      // console.log('-----******roles****-------',roles);
      if (!credentialsRequired) {
        if (has(req, 'auth', '')) {
          if (roles.length && !roles.includes(get(req, 'auth.role', ''))) {
            // user's role is not authorized
            return res.status(401).json();
          }
        }
        return next();
      }
      if (roles.length && !roles.includes(get(req, 'auth.role', ''))) {
        // user's role is not authorized
        return res.status(401).json();
      }

      // authentication and authorization successful
      next();
    },
  ];
};
