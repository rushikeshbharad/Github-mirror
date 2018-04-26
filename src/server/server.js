var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors')
var fs = require("fs");

var rawdata = fs.readFileSync('src/server/db.json');
var db = JSON.parse(rawdata);
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    getUserDetails(username: String): String,
    getRepoDetails(username: String, reponame: String): String,
    updateRepoInfo(username: String, reponame: String, description: String, website: String): String,
    starRepo(username: String, reponame: String): String,
    watchRepo(username: String, reponame: String): String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  getUserDetails: function({ username }) {
    return JSON.stringify(db[username]);
  },
  getRepoDetails: function({ username, reponame }) {
    return JSON.stringify(db[username]['repositories'].find(repo => repo.name === reponame));
  },
  updateRepoInfo: function({ username, reponame, description, website }) {
    var repoIndex;
    db[username]['repositories'].forEach((repo, index) => {
      if (repo.name === reponame) {
        repoIndex = index;
      }
    })
    db[username]['repositories'][repoIndex]['description'] = description;
    db[username]['repositories'][repoIndex]['website'] = website;
    fs.writeFileSync('src/server/db.json', JSON.stringify(db));
    return JSON.stringify(db[username]['repositories'][repoIndex]);
  },
  starRepo: function({ username, reponame }) {
    var repoIndex, starIndex;
    db[username]['repositories'].forEach((repo, index) => {
      if (repo.name === reponame) {
        repoIndex = index;
      }
    });
    db[username]['repositories'][repoIndex]['starredBy'].forEach((name, index) => {
      if (name === username) {
        starIndex = index;
      }
    });
    if (starIndex !== undefined) {
      db[username]['repositories'][repoIndex]['starredBy'].splice(starIndex, 1);
      db[username]['stars'][reponame] -= 1;
    } else {
      db[username]['repositories'][repoIndex]['starredBy'].push(username);
      db[username]['stars'][reponame] += 1;
    }
    fs.writeFileSync('src/server/db.json', JSON.stringify(db));
    return JSON.stringify(db[username]['repositories'][repoIndex]);
  },
  watchRepo: function({ username, reponame }) {
    var repoIndex, watchIndex;
    db[username]['repositories'].forEach((repo, index) => {
      if (repo.name === reponame) {
        repoIndex = index;
      }
    });
    db[username]['repositories'][repoIndex]['watchedBy'].forEach((name, index) => {
      if (name === username) {
        watchIndex = index;
      }
    });
    if (watchIndex !== undefined) {
      db[username]['repositories'][repoIndex]['watchedBy'].splice(watchIndex, 1);
    } else {
      db[username]['repositories'][repoIndex]['watchedBy'].push(username);
    }
    fs.writeFileSync('src/server/db.json', JSON.stringify(db));
    return JSON.stringify(db[username]['repositories'][repoIndex]);
  }
};

var app = express();

app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
