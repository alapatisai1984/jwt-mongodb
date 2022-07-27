const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const Stream = db.stream;
const Types = db.types;

db.mongoose
  .connect(`mongodb://database:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to sai application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/subjects.routes")(app);
require("./app/routes/training.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
  Stream.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Stream({
        name: "Science"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Science' to Stream collection");
      });

      new Stream({
        name: "Arts"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Arts' to Stream collection");
      });

      new Stream({
        name: "Commerce"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Commerce' to Stream collection");
      });
    }
  });
  Types.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Types({
        name: "Basic"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Basic' to Type collection");
      });
      new Types({
        name: "Detailed"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'Detailed' to Type collection");
      });
    }
  });
}
