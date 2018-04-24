function getUserFromServer(username) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "http://localhost:4000/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
      resolve(xhr.response);
    }
    const query = `query GetUserDetails($username: String) {
      getUserDetails(username: $username)
    }`;
    xhr.send(JSON.stringify({
      query,
      variables: { username }
    }));
  });
}

export const getUserDetails = username => dispatch => {
  const payload = getUserFromServer(username).then(({ data: { getUserDetails } }) => {
    dispatch({
      type: 'getUserDetailsSuccess',
      payload: JSON.parse(getUserDetails)
    });
  }); 
};

export const getRepoDetails = (username, reponame) => {
  if (reponame === 'ToDo1') {
    return {
      type: 'success',
      api: 'repoinfo',
      payload: {
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
    };
  }

  if (reponame === 'My project') {
    return {
      type: 'success',
      api: 'repoinfo',
      payload: {
        name: "My project",
        createdAt: 1524251493000,
        updatedAt: 1524251493000,
        technology: "Javascript",
        watchedBy: [
          "Rushikesh",
          "Charlotte"
        ],
        directoryStructure: {
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
    };
  }
}
