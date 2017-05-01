var port = 8001;
var express = require('express');
var app = express();
var cache = require('memory-cache');
var cors = require('cors');

app.use(cors());

function updateResponseHeader(request, response) {

  // auth is in base64(username:password)  so we need to decode the base64
  var auth = request.headers.authorization;
  console.log("Authorization Header is: ", auth);

  if(!auth) {
       // No Authorization header was passed in so it's the first time the browser hit us

         // Sending a 401 will require authentication, we need to send the 'WWW-Authenticate' to tell them the sort of authentication to use
         // Basic auth is quite literally the easiest and least secure, it simply gives back  base64( username + ":" + password ) from the browser
         response.statusCode = 401;
         response.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
         response.setHeader('Content-Type', 'application/json');

        //  response.end('<html><body>Need some creds son</body></html>');
   } else {
     // The Authorization was passed in so now we validate it

       // var tmp = auth.split(' ');   // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part

       // var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
       // var plain_auth = buf.toString();        // read it back out as a string

      //  console.log("Decoded Authorization ", plain_auth);

       // At this point plain_auth = "username:password"

      //  var creds = plain_auth.split(':');      // split on a ':'
      //  var username = creds[0];
      //  var password = creds[1];

      //  if((username == 'hack') && (password == 'thegibson')) {   // Is the username/password correct?

           response.statusCode = 200;  // OK
           response.setHeader('Content-Type', 'application/json');
           response.setHeader('Access-Control-Allow-Origin', '*');
           response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTION');
           response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      //  } else {
      //    response.setHeader('Content-Type', 'application/json');
      //      response.statusCode = 401; // Force them to retry authentication
      //      response.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');

           // res.statusCode = 403;   // or alternatively just reject them altogether with a 403 Forbidden

          //  response.end('<html><body>You shall not pass</body></html>');
      //  }
  }


  // var identity = cache.get('identity');
  // if (identity === null) {
  //   console.log("identity is missing...");
  //   response.writeHead(400, {'Content-Type': 'text/plain'});
  // } else {
  //   response.writeHead(200, {'Content-Type': 'text/plain'});
  // }
}

/**
 * ACCOUNT
 */
var accountRouter = express.Router();
var account = require('./account.json');
accountRouter.get('/:id', function(request, response) {
  console.log("=================== /api/v1/account/:id GET ===================");

  updateResponseHeader(request, response);
  response.write(JSON.stringify(account));
  response.end();
});
accountRouter.get('/new', function(request, response) {
  console.log("=================== /api/v1/account/new GET ===================");

  updateResponseHeader(request, response);
  response.write(JSON.stringify(form));
  response.end();
});
accountRouter.get('/:id/remove', function(request, response) {
  console.log("=================== /api/v1/account/:id /remove GET ===================");

  updateResponseHeader(request, response);
  response.write(JSON.stringify(form));
  response.end();
});
accountRouter.get('/:id/edit', function(request, response) {
  console.log("=================== /api/v1/account/:id /edit GET ===================");

  updateResponseHeader(request, response);
  response.write(JSON.stringify(form));
  response.end();
});
app.use('/api/v1/account/', accountRouter);

/**
 * SUBSCRIPTIONS
 */
var subscriptionRouter = express.Router();
var subscriptions = require('./subscriptions.json');
subscriptionRouter.get('/', function(request, response) {
  console.log("=================== /api/v1/subscription/ GET ===================");

  updateResponseHeader(request, response);
  var userId = request.query.userId;
  var yearId = request.query.yearId;
  console.log("userId: " + userId);
  console.log("yearId: " + yearId);
  var filteredSubscriptions = subscriptions.filter(function(x) {
    return x.userId == userId && x.yearId == yearId;
  });
  response.write(JSON.stringify(filteredSubscriptions));
  response.end();
});

subscriptionRouter.get('/:id', function(request, response) {
  console.log("=================== /api/v1/subscription/:id GET ===================");

  updateResponseHeader(request, response);
  var id = request.params.id;
  var filteredSubscriptions = subscriptions.filter(function(x) {
    return x.id == id;
  });
  if (filteredSubscriptions.length == 1) {
    response.write(JSON.stringify(filteredSubscriptions[0]));
  } else if (filteredSubscriptions.length === 0) {
    response.writeHead(500, {'Content-Type': 'text/plain'});
  } else {
    response.writeHead(500, {'Content-Type': 'text/plain'});
  }
  response.end();
});

