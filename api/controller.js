const express = require('express');

const router = express.Router();

const { middleware } = require('../middleware');

router.post('/', middleware, async (req, res) => {
  try {
    const insert = await service.insert(parameters);
    if (insert) {
      res.status(201).send(insert);
    } else {
      res.status(400).json({ error: 'ERROR_MESSAGE' });
    }
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.put('/', middleware, async (req, res) => {
  try {
    const update = await service.update(parameters);
    if (update) {
      res.status(200).send(update);
    } else {
      res.status(404).send({ error: 'ERROR_MESSAGE' });
    }
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.get('/:id', middleware, async (req, res) => {
  if (req.params.id) {
    try {
      const getById = await service.getOneById(req.params.id + parameters);
      if (getById) {
        res.status(200).send(getById);
      } else {
        res.status(404).send({ error: 'ERROR_MESSAGE' });
      }
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  } else {
    res.status(400).send({ error: 'NO_ID' });
  }
});

router.get('/', middleware, async (req, res) => {
  try {
    const all = await service.getAll();
    if (all) {
      res.status(200).send(all);
    } else {
      res.status(404).send({ error: 'ERROR_MESSAGE' });
    }
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

router.delete('/:id', middleware, async (req, res) => {
  if (req.params.id) {
    try {
      const removed = await service.softDelete(req.params.id);
      if (removed) {
        res.status(200).send(removed);
      } else {
        res.status(404).send({ error: 'ERROR_MESSAGE' });
      }
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  } else {
    res.status(400).send({ error: paramsMessages.noId });
  }
});

module.exports = router;
