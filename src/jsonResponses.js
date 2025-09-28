// Note this object is purely in memory
// When node shuts down this will be cleared.
// Same when your heroku app shuts down from inactivity
// We will be working with databases in the next few weeks.
const users = {};

// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  const content = JSON.stringify(object);

  // Headers contain our metadata. HEAD requests only get
  // this information back, so that the user can see what
  // a GET request to a given endpoint would return. Here
  // they would see what format of data (JSON) and how big
  // that data would be ('Content-Length')
  const headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  };

  // send response with json object
  response.writeHead(status, headers);

  // HEAD requests don't get a body back, just the metadata.
  // So if the user made one, we don't want to write the body.
  if (request.method !== 'HEAD') {
    response.write(content);
  }

  response.end();
};

// get user object
// should calculate a 200
const getUsers = (request, response) => {
  // json object to send
  const responseJSON = {
    users
  };

  // return 200 with message
  return respondJSON(request, response, 200, responseJSON);
};

// // function just to update our object
// const updateUser = (request, response) => {
//   // change to make to user
//   // This is just a dummy object for example
//   const newUser = {
//     createdAt: Date.now(),
//   };

//   // modifying our dummy object
//   // just indexing by time for now
//   users[newUser.createdAt] = newUser;

//   // return a 201 created status
//   return respondJSON(request, response, 201, newUser);
// };


// Add user!
const addUser = (request, response, name, age) => {
  const newUser = {
    name: name,
    age: age,
  }
  users[Date.now()] = newUser;

  let responseJSON = {
    message: 'Created successfully'
  };

  // 204 -- Does this user exist? Check for a name match
  // for (const u in users) {
  //   if (u.name === newUser.name) {
  //     users.u.age = newUser.age;

  // No response body in a 204
  // responseJSON = {};
  //     return respondJSON(request, response, 204)
  //   }
  // }

  // 400 -- User is missing name or age
  if (name == null || age == null) {

    responseJSON = {
      message: 'Name and age are both required.'
    };
    return respondJSON(request, response, 400, responseJSON)
  }

  // 201 -- User is new
  return respondJSON(request, response, 201, responseJSON)

  // Shouldnt be making a user
}

// function for 404 not found requests with message
const notFound = (request, response) => {
  // create error message for response
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // return a 404 with an error message
  respondJSON(request, response, 404, responseJSON);
};

// set public modules
module.exports = {
  addUser,
  getUsers,
  notFound,
};
