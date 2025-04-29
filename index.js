var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Configuración del storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/'); // Carpeta donde se guardarán los archivos
  },
  /*filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // nombre único
  }*/
});

// Inicialización de multer
const upload = multer({ storage: storage });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  const file = req.file; // Assuming you're using a middleware like multer to handle file uploads
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileInfo = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  };
  res.json(fileInfo);
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
