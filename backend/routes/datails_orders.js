const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Obtener los detalles de un pedido
router.get('/:pedido_id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM detalles_pedido WHERE pedido_id = ?', [req.params.pedido_id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los detalles del pedido' });
  }
});

module.exports = router;