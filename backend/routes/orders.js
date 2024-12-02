const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Obtener los pedidos de un usuario
router.get('/:usuario_id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM pedidos WHERE usuario_id = ?', [req.params.usuario_id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
});


module.exports = router;