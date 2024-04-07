const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload



  //  &  ---------------    NodeJS Upload Best Practice     ----------------------   

  //  * https://medium.com/@ali.r.riahi/nodejs-upload-best-practice-976062a267ba    :    IMP

  //  *  Points Covered in the article :   
                                // ! 1>>  Configure Multer 
                                // ! 2>>  Set File Size Limits
                                // ! 3>>  Validate File Types

 