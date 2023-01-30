//create user account
function create(firstname, lastname, email, password, address, zip, balance) {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    const doc = {
      firstname,
      lastname,
      email,
      password,
      address,
      zip,
      balance,
    };
    collection.insertOne(doc, { w: 1 }, function (err, result) {
      err ? reject(err) : resolve(doc);
    });
  });
}

// function deposit(user, amount, balance, depositreciever) {
//   return new Promise((res, reject) => {
//     const collection = db.collection("users");
//     const queryObj = {
//       depositreciever: depositreciever,
//     };
//   });
// }

function deposit(email, newbalance) {
  return new Promise((res, reject) => {
    const customer = db.collection("users");
    const queryValue = {
      email: email,
    };
    const update = {
      $set: { balance: newbalance },
    };
    customer.updateOne(queryValue, update, function (err, result) {
      err ? reject(err) : res(result);
    });
  });
}

function withdraw(email, newbalance) {
  return new Promise((res, reject) => {
    const customer = db.collection("users");
    const queryValue = {
      email: email,
    };
    const update = {
      $set: { balance: newbalance },
    };
    customer.updateOne(queryValue, update, function (err, result) {
      err ? reject(err) : res(result);
    });
  });
}

//query email and password
function querydb(email, password) {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    //values to query
    const queryObj = {
      email: email,
      password: password,
    };
    //Options and Projections
    const options = {
      projection: { firstname: 0 },
    };
    collection.find(queryObj).toArray(function (err, result) {
      if (err) throw err;
      else resolve(result);
    });
  });
}

//Update User
function updateuser({ props }) {
  return new Promise((resolve, reject) => {
    const customer = db.collection("users");
    //value to query
    const queryValue = {
      firstname: "carlos",
    };
    //get values to change from UI
    var newValues = { $set: { firstname: "pedro", lastName: "Juan" } };
    customer.updateOne(queryValue, newValues, function (err, result) {
      err ? reject(err) : resolve(result);
    });
  });
}

//Delete User
function deleteuser() {
  return new Promise((resolve, reject) => {
    const customer = db.collection("users");
    const queryValue = { address: "1311 Lawrence Ave" };
    const queryDelete = {};
    customer.deleteOne(queryValue, function (err, result) {
      err ? reject(err) : resolve(result);
      console.log("1 document deleted success");
    });
  });
}

//all users
function all() {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({})
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
      });
  });
}

//export so we can use in express
module.exports = {
  create,
  all,
  querydb,
  updateuser,
  deleteuser,
  deposit,
  withdraw,
};
