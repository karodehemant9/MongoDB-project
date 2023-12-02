const mongodb = require('mongodb');

const mongoConnect = require('../util/database').mongoConnect; 
const getDb = require('../util/database').getDb; 

class Product {
  constructor(title, price, description, imageUrl, id, userId)
  {
      this.title = title;
      this.price = price;
      this.description = description;
      this.imageUrl = imageUrl;
      this._id = id ? new mongodb.ObjectId(this_id) : null;
      this.userId = userId;
  }

  save()
  {
    const db = getDb();
    let dbOp;
    if(this._id) {
      //update the product
      dbOp =  db.collection('products').updateOne({_id: this_id}, {$set: this});
    }
    else
    {
      //insert new product
     dbOp =  db.collection('products').insertOne(this);
    }

    return dbOp
    .then(result => {
      console.log(result);
     })
     .catch(err => {
      console.log(err);
     });
     
  }


  static fetchAll() {
    const db = getDb();
    return db.collection('products').find().toArray()  //the find() method returns a cursor instead of a promise
    .then(products => {
      console.log(products);
      return products;
    })
    .catch(err => {
      console.log(err);
    })
  }


  static findById(productId) {
    const db = getDb();
    return db.collection('products').find({_id: new mongodb.ObjectId(productId)}).next()
    .then(product => {
      console.log(product);
      return product;
    })
    .catch(err => {
      console.log(err);
    })
  }


  static deleteById(productId) {
    const db = getDb();
    return db.collection('products').deleteOne({_id: new mongodb.ObjectId(productId)})
    .then(product => {
      console.log(product);
      return product;
    })
    .catch(err => {
      console.log(err);
    })
  }
}

module.exports = Product;
