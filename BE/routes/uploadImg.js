const router = require('express').Router();
const cloudinary = require('cloudinary');
const auth = require('../middleware/auth');
const authAmin = require('../middleware/authAdmin');
const fs = require('fs');
cloudinary.config({
  cloud_name: process.env.COULD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
// upload image only admin can use

// router.post('/upload',   (req, res) => remove auth
router.post('/upload', auth, authAmin, (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: 'Please select a file' });

    const { file } = req.files;

    if (file.size > 1024 * 1024 * 5) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ msg: 'Please select a smaller file' });
    }

    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath);

      return res.status(400).json({ msg: 'Please select image file' });
    }

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: 'ecommerce',
      },
      async (err, result) => {
        if (err) throw err;
        removeTmp(file.tempFilePath);

        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

// Delete image
router.post('/destroy', auth, authAmin, (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id)
      return res.status(404).json({ msg: 'Please select an image' });

    cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
      if (err) throw err;

      res.json({ msg: 'The image has been deleted' });
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

// helper
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

module.exports = router;
