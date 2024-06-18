const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Import routes
const adminRoutes = require('./routes/admin');
const dosenRoutes = require('./routes/dosen');
const formPenilaianRoutes = require('./routes/formPenilaian');
const penilaianRoutes = require('./routes/penilaian');
const mataKuliahRoutes = require('./routes/mataKuliah');
const mahasiswaRoutes = require('./routes/mahasiswa');

// Use routes
app.use('/admins', adminRoutes);
app.use('/dosens', dosenRoutes);
app.use('/formPenilaians', formPenilaianRoutes);
app.use('/penilaians', penilaianRoutes);
app.use('/mataKuliahs', mataKuliahRoutes);
app.use('/mahasiswas', mahasiswaRoutes);

// Connect to the database
sequelize.sync()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
