export const getUserDetails = username => ({
  type: 'success',
  payload: {
    profileImage: "",
    joinedAt: 1524251493000,
    starts: [
      {
        "ToDo1": 3,
        "My project": 2
      }
    ],
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
});
