# Angular - Firebase port of the popular Opencart marketplace

This project was inspired by [opencart](http://www.opencart.com/), the popular php-based open source shopping cart solution.

The project is an implementation of the Angular model-view-controller (MVC) design pattern outlined in the
[angularfire-slack-tutorial](https://thinkster.io/angularfire-slack-tutorial), by the good folks at thinkster.io (they are the best!)

## Getting Started

We assume you have knowledge of programming and at least knowledge of JavaScript and AngularJS. We recommend going through
[A Better Way to Learn AngularJS](https://thinkster.io/a-better-way-to-learn-angularjs), by thinkster.io, if you're not familiar with AngularJS.

The backend database is provided by [Firebase](https://www.firebase.com/). In order to connect the app to your own Firebase instance, you will need to
get a free Firebase account and create a Firebase app. The visit our wiki page to see how to setup your Firebase connection.

To get you started you can simply clone the angular-seed repository and install the dependencies.

### Prerequisites

Before you begin, you will need to install [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/) and [http://git-scm.com/](http://git-scm.com/).
Node.js and npm are used to install [Grunt](http://gruntjs.com/), for running tasks.

To install Node.js, you will need to go [here](https://nodejs.org/en/), and download the proper version for your local system.

You can install the [git desktop](https://nodejs.org/en/) and then use it to clone the codebase to your local machine, or you can download the zip file
and unzip it. Either way the codebase must reside in a folder that is accessible by your local web server.

Once you have Node.js installed and have cloned the codebase locally, you will need to go to Firebase and create a app from the Firebase Dashboard. You
don't really need to worry about what name you use, just find one that is not being used. Later we will need to add that unique name to the app.

### Install Dependencies

Once the prerequisites are installed, you will have to run a few commands to install the dependencies. If you are running on a MAC, you will need
to open a terminal window in the directory where you cloned the app. If you are running Windows, you will need to open a command prompt in the directory
where you cloned the app.

Run the command below to install `npm`

```
npm install
```

Run the command below to install `grunt`

```
npm install -g grunt-cli
```

### Run the Application

To start the app run the command below. This will initialize everything and open a browser window at localhost:9000. When you first fire up the app it
will connect to our demo Firebase instance. In order to connect it to your Firebase account you will need to change a couple of settings in the app.js file,
please visit our wiki page for more information.

```
grunt serve
```

Now browse to the app at `http://localhost:9000`.



## Directory Layout

```
app/                    --> all of the source files for the application
  admin/                --> html templates, angular controllers and services for admin app
  auth/                 --> html templates, angular controllers and services for Firebase authentication
  catalog/              --> html templates, angular controllers and services for the storefront app
  register/             --> html templates, angular controllers and services for customer and tenant registration
  styles/               --> style sheets for the storefront and admin apps
  bower_components/     --> components used by the app
  data/                 --> a JSON file containing products that where uploaded into our demo
  app.js                --> loads angular modules and sets up connection to Firebase
  index.html            --> app layout file (the main html template file of the app)
```

## Contact

If you have any questions or need more information please visit us at http://bluerockapps.com/#contact
