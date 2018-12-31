var mongoose = require( 'mongoose' );
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true
    }
});

mongoose.model('User', userSchema, 'wscUsers');

  /* Initial data entry
  db.wscUsers.save({
      name: 'Admin',
      email: 'administrator1@admin.org',
      username: 'Admin',
      password: 'Admin123'
  })
  */