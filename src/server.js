var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var cors = require('cors')

var db = {
  rushikeshbharad: {
    profileImage: "",
    joinedAt: 1524251493000,
    stars: {
      "ToDo1": 3,
      "My project": 2
    },
    followers: [
      "Bill",
      "Jim"
    ],
    following: [
      "Charlotte"
    ],
    repositories: [
      {
        name: "ToDo1",
        description: "This is my ToDo app",
        website: "https://google.co.in",
        createdAt: 1524251493000,
        updatedAt: 1524251493000,
        technology: "Javascript",
        watchedBy: [
          "Jim",
          "Rushikesh",
          "Bill"
        ],
        directoryStructure: {
          ".git": {
            "hook": {},
            "info": {},
            "logs": {}
          },
          "node_modules": {
          ".bin": {},
          ".cache": {}
          },
          "public": {
          "images": {},
          "i18n": {}
          },
          "src": {
            "containers": {},
            "components": {}
            },
          ".gitingnore": "Text Document",
          "package.json": "JSON",
          "package-lock.json": "JSON",
          "README.md": "MD"
        }
      },
      {
        name: "My project",
        createdAt: 1524251493000,
        updatedAt: 1524251493000,
        technology: "Javascript",
        watchedBy: [
          "Rushikesh",
          "Charlotte"
        ],
        directoryStructure: {
          ".git": {
            "hook": {},
            "info": {},
            "logs": {}
          },
          "node_modules": {
            ".bin": {},
            ".cache": {}
          },
          "public": {
          "images": {},
          "i18n": {}
          },
          "src": {
          "containers": {},
          "components": {}
          },
          ".gitingnore": "Text Document",
          "package.json": "JSON",
          "package-lock.json": "JSON",
          "README.md": "MD"
        }
      }
    ]
  }
};

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    getUserDetails(username: String): String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  getUserDetails: function({ username }) {
    return JSON.stringify(db[username]);
  },
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