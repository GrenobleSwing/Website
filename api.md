FORMAT: 1A
HOST: http://polls.apiblueprint.org/

# Grenoble Swing API

API allowing the management of members, and their registration.

## Authentication [/api/auth]

### authenticate [POST]

+ Response 200 (application/json)

        {
            "expires_in": "84600",
            "token": "abcdef0123456789"
        }

## Identity [/api/identity]

### Retrieve current identity [GET]

+ Response 200 (application/json)

        {
            "user_id": 1234,
            "login": "example@test.com"
        }

+ Response 401 (application/json)

        {
            "user_id": 1234,
            "login": "example@test.com"
        }

## Account [/api/account]

### Retrieve one account [GET]

+ Response 201 (application/json)

        {
            "userId": 1234,
            "firstName": "John",
            "lastName": "Doe",
            "age": 37,
            "streetAddress": "22Ob Baker Street",
            "city": "London",
            "state": "UK",
            "postalCode": "38400"
        }

### Create a new account [POST]

+ Request (application/json)

        {
            "login": "login@example.com",
            "password": "mySuperSecretPassword"
        }

+ Response 201 (application/json)

    + Headers

            Location: /account/2

    + Body

            {
                "userId" : 2,
                "login": "login@example.com",
                "published_at": "2015-08-05T08:40:51.620Z"
            }

### Update an account [PUT]


+ Request (application/json)

        {
            "firstName": "John",
            "lastName": "Doe",
            "age": 37,
            "streetAddress": "22Ob Baker Street",
            "city": "London",
            "state": "UK",
            "postalCode": "38400"
        }

+ Response 200 (application/json)

    + Headers

            Location: /account/2

    + Body

            {
                "userId" : 2,
                "login": "login@example.com",
                "published_at": "2015-08-05T08:40:51.620Z"
            }

## Subscription  [/api/subscription/{id}]

### Retrieve one subscription [GET]

+ Request (application/json)

+ Response 200 (application/json)

            {
              "id" : 1,
              "topicId" : 1,
              "topicTitle" : "Adhésion année 2015-2016",
              "userId" : 1,
              "description" : "Permet de devenir membre de l'association GrenobleSwing pour l'année 2015-2016",
              "balance": 0,
              "selected": true,
              "yearId": "2015-2016",
              "state": "paid",
              "requiredSubscriptions": [],
              "type":"subscribe"
            }

### Update a subscription [PUT]

+ Request (application/json)

            {
              "id" : 1,
              "topicId" : 1,
              "topicTitle" : "Adhésion année 2015-2016",
              "userId" : 1,
              "description" : "Permet de devenir membre de l'association GrenobleSwing pour l'année 2015-2016",
              "balance": 0,
              "selected": true,
              "yearId": "2015-2016",
              "state": "paid",
              "requiredSubscriptions": [],
              "type":"subscribe"
            }

+ Response 200 (application/json)

### Cancel a subscription [DELETE]

+ Response 204 (application/json)

## Subscriptions  [/api/subscription]

### Retrieve a list of subscriptions [GET]

