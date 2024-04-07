
const express = require('express')
const router = express.Router()
const {
  uploadSingleImage , 
  downloadSingleImage,
  uploadMultipleImages,
  deleteImage,
  updateImage,
  latestFiles
} = require('../controllers/imageController')
const upload = require('../utils/upload')




router.post("/singleupload" , upload.single('Singlefile') , uploadSingleImage())

router.post("/multipleupload" , upload.array('MultipleFiles' , 3) , uploadMultipleImages())

router.get("/:id" , downloadSingleImage())

router.delete("/:id" , deleteImage())

router.put("/:id" , upload.single('Singlefile') , updateImage())

router.get("/latest/docs" , latestFiles())



module.exports = router