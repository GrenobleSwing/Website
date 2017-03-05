var port = 8001;
var express = require('express');
var app = express();
var cache = require('memory-cache');
var cors = require('cors');

app.use(cors());

function updateResponseHeader(response) {
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTION');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  var identity = cache.get('identity');
  if (identity === null) {
    response.writeHead(400, {'Content-Type': 'text/plain'});
  } else {
    response.writeHead(200, {'Content-Type': 'text/plain'});
  }
}

/**
 * ACCOUNT
 */
var accountRouter = express.Router();
var account = require('./account.json');
accountRouter.get('/:id', function(request, response) {
  console.log("=================== /api/v1/account/:id GET ===================");
  updateResponseHeader(response);
  response.write(JSON.stringify(account));
  response.end();
});

var accounts = require('./accounts.json');
accountRouter.get('/', function(request, response) {
  console.log("=================== /api/v1/account/ GET ===================");
  updateResponseHeader(response);
  response.write(JSON.stringify(accounts));
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
  updateResponseHeader(response);
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
  updateResponseHeader(response);
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
app.use('/api/v1/subscription/', subscriptionRouter);

/**
 * SUBSCRIPTIONS'SUMMARY
 */
var summaryRouter = express.Router();
var summaries = require('./summary.json');
summaryRouter.get('/:id', function(request, response) {
  console.log("=================== /api/v1/summary/:id GET ===================");
  updateResponseHeader(response);
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
  updateResponseHeader(response);
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
  updateResponseHeader(response);
  response.write(JSON.stringify(topics));
  response.end();
});
app.use('/api/v1/topic/', topicRouter);

/**
 * USERS
 */
 var userRouter = express.Router();
userRouter.get('/:id', function(request, response) {
  console.log("=================== /api/v1/user/:id GET ===================");
  updateResponseHeader(response);
  if (request.params.id == 3) {
    response.write(JSON.stringify(johnDoeUser));    updateResponseHeader(response);

  } else {
    response.write(JSON.stringify(adminUser));
  }
  response.end();
});
app.use('/api/v1/user/', userRouter);

var users = require('./users.json');
userRouter.get('/', function(request, response) {
  console.log("=================== /api/v1/user/ GET ===================");
  updateResponseHeader(response);
  response.write(JSON.stringify(users));
  response.end();
});
app.use('/api/v1/user/', userRouter);

/**
 * TOKEN
 */
var tokenRouter = express.Router();
var adminToken = require('./adminToken.json');
var johnDoeToken = require('./johnDoeToken.json');
var adminUser = require('./adminUser.json');
var johnDoeUser = require('./johnDoeUser.json');
tokenRouter.post('/', function(request, response) {
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
      updateResponseHeader(response);
      response.write(JSON.stringify(adminToken));
      response.end();
    } else if (login === 'wrong@login.com') {
      response.writeHead(400, {'Content-Type': 'text/plain'});
      response.end();
    } else {
      johnDoeToken.token = createToken(login);
      cache.put('token', johnDoeToken);
      cache.put('identity', johnDoeUser);
      updateResponseHeader(response);
      response.write(JSON.stringify(johnDoeToken));
      response.end();
    }
  });
});
app.use('/api/v1/auth/', tokenRouter);

/**
 * IDENTITY
 */
var identityRouter = express.Router();
identityRouter.get('/', function(request, response) {
  updateResponseHeader(response);
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
app.use('/api/v1/year/', yearRouter);


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
