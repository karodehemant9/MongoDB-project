const mongodb = require('mongodb');

let _db;

const mongoConnect = (callback) => {
  const MongoClient = mongodb.MongoClient;

  MongoClient.connect('mongodb+srv://hemant:mongopassword@cluster0.f94zpeh.mongodb.net/shop?retryWrites=true&w=majority')
  .then(client => {
    console.log('Connected!');
    _db = client.db();
    callback();
  })
  .catch(err => {
    console.log(err);
    throw err;
  })}


  const getDb = () => {
    if(_db)
    {
      return _db;
    }
    throw 'No DB found';
  }



  exports.mongoConnect = mongoConnect; 
  exports.getDb = getDb;
