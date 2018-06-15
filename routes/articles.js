const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
  console.log('hitting articles route');
  res.send('test');
});


module.exports = router;
