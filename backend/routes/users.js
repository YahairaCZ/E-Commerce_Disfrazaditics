const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Crear un usuario
router.post('/', async (req, res) => {
  try {
    const { nombre, correo, contrasena, direccion } = req.body;
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, correo, contrasena, direccion) VALUES (?, ?, ?, ?)',
      [nombre, correo, contrasena, direccion]
    );
    res.status(201).json({ id: result[0].insertId, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});


module.exports = router;