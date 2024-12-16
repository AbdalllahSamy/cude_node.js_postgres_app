const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const cartRoutes = require('./routes/cartRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const equipmentOrderRoutes = require('./routes/equipmentOrderRoutes');




const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/suppliers', supplierRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/equipments', equipmentRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/ratings', ratingRoutes);
app.use('/api/v1/equipment-orders', equipmentOrderRoutes);





// Sync Database
sequelize.sync({ alter: true })
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Database sync failed:', err));

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
