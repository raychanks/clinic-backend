import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('GET /consultations');
});


router.get('/:id', (req, res) => {
  const { id } = req.params;

  res.send(`GET /consultations/${id}`);
});


router.post('/', (req, res) => {
  res.send('POST /consultations');
});

export default router;