subscriptionRouter.put('/:id', function(request, response) {
  console.log("=================== /api/v1/subscription/:id PUT ===================");

  updateResponseHeader(request, response);
  var id = request.params.id;
  console.log("subscriptionId="+id);

  response.end();
});
app.use('/api/v1/subscription/', subscriptionRouter);

/**
 * SUBSCRIPTIONS'SUMMARY
 */
var summaryRouter = express.Router();
var summaries = require('./summary.json');
summaryRouter.get('/:id', function(request, response) {
  console.log("=================== /api/v1/summary/:id GET ===================");

  updateResponseHeader(request, response);
  var id = request.params.id;
  var filteredSummaries = summaries.filter(function(x) {
    return x.id == id;
  });
  if (filteredSummaries.length == 1) {
    response.write(JSON.stringify(filteredSummaries[0]));
  } else if (filteredSummaries.length === 0) {
    response.writeHead(500, {'Content-Type': 'text/plain'});
  } else {
    response.writeHead(500, {'Content-Type': 'text/plain'});
  }
  response.end();
});

summaryRouter.get('/', function(request, response) {
  console.log("=================== /api/v1/summary/ GET ===================");

  updateResponseHeader(request, response);
  var userId = request.query.userId;
  var yearId = request.query.yearId;

  var filteredSummaries = summaries.filter(function(item) {
	return item.userId == userId && item.yearId == yearId;
  });
  console.log(filteredSummaries);
  response.write(JSON.stringify(filteredSummaries));
  response.end();
});

app.use('/api/v1/summary/', summaryRouter);

/**
 * TOPICS
 */
var topicRouter = express.Router();
var topics = require('./topics.json');
topicRouter.get('/', function(request, response) {
  console.log("=================== /api/v1/topic/ GET ===================");

  updateResponseHeader(request, response);
  response.write(JSON.stringify(topics));
  response.end();
});
topicRouter.get('/new', function(request, response) {
  console.log("=================== /api/v1/topic/new GET ===================");

  updateResponseHeader(request, response);
  response.write(JSON.stringify(form));
  response.end();
});
topicRouter.get('/:id/remove', function(request, response) {
  console.log("=================== /api/v1/topic/:id /remove GET ===================");

  updateResponseHeader(request, response);
  response.write(JSON.stringify(form));
  response.end();
});
topicRouter.get('/:id/edit', function(request, response) {
  console.log("=================== /api/v1/topic/:id /edit GET ===================");

  updateResponseHeader(request, response);
  response.write(JSON.stringify(form));
  response.end();
});
topicRouter.get('/:id/activity/new', function(request, response) {
  console.log("=================== /api/v1/topic/registration/new GET ===================");

  updateResponseHeader(request, response);
  response.write(JSON.stringify(form));
  response.end();
});
app.use('/api/v1/topic/', topicRouter);

/**
 * CLASSES
 */
var classRouter = express.Router();
var classes = require('./classes.json');
classRouter.get('/', function(request, response) {
  console.log("=================== /api/v1/class/ GET ===================");

  updateResponseHeader(request, response);
  var userId = request.query.userId;
  var yearId = request.query.yearId;
  console.log("userId: " + userId);
  console.log("yearId: " + yearId);
  var filteredclasses = classes.filter(function(x) {
    return x.userId == userId && x.yearId == yearId;
  });
  response.write(JSON.stringify(filteredclasses));
  response.end();
});

classRouter.get('/:id', function(request, response) {
  console.log("=================== /api/v1/class/:id GET ===================");

  updateResponseHeader(request, response);
  var id = request.params.id;
  var filteredclasses = classes.filter(function(x) {
    return x.id == id;
  });
  if (filteredclasses.length == 1) {
    response.write(JSON.stringify(filteredclasses[0]));
  } else if (filteredclasses.length === 0) {
    response.writeHead(500, {'Content-Type': 'text/plain'});
  } else {
    response.writeHead(500, {'Content-Type': 'text/plain'});
  }
  response.end();
});
app.use('/api/v1/class/', classRouter);

/**
 * STUDENTS
 */
var studentRouter = express.Router();
var students = require('./students.json');
studentRouter.get('/', function(request, response) {
  console.log("=================== /api/v1/student/ GET ===================");

  updateResponseHeader(request, response);
  var userId = request.query.userId;
  var yearId = request.query.yearId;
  console.log("userId: " + userId);
  console.log("yearId: " + yearId);
  var filteredstudents = students.filter(function(x) {
    return x.userId == userId && x.yearId == yearId;
  });
  response.write(JSON.stringify(filteredstudents));
  response.end();
});