+ Response 200 (application/json)

        [
            {
              "id" : 1,
              "topicId" : 1,
              "topicTitle" : "Adhésion année 2015-2016",
              "userId" : 1,
              "description" : "Permet de devenir membre de l'association GrenobleSwing pour l'année 2015-2016",
              "balance": 0,
              "selected": true,
              "yearId": "2015-2016",
              "state": "paid",
              "requiredSubscriptions": [],
              "type":"subscribe"
            }, {
              "id" : 2,
              "topicId" : 1,
              "topicTitle" : "Adhésion année 2015-2016",
              "description" : "Permet de devenir membre de l'association GrenobleSwing pour l'année 2015-2016",
              "userId" : 2,
              "balance": 0,
              "selected": true,
              "yearId": "2015-2016",
              "state": "paid",
              "requiredTopicId" : 0,
              "requiredSubscriptions": [],
              "type":"subscribe"
            }, {
              "id" : 3,
              "topicId" :2,
              "topicTitle" : "Adhésion année 2016-2017",
              "description" : "Permet de devenir membre de l'association GrenobleSwing pour l'année 2016-2017",
              "userId" : 2,
              "balance": -10,
              "selected": false,
              "yearId": "2016-2017",
              "state": "unpicked",
              "requiredTopicId" : 0,
              "requiredSubscriptions": [],
              "type":"subscribe"
            }, {
              "id" : 4,
              "topicId" : 3,
              "topicTitle" : "Cours niveau 1 année 2016-2017",
              "description" : "Cours débutant les mercredis, de 20h30 à 21h30, à Danse Théâtre, avec Ludo et Aurore",
              "userId" : 2,
              "balance": -190,
              "selected": false,
              "yearId": "2016-2017",
              "state": "unpicked",
              "requiredTopicId" : 2,
              "requiredSubscriptions": [{
                "id" : 3,
                "topicId" :2,
                "topicTitle" : "Adhésion année 2016-2017"
              }],
              "type":"duet"
            }, {
              "id" : 5,
              "topicId" : 4,
              "topicTitle" : "Cours niveau 2 année 2016-2017",
              "description" : "Cours intermédiaire les mardis, de 21h30 à 22h30, à Studio Soanne, avec X et Y",
              "userId" : 2,
              "balance": -190,
              "selected": false,
              "yearId": "2016-2017",
              "state": "unpicked",
              "requiredTopicId" : 2,
              "type":"duet",
              "requiredSubscriptions": [{
                "id" : 3,
                "topicId" :2,
                "topicTitle" : "Adhésion année 2016-2017"
              }]
            }, {
              "id" : 6,
              "topicId" : 1,
              "topicTitle" : "Adhésion année 2015-2016",
              "description" : "Permet de devenir membre de l'association GrenobleSwing pour l'année 2015-2016",
              "userId" : 1,
              "balance": 0,
              "selected": true,
              "yearId": "2015-2016",
              "state": "paid",
              "requiredSubscriptions": [],
              "type":"subscribe"
            }, {
              "id" : 7,
              "topicId" :2,
              "topicTitle" : "Adhésion année 2016-2017",
              "description" : "Permet de devenir membre de l'association GrenobleSwing pour l'année 2016-2017",
              "userId" : 1,
              "balance": -10,
              "selected": true,
              "yearId": "2016-2017",
              "state": "waiting",
              "type":"subscribe",
              "requiredSubscriptions": []
            }, {
              "id" : 8,
              "topicId" : 3,
              "topicTitle" : "Cours niveau 1 année 2016-2017",
              "description" : "Cours débutant les mercredis, de 20h30 à 21h30, à Danse Théâtre, avec Ludo et Aurore",
              "userId" : 1,
              "balance": -190,
              "selected": true,
              "yearId": "2016-2017",
              "state": "waiting",
              "type":"duet",
              "requiredSubscriptions": [{
                "id" : 7,
                "topicId" :2,
                "topicTitle" : "Adhésion année 2016-2017"
              }]
            }, {
              "id" : 9,
              "topicId" : 4,
              "topicTitle" : "Cours niveau 2 année 2016-2017",
              "description" : "Cours intermédiaire les mardis, de 21h30 à 22h30, à Studio Soanne, avec X et Y",
              "userId" : 1,
              "balance": -190,
              "selected": false,
              "yearId": "2016-2017",
              "state": "unpicked",
              "type":"duet",
              "requiredSubscriptions": [{
                "id" : 7,
                "topicId" :2,
                "topicTitle" : "Adhésion année 2016-2017"
              }]
            }, {
              "id" : 10,
              "topicId" : 4,
              "topicTitle" : "Jazz Root niveau 2 année 2016-2017",
              "description" : "Cours Solo les mardis, de 21h30 à 22h30, à Studio Soanne, avec X",
              "userId" : 1,
              "balance": -190,
              "selected": false,
              "yearId": "2016-2017",
              "state": "unpicked",
              "type":"solo",
              "requiredSubscriptions": [{
                "id" : 7,
                "topicId" :2,
                "topicTitle" : "Adhésion année 2016-2017"
              }]
            }, {
              "id" : 11,
              "topicId" : 4,
              "topicTitle" : "Jazz Root niveau 2 année 2016-2017",
              "description" : "Cours Solo les mardis, de 21h30 à 22h30, à Studio Soanne, avec X",
              "userId" : 2,
              "balance": -190,
              "selected": false,
              "yearId": "2016-2017",
              "state": "unpicked",
              "type":"solo",
              "requiredSubscriptions": [{
                "id" : 3,
                "topicId" :2,
                "topicTitle" : "Adhésion année 2016-2017"
              }]
            }
        ]


### Add a subscription [POST]

+ Request (application/json)

        {
          "topicId" : 3,
          "topicTitle" : "Cours niveau 1 année 2016-2017",
          "description" : "Cours débutant les mercredis, de 20h30 à 21h30, à Danse Théâtre, avec Ludo et Aurore",
          "userId" : 2,
          "balance": -190,
          "selected": false,
          "yearId": "2016-2017",
          "state": "unpicked",
          "requiredTopicId" : 2,
          "requiredSubscriptions": [{
            "id" : 3,
            "topicId" :2,
            "topicTitle" : "Adhésion année 2016-2017"
          }],
          "type":"duet"
        }

+ Response 200 (application/json)

## Topic  [/api/topic/{id}]

### Retrieve one topic [GET]

