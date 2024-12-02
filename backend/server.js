const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./config/database"); 

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
const productosRoutes = require('./routes/products');
const usuariosRoutes = require('./routes/users');
const carritoRoutes = require('./routes/car');
const pedidosRoutes = require('./routes/orders');
const detallesPedidoRoutes = require('./routes/datails_orders');

app.use('/api/products', productosRoutes);
app.use('/api/users', usuariosRoutes);
app.use('/api/car', carritoRoutes);
app.use('/api/orders', pedidosRoutes);
app.use('/api/details_orders', detallesPedidoRoutes);



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
