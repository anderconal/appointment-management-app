# appointment-management-app
## Getting started

1. Clone or download the GitHub repository:
  * https://github.com/anderconal/appointment-management-app.git
2. Be sure you have installed MongoDB locally
  * Linux: https://docs.mongodb.com/manual/administration/install-on-linux/
  * OS X: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/
  * Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
3. Be sure you have created a local database called app-management-app or the name you want but, in this case, change inside app.js the mongoose.connect URL.
4. Go to the management-app directory:
  * cd appointment-management-app
5. Install node.js dependencies
  * npm install
6. Launch the appointment-management-app locally from project's root directory:
  * mongod
    * Start MongoDB using all defaults
  * npm start
    * Start a server which will be listening on port 3000 for connections.
  * gulp serve
    * An instance of Google Chrome will be executed on port 3001 and it will be watching for every change in the app to reload your browser automatically using Browsersync with Gulp.