studentRouter.get('/:id', function(request, response) {
  console.log("=================== /api/v1/student/:id GET ===================");

  updateResponseHeader(request, response);
  var id = request.params.id;
  var filteredstudents = students.filter(function(x) {
    return x.id == id;
  });
  if (filteredstudents.length == 1) {
    response.write(JSON.stringify(filteredstudents[0]));
  } else if (filteredstudents.length === 0) {
    response.writeHead(500, {'Content-Type': 'text/plain'});
  } else {
    response.writeHead(500, {'Content-Type': 'text/plain'});
  }
  response.end();
});
app.use('/api/v1/student/', studentRouter);

/**
 * USERS
 */
 var userRouter = express.Router();
userRouter.get('/:id', function(request, response) {
  console.log("=================== /api/v1/user/:id GET ===================");

  updateResponseHeader(request, response);
  if (request.params.id == 3) {
    response.write(JSON.stringify(johnDoeUser));    updateResponseHeader(request, response);

  } else {
    response.write(JSON.stringify(adminUser));
  }
  response.end();
});
app.use('/api/v1/user/', userRouter);

var users = require('./users.json');
userRouter.get('/', function(request, response) {
  console.log("=================== /api/v1/user/ GET ===================");

  updateResponseHeader(request, response);
  response.write(JSON.stringify(users));
  response.end();
});

userRouter.post('/', function(request, response) {
  console.log("=================== /api/v1/user/ POST ===================");


  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTION');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.writeHead(201, {'Content-Type': 'text/plain'});

  request.on('data', function(chunk) {
    var data = JSON.parse(chunk);
    console.log(data);
    cache.put('user', data);
    response.end();
  });
});
app.use('/api/v1/user/', userRouter);

/**
 * AUTH
 */
var authRouter = express.Router();
var adminToken = require('./adminToken.json');
var johnDoeToken = require('./johnDoeToken.json');
var adminUser = require('./adminUser.json');
var johnDoeUser = require('./johnDoeUser.json');
authRouter.post('/', function(request, response) {
  console.log("=================== /api/v1/auth/ POST ===================");

  cache.clear();
  request.on('data', function(chunk) {
    var data = JSON.parse(chunk);
    var login = data.login;
    console.log(login);

    if (login === 'teacher@test.com') {
      adminToken.token = createToken(login);
      cache.put('token', adminToken);
      cache.put('identity', adminUser);

      response.statusCode = 200;  // OK
      response.setHeader('Content-Type', 'application/json');
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTION');
      response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      response.write(JSON.stringify(adminToken));
      response.end();
    } else if (login === 'wrong@login.com') {
      response.writeHead(400, {'Content-Type': 'text/plain'});
      response.end();
    } else {
      johnDoeToken.token = createToken(login);
      cache.put('token', johnDoeToken);
      cache.put('identity', johnDoeUser);

      response.statusCode = 200;  // OK
      response.setHeader('Content-Type', 'application/json');
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTION');
      response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      response.write(JSON.stringify(johnDoeToken));
      response.end();
    }
  });
});
app.use('/api/v1/auth/', authRouter);

/**
 * TOKEN
 */
 var tokenRouter = express.Router();
 tokenRouter.get('/', function(request, response) {


   response.setHeader('Content-Type', 'application/json');
   response.setHeader('Access-Control-Allow-Origin', '*');
   response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTION');
   response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

   console.log("=================== /api/v1/token GET ===================");
   response.writeHead(200, {'Content-Type': 'text/plain'});

   var token = cache.get('token');
   if (token !== null) {
     console.log(token);
     response.write(JSON.stringify({token : "mySuperToken", status: "OK", expiresIn : 86400}));
   } else {
     response.write(JSON.stringify({token : "", status: "NOK", expiresIn : 0}));
   }
   response.end();
 });
 app.use('/api/v1/token/', tokenRouter);


/**
 * IDENTITY
 */
var identityRouter = express.Router();
identityRouter.get('/', function(request, response) {

  updateResponseHeader(request, response);
  console.log("=================== /api/v1/identity GET ===================");

  var identity = cache.get('identity');
  if (identity !== null) {
    console.log(identity);
    response.write(JSON.stringify(identity));
  }
  response.end();
});
app.use('/api/v1/identity/', identityRouter);

/**
 * LOGOUT
 */
 var logoutRouter = express.Router();
