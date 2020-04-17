var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var path = require("path");
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";
var STUDENT_COLLECTION = "Student";
var COURSE_COLLECTION = "Course";
var ENROLLMENT_COLLECTION = "Enrollment";

var app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/dist/studentEnrollment'));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// CONTACTS API ROUTES BELOW
// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
  }

  app.get('/', function(req,res) {
    
    res.sendFile(path.join(__dirname+'/dist/studentEnrollment/index.html'));
    });
// app.get('/', function(req, res) {
//     res.sendFile(path.resolve('src\app\app.component.html'));
//   }
// );

	// app.get("/", function(req, res){
  //   res.render(
  //     ViewNameLookup.SignIn,
  //     <app-root>);
  // });
  
  app.get("/api/students", function(req, res) {
    db.collection(STUDENT_COLLECTION).find({}).toArray(function(err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get students.");
      } else {
        res.status(200).json(docs);
      }
    });
  });
  
  app.post("/api/students", function(req, res) {
    var newStudent = req.body;
    newStudent.createDate = new Date();
  
    if (!req.body.StudentId) {
      handleError(res, "Invalid user input", "Must provide a student Id.", 400);
    } else {
      db.collection(STUDENTS_COLLECTION).insertOne(newStudent, function(err, doc) {
        if (err) {
          handleError(res, err.message, "Failed to create new student.");
        } else {
          res.status(201).json(doc.ops[0]);
        }
      });
    }
  });
  
  /*  "/api/contacts/:id"
   *    GET: find contact by id
   *    PUT: update contact by id
   *    DELETE: deletes contact by id
   */
  
  app.get("/api/contacts/:id", function(req, res) {
    db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to get contact");
      } else {
        res.status(200).json(doc);
      }
    });
  });
  
  app.put("/api/contacts/:id", function(req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;
  
    db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to update contact");
      } else {
        updateDoc._id = req.params.id;
        res.status(200).json(updateDoc);
      }
    });
  });
  
  app.delete("/api/contacts/:id", function(req, res) {
    db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
      if (err) {
        handleError(res, err.message, "Failed to delete contact");
      } else {
        res.status(200).json(req.params.id);
      }
    });
  });