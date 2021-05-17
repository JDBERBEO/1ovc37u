const express = require("express");
const mongoose = require("mongoose");
const Note = require("./models/Note");
const path = require('path');
const md = require('marked');
const pageViewMid = require('./pageViewMid')
const PageView = require('./models/PageView')

const app = express();

//database connection
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/notes', { useNewUrlParser: true });

//setting Pug Engine
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));


//routes and controllers
app.get("/", pageViewMid, async (req, res) => {
  const notes = await Note.find();
  res.render("index",{ notes: notes } )
});

app.get("/notes/new", pageViewMid, async (req, res) => {
  const notes = await Note.find();
  res.render("new", { notes: notes });
});

app.post("/notes", async (req, res, next) => {
  const data = {
    title: req.body.title,
    body: req.body.body
  };

  const note = new Note(req.body);
  try {
    await note.save();
  } catch (e) {
    return next(e);
  }

  res.redirect('/');
});

app.get("/notes/:id", pageViewMid, async (req, res) => {
  const notes = await Note.find();
  const note = await Note.findById(req.params.id);
  res.render("show", { notes: notes, currentNote: note, md: md });
});

app.get("/notes/:id/edit", pageViewMid, async (req, res, next) => {
  const notes = await Note.find();
  const note = await Note.findById(req.params.id);
  res.render("edit", { notes: notes, currentNote: note });
});

app.patch("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const note = await Note.findById(id);

  note.title = req.body.title;
  note.body = req.body.body;

  try {
    await note.save();
  } catch (e) {
    return next(e);
  }

  res.status(204).send({});
});

app.delete("/notes/:id", async (req, res) => {
  await Note.deleteOne({ _id: req.params.id });
  res.status(204).send({});
});

app.get("/analytics", async (req, res) => {
  let pageViews = await PageView.find().lean()

  pageViews = pageViews.sort(function(a, b) {
    let keyA = a.count
    let keyB = b.count;

    console.log('esto es keyA: ', keyA)
    console.log('esto es keyB: ', keyB)
    // Compare the 2 dates
    if (keyA > keyB) return -1;
    if (keyA < keyB) return 1;
    return 0;
  });

  console.log('pagewvies desde app: ', pageViews)
  res.render('analytics', {pageViews})
})

app.listen(3000, () => console.log("Listening on port 3000 ..."));
