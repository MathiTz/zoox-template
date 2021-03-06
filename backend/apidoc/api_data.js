define({ "api": [
  {
    "type": "Post",
    "url": "/cities/",
    "title": "Request City Creation",
    "name": "createCity",
    "group": "Cities",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of city</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "stateId",
            "description": "<p>Id of state selected</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Could",
            "description": "<p>not create city.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Server Error\n{\n  \"error\": \"Name not provided\"\n}\n\nHTTP/1.1 400 Server Error\n{\n  \"error\": \"State not provided\"\n}\n\nHTTP/1.1 400 Server Error\n{\n  \"error\": \"City with same name already created\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/city-controller.js",
    "groupTitle": "Cities"
  },
  {
    "type": "Delete",
    "url": "/cities/:name",
    "title": "Request City Delete",
    "name": "deleteCity",
    "group": "Cities",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of city</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Could",
            "description": "<p>not delete city.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\nHTTP/1.1 400 Server Error\n{\n  \"error\": \"Could not find city within the name\"\n}\n\nHTTP/1.1 400 Server Error\n{\n  \"error\": \"Name not provided\"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/city-controller.js",
    "groupTitle": "Cities"
  },
  {
    "type": "get",
    "url": "/cities/",
    "title": "Request All Cities information",
    "name": "getCities",
    "group": "Cities",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>City id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>City Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stateId",
            "description": "<p>State Id related to City</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n [\n  {\n   \"_id\": \"ObjectId\",\n   \"name\": \"Example\",\n   \"stateId\": [ _id, name, abbreviation ]\n },\n {\n   \"_id\": \"ObjectId\",\n   \"name\": \"Example\",\n   \"stateId\": [ _id, name, abbreviation ]\n }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CallError",
            "description": "<p>Api Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"Internal Error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/city-controller.js",
    "groupTitle": "Cities"
  },
  {
    "type": "get",
    "url": "/cities/:name",
    "title": "Request City information",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "name",
            "optional": false,
            "field": "Name",
            "description": "<p>of city</p>"
          }
        ]
      }
    },
    "name": "getCity",
    "group": "Cities",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>City id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>City Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stateId",
            "description": "<p>State Id related to City</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"ObjectId\",\n  \"name\": \"Example\",\n  \"stateId\": [ _id, name, abbreviation ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not",
            "description": "<p>found city.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Server Error\n{\n  \"error\": \"Couldnt find city\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/city-controller.js",
    "groupTitle": "Cities"
  },
  {
    "type": "Put",
    "url": "/cities/:name",
    "title": "Request City Update",
    "name": "updateCity",
    "group": "Cities",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of city</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "stateId",
            "description": "<p>Id of state selected</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Could",
            "description": "<p>not update city.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 400 Server Error\n {\n   \"error\": \"Name not provided\"\n }\n\n HTTP/1.1 400 Server Error\n {\n   \"error\": \"City already created\"\n }\n\nHTTP/1.1 304 Server Error\n {\n   \"error\": \"Not modified\"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/city-controller.js",
    "groupTitle": "Cities"
  },
  {
    "type": "Post",
    "url": "/states/",
    "title": "Request State Creation",
    "name": "createState",
    "group": "States",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of state</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "abbreviation",
            "description": "<p>Abbreviation of state</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Could",
            "description": "<p>not create State.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Server Error\n{\n  \"error\": \"Name not provided\"\n}\n\nHTTP/1.1 400 Server Error\n{\n  \"error\": \"Abbreviation not provided\"\n}\n\nHTTP/1.1 400 Server Error\n{\n  \"error\": \"State with same name already created\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/state-controller.js",
    "groupTitle": "States"
  },
  {
    "type": "Delete",
    "url": "/cities/:abbr",
    "title": "Request State Delete",
    "name": "deleteState",
    "group": "States",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "abbr",
            "description": "<p>Abbreviation of state</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Could",
            "description": "<p>not delete state.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\nHTTP/1.1 400 Server Error\n{\n  \"error\": \"Could not find state within the name\"\n}\n\nHTTP/1.1 400 Server Error\n{\n  \"error\": \"Name not provided\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/state-controller.js",
    "groupTitle": "States"
  },
  {
    "type": "get",
    "url": "/:abbr/cities",
    "title": "Request Cities within the same state",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "name",
            "optional": false,
            "field": "Abbreviation",
            "description": "<p>of state</p>"
          }
        ]
      }
    },
    "name": "getAllCitiesWithinState",
    "group": "States",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>City id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>City Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stateId",
            "description": "<p>State Id related to City</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"ObjectId\",\n  \"name\": \"Example\",\n  \"stateId\": [ _id, name, abbreviation ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not",
            "description": "<p>found city.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"Internal Error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/state-controller.js",
    "groupTitle": "States"
  },
  {
    "type": "get",
    "url": "/states/",
    "title": "Request All States information",
    "name": "getState",
    "group": "States",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>State id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>State Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Abbreviation",
            "description": "<p>State Abbreviation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    [\n{\n   \"_id\": \"5fac3ea79641030a9b8e6e1f\",\n    \"name\": \"Ceará\",\n    \"abbreviation\": \"CE\"\n  },\n  {\n    \"_id\": \"5fac3f339641030a9b8e6e21\",\n    \"name\": \"Rio de Janeiro\",\n    \"abbreviation\": \"RJ\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "CallError",
            "description": "<p>Api Error.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Server Error\n{\n  \"error\": \"Internal Error\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/state-controller.js",
    "groupTitle": "States"
  },
  {
    "type": "get",
    "url": "/state/:abbr",
    "title": "Request State information",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "Abbreviation",
            "description": "<p>of State</p>"
          }
        ]
      }
    },
    "name": "getState",
    "group": "States",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "ObjectId",
            "optional": false,
            "field": "_id",
            "description": "<p>State id</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>State Name</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Abbreviation",
            "description": "<p>State Id related to State</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"_id\": \"ObjectId\",\n  \"name\": \"Example\",\n  \"Abbreviation\": \"EX\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Not",
            "description": "<p>found state.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Server Error\n{\n  \"error\": \"Couldnt find state\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/state-controller.js",
    "groupTitle": "States"
  },
  {
    "type": "Put",
    "url": "/cities/:abbr",
    "title": "Request State Update",
    "name": "updateState",
    "group": "States",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of State</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "abbreviation",
            "description": "<p>Abbreviation state selected</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Could",
            "description": "<p>not update city.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": " HTTP/1.1 400 Server Error\n {\n   \"error\": \"Name not provided\"\n }\n\n HTTP/1.1 400 Server Error\n {\n   \"error\": \"Abbreviation not provided\"\n }\n\n HTTP/1.1 400 Server Error\n {\n   \"error\": \"State with same abbreviation already created\"\n }\n\n HTTP/1.1 400 Server Error\n {\n   \"error\": \"State with same name already created\"\n }\n\nHTTP/1.1 304 Server Error\n {\n   \"error\": \"Not modified\"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "src/controllers/state-controller.js",
    "groupTitle": "States"
  }
] });