logoutRouter.post('/', function(request, response) {
  console.log("=================== /api/v1/logout/ POST ===================");


  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTION');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.writeHead(200, {'Content-Type': 'text/plain'});

  cache.clear();
  response.end();
});
app.use('/api/v1/logout/', logoutRouter);

/**
 * YEARS
 */
var yearRouter = express.Router();
yearRouter.get('/current', function(request, response) {
  console.log("=================== /api/v1/year/current GET ===================");


  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTION');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.writeHead(200, {'Content-Type': 'application/json'});

  response.write(JSON.stringify({current : "2016-2017"}));
  response.end();
});
yearRouter.get('/next', function(request, response) {
  console.log("=================== /api/v1/year/next GET ===================");


  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTION');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.writeHead(200, {'Content-Type': 'application/json'});

  response.write(JSON.stringify({next : "2017-2018"}));
  response.end();
});
yearRouter.get('/', function(request, response) {
  console.log("=================== /api/v1/year/all GET ===================");

  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTION');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.writeHead(200, {'Content-Type': 'application/json'});

  response.write(JSON.stringify({current : "2016-2017", "next" : "2017-2018"}));
  response.end();
});
yearRouter.get('/new', function(request, response) {
  console.log("=================== /api/v1/year/new GET ===================");

  updateResponseHeader(request, response);
  response.write(JSON.stringify(form));
  response.end();
});
yearRouter.get('/:id/remove', function(request, response) {
  console.log("=================== /api/v1/year/:id /remove GET ===================");

  updateResponseHeader(request, response);
  response.write(JSON.stringify(form));
  response.end();
});
yearRouter.get('/:id/edit', function(request, response) {
  console.log("=================== /api/v1/year/:id /edit GET ===================");

  updateResponseHeader(request, response);
  response.write(JSON.stringify(form));
  response.end();
});
yearRouter.get('/:id/activity/new', function(request, response) {
  console.log("=================== /api/v1/year/:id /edit GET ===================");

  updateResponseHeader(request, response);
  response.write(JSON.stringify(form));
  response.end();
});
app.use('/api/v1/year/', yearRouter);

var paymentRouter = express.Router();
paymentRouter.get('/new', function(request, response) {
 console.log("=================== /api/v1/payment/new GET ===================");

 updateResponseHeader(request, response);
 response.write(JSON.stringify(form));
 response.end();
});
paymentRouter.get('/:id/edit', function(request, response) {
 console.log("=================== /api/v1/payment/:id/edit GET ===================");

 updateResponseHeader(request, response);
 response.write(JSON.stringify(form));
 response.end();
});
paymentRouter.get('/:id/remove', function(request, response) {
 console.log("=================== /api/v1/payment/:id/remove GET ===================");

 updateResponseHeader(request, response);
 response.write(JSON.stringify(form));
 response.end();
});

/**
 * ACTIVITE
 */
 var activityRouter = express.Router();
 activityRouter.get('/new', function(request, response) {
   console.log("=================== /api/v1/activity/new GET ===================");

   updateResponseHeader(request, response);
   response.write(JSON.stringify(form));
   response.end();
 });
 activityRouter.get('/:id/remove', function(request, response) {
   console.log("=================== /api/v1/activity/:id /remove GET ===================");

   updateResponseHeader(request, response);
   response.write(JSON.stringify(form));
   response.end();
 });
 activityRouter.get('/:id/edit', function(request, response) {
   console.log("=================== /api/v1/activity/:id /edit GET ===================");

   updateResponseHeader(request, response);
   response.write(JSON.stringify(form));
   response.end();
 });
 activityRouter.get('/:id/category/new', function(request, response) {
   console.log("=================== /api/v1/activity/:id/category/new GET ===================");

   updateResponseHeader(request, response);
   response.write(JSON.stringify(form));
   response.end();
 });
 activityRouter.get('/:id/discount/new', function(request, response) {
   console.log("=================== /api/v1/activity/:id/discount/new GET ===================");

   updateResponseHeader(request, response);
   response.write(JSON.stringify(form));
   response.end();
 });
 activityRouter.get('/:id/topic/new', function(request, response) {
   console.log("=================== /api/v1/activity/:id/topic/new GET ===================");

   updateResponseHeader(request, response);
   response.write(JSON.stringify(form));
   response.end();
 });
app.use('/api/v1/activity/', activityRouter);

