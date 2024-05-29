## Movies 57 Blocks
This is a challenge assigned for 57Blocks which is the client and server implementation for displaying movies information. Both are deployed in a Cloud environment. 

## Comenzando 🚀
These instructions will allow you to get a copy of the project up and running on your local machine for development and testing purposes.
## Backend
The backend can be run locally and is also deployed in an amazon lambda, it is exposed through apigateway.

All apis except for registration and login are protected and in order to use them you must provide an authorization token. This token is generated when you login, then passed in the Authorization header and the Bearer xxxxx value.

Next I am going to explain the steps to execute it locally and deploy it.

#### To run it locally:

*Install the dependencies*

```sh
cd backend-pr
npm i
```

In order to avoid cors problems, you must substitute the *FRONTEND_URL* variable in yout .env file with the url where your front end is running locally.

*Run the project:*

```sh
cd backend-pr
npm run dev:api
```
It is important that you use the command dev:api to run locally.

#### To Deploy

*Pre-requisites*

- Have the amazon variables configured on your computer.
- Have the serverless dependency installed globally
- Have a serverless account

```sh
cd backend-pr
npm run deploy
```
It is important to clarify that we have serverless globally only for manual deployment purposes, in a real application, it should have its own pipeline configured.
In order to avoid cors problems, you must substitute the *FRONTEND_URL* variable in yout .env file with the url where your front end is running: https://movies-57blocks.netlify.app.

#### Project explanation

The Movies 57Blocks project is an API that allows the management of users, movies and authentication. It has been designed using a Serverless architecture, hosted on AWS, and has been implemented following the Model-View-Controller (MVC) design pattern.

#### Technologies Used
- *Node.js*: JavaScript execution environment.
- *Express.js*: Framework to build the REST API.
- *MongoDB*: NoSQL database used for data storage.
- *Mongoose*: ODM for MongoDB, facilitates data management in MongoDB from Node.js.
- *AWS Lambda*: Serverless computing service to run the backend.
- *Serverless Framework*: To deploy and manage serverless functions.
- *Jest*: Testing framework for JavaScript.
- *Babel*: JavaScript transpiler, to use the latest language features.
- *Dotenv*: Load environment variables from an .env file.
- *Webpack*: Module packer for JavaScript applications.

#### Technical Decisions

*Choice of MongoDB:*

MongoDB was chosen as the database because of its flexible and scalable nature. MongoDB is ideal for applications where data does not have complex relationships, as is the case in this project, where user documents and movies can exist independently of each other.

*Serverless architecture:*
The choice of a serverless architecture, using AWS Lambda, allows to automatically scale the backend according to demand, reducing operational and infrastructure costs.

*MVC approach*
The Model-View-Controller (MVC) design pattern has been followed to organize the code in a modular and maintainable way.


### Project Configuration
The serverless.yml file defines the configuration for deploying the project to AWS Lambda.

### Testing

Jest has been configured to perform unit tests and generate a coverage report.

```sh
cd backend-pr
npm run test:coverage
```

##### Methods


| Verb | Method | url | body |
| ------ | ------ | ------ | ------ | 
| Post | [Register][PlDb] | https://tdk1r1bzgf.execute-api.us-east-1.amazonaws.com/dev/auth/register | email*, password* |
| Post | [Login][PlGh] | https://tdk1r1bzgf.execute-api.us-east-1.amazonaws.com/dev/auth/login | email* , password* |
| Patch | [Update user][PlGd] |https://tdk1r1bzgf.execute-api.us-east-1.amazonaws.com/dev/users/**id** | password*, favorites* |
| Get | [GetMovies][PlOd] | https://tdk1r1bzgf.execute-api.us-east-1.amazonaws.com/dev/movies/list?page=# |N/A|
| Get | [GetMoviesById][PlMe] | https://tdk1r1bzgf.execute-api.us-east-1.amazonaws.com/dev/movies/**id**| N/A |
| Get | [GetFavorites][PlGa] | https://tdk1r1bzgf.execute-api.us-east-1.amazonaws.com/dev/users/favorites/**id** |N/A|


*Note*: There is a postman collection in the backend project that you can download in case you have questions

### Frontend
#### To run it locally:

In order to avoid cors problems, you must substitute the *VITE_API_URL* variable in yout .env file with the url where your front end is running locally (e.g. VITE_API_URL=http://localhost:4000/).

*Install the dependencies*
```sh
cd frontend-pr
npm install
```

*Run the project:*
```sh
npm run dev
```

#### To Deploy

*Pre-requisites*
- have the VITE_API_URL environment variable with the following URL: https://tdk1r1bzgf.execute-api.us-east-1.amazonaws.com/dev
- Have a Netlify account

To upload and run the project in Netlify, you must first run the command:
```sh
cd frontend_pr
npm run build
```

This command will create a new file in the root of the project named *dist*
Manually take this file to Netlfy: 
1. Login 
2. in the left menu click on "Sites"
3. Go to Site Overview (After the file has been uploaded successfully)
4. Click on Site Configuration and then change site name
5. Make sure you name the Site this: movies-57blocks
where the final link would be: https://movies-57blocks.netlify.app
6. Then in Site Configuration click on environment Variables
7. add the VITE_API_URL environment variable with the following link https://tdk1r1bzgf.execute-api.us-east-1.amazonaws.com/dev
8. avoid reloading the page

The urls mentioned above are where our backend is running and how the frontend url should be called

#### About the project
The application is divided into two parts: login and registration, and viewing and managing the movies, therefore it has two main layouts (AppLayout and AuthLayout) and has 3 main pages: Dashboard, Favorites, DetailFavorite. interacting dynamically with all these.

#### Technologies Used
- *React.js*: execution environment.
- *axios*: Framework call our REST API.
- *React-Query*: Library to get server data.
- *TaiwindCSS*: Framework for CSS code.
- 
#### authors ✒️
Leslie Torres - fullstack developer
