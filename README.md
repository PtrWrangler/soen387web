# soen387web
Soen 387 Web-Enterprise application design

# Setting up the project
You need to make sure that you have NodeJS installed on your machine in order
to be able to install all the necessary dependencies.  Once you pull the repository down,
please make sure to run the following to download all the dependencies:

    $ sudo npm -g install bower
    $ cd FRONTEND
    $ bower install

This will download all the dependencies and install the libraries necessary for
the project.

# Running the project
You'll need to make sure to run this in the root of your project.  This will
install all the dependencies (`npm install`) and start the server (`npm start`).

  $ npm install
  $ npm start

### Running the test server 
 (this can probably be combined with the other commands but i dont know how to do that yet)
 You'll have to open another terminal, cd into BACKEND/server/ and run ('npm install express')
 to install express needed to run the node.js server. Then run ('node server.js')

 (from BACKEND/server/ in a  new terminal)
 $ npm install express
 $ node server.js