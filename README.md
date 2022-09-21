# WEATHER FOR REAL

This app intends to provide users with weather data as well as a social feed of what the weather is really like in their area.

This project was inspired by conversations with friends and family about the weather forecast and what the weather was really like. For example, the weather report says it is raining but in reality we are seeing blue skies!

### View the project live
* check out the project on [Github Pages](https://vicleb.github.io/weather-for-real-frontend/)
* note: for the purpose of this project the search by location feature has been restricted to the USA and Canada.

## Technologies used:
* React
* React router v6
* Redux
* Styled Components
* Google Place Autocomplete

## Getting Started Locally
* See [Back-end repo](https://github.com/VicLeB/weather-for-real-backend) to run the backend locally
* run  `npm install` to install required react dependencies
* run `npm start` to run the app in development mode

** note: to enable the search bar functionality you must generate your own api key from google places autocomplete. The use of this feature is however enabled on the hosted version of the app. See [Github Pages](https://vicleb.github.io/weather-for-real-frontend/)

## User stories
### Home page:
A non logged in user:
* With location services will view the current weather for their location as well as the corresponding “user feed” data from the last 24 hours.
* Without location service, the user is prompted to use the search bar to find a location.
* Non logged in users cannot leave comments.
* Non logged in users cannot post to the feed

Logged in user:
* Has access to the same features as a non logged in user but may leave comments on feed posts.
* The user can submit their own post to the feed.
* The logged in user has access to view all the posts they have created.

### Viewing Weather data:
* Alongside the feed feature, users regardless of their login status will have access to current weather data.
* In addition the user will be able to view forecast data for the next 5 days.

### Login and signup:
* On arrival, the user will be in a view only mode.
* The User May navigate to the login screen to login to their existing account or have the option to create a new account if they do not already have one.
* When a user is signing up for an account, in addition to a username/ password their Home Location information will be asked for in the form of a zip code or postal code.
* Once logged in, the user will be redirected to the home page.
* When logged in, the data provided for their home location will be utilized to display the weather and if there are posts that correspond to that location, they will be displayed in the post feed.

### Creating a post:
* A logged in user will now see a button ‘Create Post’ at the top of the post feed
* The user will be asked to submit a title, an image file, caption, city, state, and country
* This post will have a date and time associated with it.
* The newly created post will display at the top of the feed for that area as it is ordered by time created

### Viewing all created posts:
* Logged in users can navigate to a tab called ‘My Posts’ where they may view all the posts they have created.
* These posts will be rendered with the most recent post displaying first.
* The LoggedIn user has the ability to edit or delete each post.









