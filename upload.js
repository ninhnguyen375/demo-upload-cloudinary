const express = require('express');
const app = express();
const bp = require('body-parser');
const cors = require('cors');

app.use(bp.json());
app.use(cors());

const fu = require('express-fileupload');
const cloudinary = require('cloudinary');

app.use(fu());
app.post('/upload/image', (req, res) => {
  const options = {
    cloud_name: 'ninhnguyen375',
    folder: 'test2',
    api_key: '163814719362987',
    api_secret: '5jDJ9Ugnnhsr-CBAuPJ5xK_JW0s',
  };

  cloudinary.v2.uploader
    .upload_stream(options, (err, result) => {
      if (err) res.send({ err });
      else res.send({ result });
    })
    .end(req.files.image.data);
});
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('./public/upload.html', { root: __dirname });
});

app.listen(process.env.PORT || 3000);
