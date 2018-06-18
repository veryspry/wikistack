const express = require('express');
const router = express.Router();
const { addPage, main, editPage, wikiPage } = require('../views');
// const { Page } = require("../models");
const models = require('../models');
const Page = models.Page;
const User = models.Page;

// /wiki
router.get('/', async (req, res, next) => {
  console.log('hitting wiki route');
  res.send('/wiki route');
  // res.redirect('/');
});

// /wiki
router.post("/", async (req, res, next) => {
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    });

    const page = await Page.create(req.body);

    page.setAuthor(user);

    res.redirect("/wiki/" + page.slug);
  } catch (error) { next(error) }
});

// router.post('/', async (req, res, next) => {
//
//   console.log(req.body);
//
//   const page = new Page({
//     title: req.body.title,
//     content: req.body.content
//   });
//
//   // make sure we only redirect *after* our save is complete!
//   // note: `.save` returns a promise.
//   try {
//     await page.save();
//     res.redirect('/');
//   } catch (error) {
//     next(error)
//   }
//   // res.json(req.body);
// });

router.get('/add', async (req, res, next) => {
  res.send(addPage());
});

// router.post('/add', async (req, res, next) => {
//
// });

module.exports = router;
