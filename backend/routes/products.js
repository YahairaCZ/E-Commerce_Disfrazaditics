const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM productos');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Crear un producto
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, imagen, categoria } = req.body;
    const result = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, stock, imagen, categoria) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, descripcion, precio, stock, imagen, categoria]
    );
    res.status(201).json({ id: result[0].insertId, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, imagen, categoria } = req.body;
    const result = await pool.query(
      'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ?, categoria = ? WHERE id = ?',
      [nombre, descripcion, precio, stock, imagen, categoria, req.params.id]
    );
    if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ id: req.params.id, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
    if (result[0].affectedRows === 0) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

module.exports = router;

