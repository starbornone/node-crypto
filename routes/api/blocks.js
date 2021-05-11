const express = require('express');
const router = express.Router();

/**
 * @route         GET api
 * @description   Base api route.
 * @access        Public
 */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'node-crypto' });
});

/**
 * @route         GET api/blocks
 * @description   ...
 * @access        Public
 */
router.get('/blocks', function (req, res, next) {
  res.json(res.locals.blockchain.chain);
});

/**
 * @route         GET api/blocks/length
 * @description   ...
 * @access        Public
 */
router.get('/blocks/length', (req, res) => {
  res.json(res.locals.blockchain.chain.length);
});

/**
 * @route         GET blocks/:id
 * @description   ...
 * @access        Public
 */
router.get('/blocks/:id', (req, res) => {
  const { id } = req.params;
  const { length } = res.locals.blockchain.chain;

  const blocksReversed = res.locals.blockchain.chain.slice().reverse();

  let startIndex = (id - 1) * 5;
  let endIndex = id * 5;

  startIndex = startIndex < length ? startIndex : length;
  endIndex = endIndex < length ? endIndex : length;

  res.json(blocksReversed.slice(startIndex, endIndex));
});

/**
 * @route         GET api/mine
 * @description   ...
 * @access        Public
 */
router.post('/mine', (req, res) => {
  const { data } = req.body;
  res.locals.blockchain.addBlock({ data });
  // pubsub.broadcastChain();
  res.redirect('/api/blocks');
});

module.exports = router;
