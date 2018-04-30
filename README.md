# Github-mirror

This is a prototype of Github profile and repository screens which contains following features:
- Displays navbar which has:
  - Website icon - navigates user to original Github website
  - Search input box - under development
  - Buttons: "Pull requests", "Issue", "Marketplace" and "Explore" - under development
  - Account settings navigator - under development
- Displays profile picture placeholder, username and joining info under profile info
- Displays "Add photo" and "Edit profile" buttons which are currently under development
- Displays sub-navigation as: Overview, Repositories, Stars, Followers, Following
  - Overview: Holds repositories in banner
  - Repositories: Holds repository name, description, last update info and technology for each of the repository user has
  - Stars, Followers, Followings: These tabs currently hold only the number of Stars and Followers the user has and the number of people the user follows (Following). The content is currently under development
- Clicking on repository either from Overview or Repositories navigates user to Repository detail screen
- Repository detail screen has following features:
  - Displays username and repository name - clicking username will navigate user to profile screen
  - User can watch/unwatch, star/unstar the repository
  - User can add/edit the description and website

<img src="https://media.giphy.com/media/9Y3KnYujYskaGM4TC0/giphy.gif"></img>

Please follow below steps to run this project on your machine
1. Clone this project using https://github.com/rushikeshbharad/Github-mirror.git
2. Make sure you have npm setup on your machine
3. Enter into the project repository `cd Github-mirror`
4. Install packages for the project `npm install`
5. Open two different terminals: a. For hosting the local server b. For hosting the website
   - Run `node src/server/server.js` on one terminal
   - Run `npm start` on another terminal
6. Open browser and paste `localhost:3000`

Stacks involved in this project (dependencies):
- Primary:
  - React: for creating components
  - Redux: for maitaining the local data fetched from services
  - GraphQL: for backend (exposing the database to UI)
- Supplementary:
  - React-router: for navigating user form one screen to another
  - React-modal2: for displaying dialogs
  - Classnames: for binding css (makes easier to send styles to react child components)
  - momentjs: for working on timestamps and formatting the times before being displayed
  - react-redux: for connecting redux state to react components

Primary TODOs for existing implementation:
- Mobile specific css
- Move all hardcoded strings to i18n string.json