+ Response 200 (application/json)

        {
          "id" : 1,
          "title" : "Adhésion année 2015-2016",
          "description": "Lorem Ipsum",
          "requiredTopic" : 0,
          "startDate": "",
          "endDate": "",
          "location":"",
          "teachers":"",
          "price": 15,
          "active" : false,
          "type":"adhesion",
          "state": "closed",
          "nestedTopicId": 5
        }

### Update a topic [PUT]

+ Request (application/json)

        {
          "id" : 1,
          "title" : "Adhésion année 2015-2016",
          "description": "Lorem Ipsum",
          "requiredTopic" : 0,
          "startDate": "",
          "endDate": "",
          "location":"",
          "teachers":"",
          "price": 15,
          "active" : false,
          "type":"adhesion",
          "state": "closed",
          "nestedTopicId": 5
        }

+ Response 200 (application/json)

### Delete a topic [DELETE]

+ Response 204 (application/json)

## Topics  [/api/topic]

### Retrieve a list of topics [GET]

+ Response 200 (application/json)

        [{
          "id" : 1,
          "title" : "Adhésion année 2015-2016",
          "description": "Lorem Ipsum",
          "requiredTopic" : 0,
          "startDate": "",
          "endDate": "",
          "location":"",
          "teachers":"",
          "price": 15,
          "active" : false,
          "type":"adhesion",
          "state": "closed",
          "nestedTopicId": 5
        },{
          "id" : 2,
          "title" : "Adhésion année 2016-2017",
          "description": "Lorem Ipsum",
          "requiredTopic" : 0,
          "startDate": "",
          "endDate": "",
          "location":"",
          "teachers":"",
          "price": 10,
          "active" : true,
          "type":"duet",
          "state": "active",
          "nestedTopicId": 6
        }, {
          "id" : 3,
          "title" : "Cours niveau 1 année 2016-2017",
          "description": "Lorem Ipsum",
          "requiredTopic" : 2,
          "startDate": "",
          "endDate": "",
          "location":"Danse Théâtre",
          "teachers": ["X", "Y"],
          "price": 190,
          "active" : true,
          "type":"duet",
          "state": "active",
          "nestedTopicId": 6
        }, {
          "id" : 4,
          "title" : "Cours niveau 2 année 2016-2017",
          "description": "Lorem Ipsum",
          "requiredTopic" : 2,
          "startDate": "",
          "endDate": "",
          "location":"Danse Théâtre",
          "teachers": ["X", "Y"],
          "price": 190,
          "active" : true,
          "type":"duet",
          "state": "active",
          "nestedTopicId": 6
        }, {
          "id" : 4,
          "title" : "Cours Jazz Root 1 année 2016-2017",
          "description": "Lorem Ipsum",
          "requiredTopic" : 2,
          "startDate": "",
          "endDate": "",
          "location":"Les Planches",
          "teachers": ["X"],
          "price": 190,
          "active" : true,
          "type":"solo",
          "state": "active",
          "nestedTopicId": 6
        }]

### Add a topic [POST]

+ Request (application/json)

{
          "id" : 4,
          "title" : "Cours Jazz Root 1 année 2016-2017",
          "description": "Lorem Ipsum",
          "requiredTopic" : 2,
          "startDate": "",
          "endDate": "",
          "location":"Les Planches",
          "teachers": ["X", "Y"],
          "price": 190,
          "active" : true,
          "type":"solo",
          "state": "active",
          "nestedTopicId": 6
        }

+ Response 200 (application/json)

## Year  [/api/year/{id}]

### Retrieve one year [GET]

+ Response 200 (application/json)

            {
              "id" : 5,
              "title" : "Année 2015-2016",
              "description": "Lorem Ipsum",
              "startDate": "2015-09-01",
              "endDate": "2016-08-31",
              "active" : false,
              "parent" : true,
              "state": "closed",
              "type":"year"
            }

### Update a year [PUT]

+ Request (application/json)

+ Response 200 (application/json)

### Delete a year [DELETE]

+ Response 204 (application/json)

## Years  [/api/year]

### Retrieve a list of years [GET]

+ Response 200 (application/json)

        [
            {
              "id" : 5,
              "title" : "Année 2015-2016",
              "description": "Lorem Ipsum",
              "startDate": "2015-09-01",
              "endDate": "2016-08-31",
              "active" : false,
              "parent" : true,
              "state": "closed",
              "type":"year"
            }, {
              "id" : 6,
              "title" : "Année 2016-2017",
              "description": "Lorem Ipsum",
              "startDate": "2016-09-01",
              "endDate": "2017-08-31",
              "active" : true,
              "parent" : true,
              "state": "active",
              "type": "year"
            }
        ]

### Create a year [POST]

+ Request (application/json)

            {
              "title" : "Année 2015-2016",
              "description": "Lorem Ipsum",
              "startDate": "2015-09-01",
              "endDate": "2016-08-31",
              "active" : false,
              "parent" : true,
              "state": "closed",
              "type":"year"
            }

+ Response 200 (application/json)
