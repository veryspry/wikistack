const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
  console.log('hitting users route');
  res.send('test users');
});


module.exports = router;
