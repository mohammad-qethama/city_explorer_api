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
* API Services used  are (LocationIQ , NPS , weatherbit API).


## Change Log

04-04-2021 4:00PM - Application now has a fully-functional express server, with a GET route for the location resource.
05-04-2021 8:04PM - Applecation now uses  API servers instead of local storage, and now show US national parks
07-04-2021 11:55PM - Applecation now uses postgreSQL to save locations information into a database and retrive the information from it if he find it there. 


<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource.

## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->

****

Number and name of feature: #1 Database: 

Estimate of time needed to complete: 15mins

Start time: 4:30 pm

Finish time: 4:40 pm

Actual time needed to complete: 10 mins

****

Number and name of feature: #2 Server

Estimate of time needed to complete:4 hours

Start time: 6-APR-2021/5:00 pm

Finish time: 7-APR-2021/12 pm

Actual time needed to complete: 9 Hours

****

Number and name of feature: #3 Deploy:

Estimate of time needed to complete: 30 mins

Start time: 7-APR-2021/12:00 pm

Finish time: 7-APR-2021/12:30 pm

Actual time needed to complete: 30 mins

****
