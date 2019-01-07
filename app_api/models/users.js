var mongoose = require( 'mongoose' );
//var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
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
        required: true
    }
});

mongoose.model('Users', userSchema, 'wscUsers');

  /* Initial data entry
  db.wscUsers.save({
      name: 'Admin',
      email: 'administrator1@admin.org',
      username: 'Admin',
      password: 'Admin123'
  })
  */