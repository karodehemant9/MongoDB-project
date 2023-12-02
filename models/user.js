const mongodb = require('mongodb');
const mongoConnect = require('../util/database').mongoConnect;
const getDb = require('../util/database').getDb;

class User {
  constructor(username, email, id) {
    this.username = username;
    this.email = email;
    this._id = id ? new mongodb.ObjectId(this_id) : null;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this) 
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });

  }


  // static fetchAll() {
  //   const db = getDb();
  //   return db.collection('users').find().toArray()  //the find() method returns a cursor instead of a promise
  //     .then(users => {
  //       console.log(users);
  //       return users;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }


  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new mongodb.ObjectId(userId) })
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
      })
  }


  // static deleteById(userId) {
  //   const db = getDb();
  //   return db.collection('users').deleteOne({ _id: new mongodb.ObjectId(userId) })
  //     .then(user => {
  //       console.log(user);
  //       return user;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }
}

module.exports = User;
