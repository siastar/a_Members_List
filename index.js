const express = require('express'); //self titled
const path = require('path'); //module to handle file paths
const exphbs = require('express-handlebars'); //module for rendering templates
const logger = require('./middleware/logger'); //(example custom module)
const app = express(); //instantiates the express engine
//app is a name commonly used but it could be bugsbunny.
const members = require('./MembersDB');

//MIDDLEWARE: BODY PARSER
app.use(express.json());
/*
express builtin method that parses incoming requests
with JSON payloads and is based on body-parser.
https://expressjs.com/en/api.html
*/

app.use(express.urlencoded({extended: false}));
/*
This is a built-in middleware function in Express.
It parses incoming requests with urlencoded payloads
and is based on body-parser.
*/

//MIDDLEWARE: HANDLEBARS
app.engine('handlebars' , exphbs({defaultLayout: 'main'}));
/*'main' refers to /*/
app.set('view engine' , 'handlebars' );
/*
refer to handlebars documentation
https://www.npmjs.com/package/express-handlebars
*/

//SET A STATIC FOLDER
//app.use(express.static(path.join(__dirname, 'public')));
/*

'/' is the project folder, that means '/test' is the path
to test folder in the project folder

path is a module which permits to handle directories paths

res.sendFile responses a file (index.html) contained in a subfolder
of the project itself (public)

you can add any static html page in the public folder which will
be always reachable at the link localhost:PORT/pagename.html

e.g.
localhost:5000/index.html
localhost:5000/about.html
localhost:5000/somerandompage.html
*/

//HOMEPAGE ROUTE
app.get('/' , (req, res) =>
  res.render('index' , {
  title : 'Our Members !!!',
  members
  })
);

//MEMBERS API ROUTE
app.use('/api/members' , require('./routes/api/members'));

const PORT = process.env.PORT || 5000;
/*
optional: define a PORT variable which can be
an environment port which depends on server settings
OR (||), in case of no server settings,
a specific port number as 5000
*/
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
