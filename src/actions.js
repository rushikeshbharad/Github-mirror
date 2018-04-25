const getUserFromServer = username => (
  new Promise((resolve, reject) => {
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
  })
);

const getReponameFromServer = (username, reponame) => (
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "http://localhost:4000/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
      resolve(xhr.response);
    }
    const query = `query GetRepoDetails($username: String, $reponame: String) {
      getRepoDetails(username: $username, reponame: $reponame)
    }`;
    xhr.send(JSON.stringify({
      query,
      variables: { username, reponame }
    }));
  })
);

const updateRepoInfoToServer = (username, reponame, description, website) => (
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "http://localhost:4000/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
      resolve(xhr.response);
    }
    const query = `query UpdateRepoInfo($username: String, $reponame: String, $description: String, $website: String) {
      updateRepoInfo(username: $username, reponame: $reponame, description: $description, website: $website)
    }`;
    xhr.send(JSON.stringify({
      query,
      variables: { username, reponame, description, website }
    }));
  })
)

export const getUserDetails = username => dispatch => {
  getUserFromServer(username).then(({ data: { getUserDetails } }) => {
    dispatch({
      type: 'getUserDetailsSuccess',
      payload: JSON.parse(getUserDetails)
    });
  });
};

export const getRepoDetails = (username, reponame) => dispatch => {
  getReponameFromServer(username, reponame).then(({ data: { getRepoDetails } }) => {
    dispatch({
      type: 'getRepoDetailsSuccess',
      payload: JSON.parse(getRepoDetails)
    });
  });
}

export const updateRepoInfo = (username, reponame, description, website) => dispatch => {
  updateRepoInfoToServer(username, reponame, description, website).then(({ data: { updateRepoInfo } }) => {
    debugger;
    dispatch({
      type: 'getRepoDetailsSuccess',
      payload: JSON.parse(updateRepoInfo)
    });
  });
}
