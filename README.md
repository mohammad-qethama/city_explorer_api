# city_explorer_api

**Author**: Mohammad Quthama
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->
this app will be on/as a server to the `https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/` site it will handle its request and response with data to them

## Getting Started

1. Set up the working environment:
   * adding .gitignore files
   * installing express.js , dotenv, cors and nodemon through npm.
   * adding the proper `.gitignore` and the ESlint JSON file
2. Retrieving data from ~~JSON files~~ API servers and use them to construct objects
3. send the object as a responses for each Endpoint.
4. response with an error statement when one  accrued.
5. added database for `LOCATIONS`
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->
* this project used (JavaScript, Node.js , .express.js , dotenv, cors, nodemon,superagent ,postgreSQL).
* API Services used  are (LocationIQ , NPS , weatherbit API,YELP FUSION,The MovieDB API ).

## Change Log

04-04-2021 4:00PM - Application now has a fully-functional express server, with a GET route for the location resource.
05-04-2021 8:04PM - Application now uses  API servers instead of local storage, and now show US national parks
07-04-2021 11:55PM - Applications now uses postgreSQL to save locations information into a database and retrive the information from it if he find it there.
07-04-2021 11:55PM -  Application now uses YELP FUSION API and The MovieDB API  

<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource.

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->

****

Number and name of feature: #1 Movies:

Estimate of time needed to complete: 15mins

Start time: 2:00 pm

Finish time: 2:30 pm

Actual time needed to complete: 30 mins

****

Number and name of feature: #2 Yelp

Estimate of time needed to complete:2 hours

Start time: 2:30 pm

Finish time: 5:30 pm

Actual time needed to complete: 3 Hours

****

Number and name of feature: #3  Pagination

Estimate of time needed to complete: 15 mins

Start time: 5:30 pm

Finish time: 5:50 pm

Actual time needed to complete: 20 mins

****
