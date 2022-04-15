# CityPop
A small mobile app for displaying country and city population, made with the React Native library.

* [Running the App](#running-the-app)
  * [npm start](#npm-start)
* [Using the App](#using-the-app)
  * [Search by City](#search-by-city)
   * [Instructions](#instructions)
   * [About](#about)
  * [Search by Country](#search-by-country)
   * [Instructions](#instructions)
   * [About](#about)
 
## Running the App

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

## Using the App

### Search by City

#### Instructions 

Input a city in the search box and tap the magnifying glass to search. Searches are not case sensitive, but the name will match the returned city exactly.

#### About

If there are multiple cities with the same name only the one with the highest population will be returned.

### Search by Country 

#### Instructions

Input a country in the search box and tap the magnifying glass to search. 

#### About

Searches ae not case sensitive.

If no country was found an alert will show, asking the user if they meant to put in a city instead.

There might be data available for more cities than the ones that show up in the search results. If the user has scrolled some length down the list of results, an alert will show, asking the user to put in the city directly if they cannot find it in the list.
