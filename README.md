# Course work for back-end programming course

Course work for Back-end anytime course offered by LUT University.

The goal of the course is to learn to implement a RESTful API with Node.js using Express and MongoDB.

This project is a RESTful API to a database for storing information on players in a football team. The data is stored in Mondo DB Atlas Cloud.

## Running the project

To run the project, clone the repository and install the dependencies by running `npm install`. Note that you need to have Node installed.

Next, create a file called `.env`. This file is used for configuration and holds the connection string to the MongoDB database as well as the port where the app should be deployed. An example of a `.env` file is below:

```
MONGODB_URL = connection_string_without_quotes
PORT = 3001
```

When the environment file is set up, you can start the project by running `npm start`.

## API

Here is a list of the available API requests:

| Request | URL                             | Description                                            |
| ------- | ------------------------------- | ------------------------------------------------------ |
| GET     | /api/players                    | Get info for all the players                           |
| GET     | /api/players/id/:id             | Get info for a single player by id                     |
| GET     | /api/players/active             | List all the active players                            |
| GET     | /api/players/position/:position | List all the players of a position                     |
| POST    | /api/players                    | Add a new player                                       |
| DELETE  | /api/players/id/:id             | Delete a player                                        |
| PUT     | /api/players/retire/:id         | Make a player retire (move to another team etc.)       |
| PUT     | /api/players/activate/:id       | Activate a player (return from retiremet/another team) |
| PUT     | /api/players/id/:id             | Update any information                                 |

To see API in action, see [the video on YouTube](https://youtu.be/taxMOufmrik).