/**
 * CATEGORIE
 */
 var form = require('./form.json');
 var categoryRouter = express.Router();
 categoryRouter.get('/:id/edit', function(request, response) {
   console.log("=================== /api/v1/category/:id/edit GET ===================");

   updateResponseHeader(request, response);
   response.write(JSON.stringify(form));
   response.end();
 });
 categoryRouter.get('/:id/remove', function(request, response) {
   console.log("=================== /api/v1/category/:id/remove GET ===================");

   updateResponseHeader(request, response);
   response.write(JSON.stringify(form));
   response.end();
 });
 app.use('/api/v1/category/', categoryRouter);

/**
 * REMISE
 */
 var discountRouter = express.Router();
 discountRouter.get('/:id/edit', function(request, response) {
   console.log("=================== /api/v1/discount/:id/edit GET ===================");

   updateResponseHeader(request, response);
   response.write(JSON.stringify(form));
   response.end();
 });
 discountRouter.get('/:id/remove', function(request, response) {
   console.log("=================== /api/v1/discount/:id/remove GET ===================");

   updateResponseHeader(request, response);
   response.write(JSON.stringify(form));
   response.end();
 });
 app.use('/api/v1/discount/', discountRouter);

 /**
  * INSCRIPTION
  */
var registrationRouter = express.Router();
registrationRouter.get('/:id/edit', function(request, response) {
  console.log("=================== /api/v1/registration/:id/edit GET ===================");

  updateResponseHeader(request, response);
  response.write(JSON.stringify(form));
  response.end();
});
registrationRouter.get('/:id/remove', function(request, response) {
  console.log("=================== /api/v1/registration/:id/remove GET ===================");

  updateResponseHeader(request, response);
  response.write(JSON.stringify(form));
  response.end();
});
app.use('/api/v1/registration/', registrationRouter);

/**
 * VENUE
 GET      /api/venue/new
POST     /api/venue
GET      /api/venue/{venue}/remove
DELETE   /api/venue/{venue}
GET      /api/venue/{venue}
GET      /api/venue
GET      /api/venue/{venue}/edit
PUT      /api/venue/{venue}
 */
var venueRouter = express.Router();
venueRouter.get('/new', function(request, response) {
 console.log("=================== /api/v1/venue/new GET ===================");

 updateResponseHeader(request, response);
 response.write(JSON.stringify(form));
 response.end();
});
venueRouter.post('/', function(request, response) {
  console.log("=================== /api/v1/venue/ POST ===================");


  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTION');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.writeHead(201, {'Content-Type': 'text/plain'});

  request.on('data', function(chunk) {
    var data = JSON.parse(chunk);
    console.log(data);
    cache.put('venue', data);
    response.end();
  });
});
venueRouter.delete('/:id', function(request, response) {
 console.log("=================== /api/v1/venue/:id GET ===================");

 updateResponseHeader(request, response);
 response.write(JSON.stringify(form));
 response.end();
});
venueRouter.get('/:id', function(request, response) {
 console.log("=================== /api/v1/venue/:id GET ===================");

 updateResponseHeader(request, response);
 response.write(JSON.stringify("venue"));
 response.end();
});
venueRouter.get('/:id/edit', function(request, response) {
 console.log("=================== /api/v1/venue/:id/edit GET ===================");

 updateResponseHeader(request, response);
 response.write(JSON.stringify(form));
 response.end();
});
venueRouter.get('/:id/remove', function(request, response) {
 console.log("=================== /api/v1/venue/:id/remove GET ===================");

 updateResponseHeader(request, response);
 response.write(JSON.stringify(form));
 response.end();
});
app.use('/api/v1/venue/', paymentRouter);

/**
 * PAIEMENT
 */
var paymentRouter = express.Router();
paymentRouter.get('/new', function(request, response) {
 console.log("=================== /api/v1/payment/new GET ===================");

 updateResponseHeader(request, response);
 response.write(JSON.stringify(form));
 response.end();
});
paymentRouter.get('/:id/edit', function(request, response) {
 console.log("=================== /api/v1/payment/:id/edit GET ===================");

 updateResponseHeader(request, response);
 response.write(JSON.stringify(form));
 response.end();
});
paymentRouter.get('/:id/remove', function(request, response) {
 console.log("=================== /api/v1/payment/:id/remove GET ===================");

 updateResponseHeader(request, response);
 response.write(JSON.stringify(form));
 response.end();
});
app.use('/api/v1/payment/', paymentRouter);

app.listen(port, function() {
  console.log("Server listening to http://localhost:%s", port);
});

function createToken(input) {
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }

        output = output +
            keyStr.charAt(enc1) +
            keyStr.charAt(enc2) +
            keyStr.charAt(enc3) +
            keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);

    return output;
}
