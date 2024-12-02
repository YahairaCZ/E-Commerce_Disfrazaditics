const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Obtener el carrito de un usuario
router.get('/:usuario_id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM carrito WHERE usuario_id = ?', [req.params.usuario_id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// Agregar un producto al carrito
router.post('/', async (req, res) => {
  try {
    const { usuario_id, producto_id, cantidad } = req.body;
    const result = await pool.query(
      'INSERT INTO carrito (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)',
      [usuario_id, producto_id, cantidad]
    );
    res.status(201).json({ id: result[0].insertId, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al agregar al carrito' });
  }
});
module.exports = router;