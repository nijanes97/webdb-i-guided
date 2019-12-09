const express = require("express");

// database access using knex
const knex = require("../data/db-config.js"); // <<< renamed to knex from db

const router = express.Router();

// return a list of posts from the database
router.get("/", (req, res) => {
  // select * from posts
  knex
    .select("*")
    .from("posts")
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error getting the posts" });
    });
});

router.get("/:id", (req, res) => {
  // select * from posts where id = req.params.id
  knex
    .select("*")
    .from("posts")
    // .where("id", "=", req.params.id)
    .where({ id: req.params.id })
    .first() // equivalent to posts[0]
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error getting the post" });
    });
});

router.post("/", (req, res) => {
  // insert into () values ()
  const postData = req.body;

  // please validate postData before calling the database
  // knex.insert(postData).into('posts')
  // second argument "id") will show a warning on console when using SQLite
  // it's there for the future (when we move to MySQL or Postgres)
  knex("posts")
    .insert(postData, "id")
    .then(ids => {
      // returns and array of one element, the id of the last record inserted
      const id = ids[0];

      return knex("posts")
        .select("id", "title", "contents")
        .where({ id })
        .first()
        .then(post => {
          res.status(201).json(post);
        });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error adding the post"
      });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  // validate the data
  knex("posts")
    .where({ id }) // ALWAYS FILTER ON UPDATE (AND DELETE)
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} record(s) updated` });
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error updating the post"
      });
    });
});

router.delete("/:id", (req, res) => {
  knex("posts")
    .where({ id: req.params.id }) // ALWAYS FILTER ON UPDATE (AND DELETE)
    .del()
    .then(count => {
      res.status(200).json({ message: `${count} record(s) removed` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        errorMessage: "Error removing the post"
      });
    });
});

module.exports = router;