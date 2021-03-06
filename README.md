# CityPop
A small mobile app for displaying country and city population, made with the React Native library.

* [Running the App](#running-the-app)
   * [Starting the app](#npm-start)
* [Using the App](#using-the-app)
   * [Search by City](#search-by-city)
      * Instructions
      * About
  * [Search by Country](#search-by-country)
      * Instructions
      * About
 
## Running the App

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

## Using the App

Going back while on the page displaying city population will return the user back to the home screen.

### Search by City

#### Instructions 

Input a city in the search box and tap the magnifying glass to search for a city and display its population. 

#### About

Searches are not case sensitive, but the name will have to match the returned city exactly.

If there are multiple cities with the same name the one with the highest population will be displayed.

### Search by Country 

#### Instructions

Input a country in the search box and tap the magnifying glass to search for a country and display different city options for that country.

#### About

Searches are not case sensitive.

If no country was found an alert will show, asking the user if they meant to put in a city instead, and provide a button to go the the [Search by City](#search-by-city) screen.

While searching for a country, there may be data available for more cities than what shows up in the list of search results. If the user has scrolled some length down the list of results, and there are more than 10 cities in the list of results, an alert will pop up, prompting the user to search for the city directly instead.
