import { GET_REPO_DETAILS_SECCUESS, GET_USER_DETAILS_SECCUESS } from './action-types';

const apiReq = (query, variables) => (
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "http://localhost:4000/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
      resolve(xhr.response);
    }
    xhr.send(JSON.stringify({
      query,
      variables
    }));
  })
);

export const getUserDetails = username => dispatch => {
  apiReq(`query GetUserDetails($username: String) {
    getUserDetails(username: $username)
  }`, { username }).then(({ data: { getUserDetails } }) => {
    dispatch({
      type: GET_USER_DETAILS_SECCUESS,
      payload: JSON.parse(getUserDetails)
    });
  });
};

export const getRepoDetails = (username, reponame) => dispatch => {
  apiReq(`query GetRepoDetails($username: String, $reponame: String) {
    getRepoDetails(username: $username, reponame: $reponame)
  }`, { username, reponame }).then(({ data: { getRepoDetails } }) => {
    dispatch({
      type: GET_REPO_DETAILS_SECCUESS,
      payload: JSON.parse(getRepoDetails)
    });
  });
};

export const updateRepoInfo = (username, reponame, description, website) => dispatch => {
  apiReq(`query UpdateRepoInfo($username: String, $reponame: String, $description: String, $website: String) {
    updateRepoInfo(username: $username, reponame: $reponame, description: $description, website: $website)
  }`, { username, reponame, description, website }).then(({ data: { updateRepoInfo } }) => {
    dispatch({
      type: GET_REPO_DETAILS_SECCUESS,
      payload: JSON.parse(updateRepoInfo)
    });
  });
};

export const starRepo = (username, reponame) => dispatch => {
  apiReq(`query StarRepo($username: String, $reponame: String) {
    starRepo(username: $username, reponame: $reponame)
  }`, { username, reponame }).then(({ data: { starRepo } }) => {
    dispatch({
      type: GET_REPO_DETAILS_SECCUESS,
      payload: JSON.parse(starRepo)
    });
  });
};

export const watchRepo = (username, reponame) => dispatch => {
  apiReq(`query WatchRepo($username: String, $reponame: String) {
    watchRepo(username: $username, reponame: $reponame)
  }`, { username, reponame }).then(({ data: { watchRepo } }) => {
    dispatch({
      type: GET_REPO_DETAILS_SECCUESS,
      payload: JSON.parse(watchRepo)
    });
  });
};
