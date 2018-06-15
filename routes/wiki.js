const express = require('express');
const router = express.Router();
const {addPage} = require('../views');
const { Page } = require("../models");

router.get('/', async (req, res, next) => {
  console.log('hitting wiki route');
  // res.send('test wiki');
  res.redirect('/');
});

router.post('/', async (req, res, next) => {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });

  function makeSlug(str) {
    let regex = /[^A-Za-z0-9-]+/
    str.replace(regex, '_');
  }

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }


  // res.json(req.body);
});

router.get('/add', async (req, res, next) => {
  console.log();
  res.send(addPage());
});

module.exports = router;
