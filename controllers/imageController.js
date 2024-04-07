const { File } = require("../models/file")
const CreateError = require("../utils/error")

//  **********    Single Upload Controller    *****************

function uploadSingleImage() {

    return async (req, res, next) => {

        if (!req.file) {
            res.status(400).send("Please Upload a file")
            return
        }

        const fileObj = {
            name: req.file.originalname,
            path: req.file.path
        }

        // console.log(req)

        try {
            let file = await File.create(fileObj)

            res.status(200).json({
                downloadPath: `http://localhost:8000/${file._id}`,
                filename: file.name
            })

            //  * This is the url for get request for downloading image.
        }
        catch (error) {
            next(CreateError('500', 'Oops! Something Wrong. Try again Later'))
        }
    }
}


function downloadSingleImage() {

    return async (req, res, next) => {
        try {
            const file = await File.findById(req.params.id)
            file.downloadContent++
            await file.save()

            res.download(file.path, file.name)

            res.status(200)
        }
        catch (error) {
            next(CreateError('404', "The Requested File doesn't exist anymore"))
        }
    }
}


//  **********    Multiple Upload Controller    *****************


function uploadMultipleImages() {

    return async (req, res, next) => {

        if (!req.files) {
            res.status(400).send("Please Upload Files")
            return
        }


        let FileList = req.files.map((item) => {
            let fileObj = {
                name: item.originalname,
                path: item.path
            }

            return fileObj

        })


        let DownloadUrlList = []

        try {
            let file = await File.create(FileList)

            for (let i = 0; i <= file.length - 1; i++) {
                DownloadUrlList.push({ downloadPath: `http://localhost:8000/${file[i]._id}` })
            }

            // console.log('LinksList', DownloadUrlList)
            res.status(200).json(DownloadUrlList)

        }
        catch (error) {
            next(CreateError('500', 'Oops! Something Wrong. Try again Later'))
        }
    }
}



function deleteImage() {
    return async (req, res, next) => {
        try {
            const FileId = req.params.id
            // console.log('Id' , FileId)
            const file = await File.findByIdAndDelete(FileId)

            res.status(200).send('File has been Deleted')
        }
        catch (error) {
            next(error)
        }
    }
}



function updateImage(){
    return async(req,res,next) => {
        try{
            const FileId = req.params.id
            const filetoUpdate = await File.findById(FileId)
            if (!filetoUpdate){
                res.status(404).send('File does not exist')
                return
            }

            filetoUpdate.name = req.file.originalname
            filetoUpdate.path = req.file.path

            await filetoUpdate.save()

            res.status(200).json({
                downloadPath: `http://localhost:8000/${filetoUpdate._id}`,
                filename: filetoUpdate.name
            })

        }
        catch(error){
            next(error)
        }
    }
}



function latestFiles(){
    // console.log('Latest')
    return async(req,res,next) => {
        try{
            //  * The _id have the date stamp in it hence used it for sorting 
            //  * createdAt timestamp: Can also be used
            const latestdocs = await File.find().sort({_id: -1}).limit(5)
            res.status(200).json(latestdocs)
        }
        catch(error){
            next(error)
        }

    }
}





module.exports.uploadSingleImage = uploadSingleImage
module.exports.downloadSingleImage = downloadSingleImage

module.exports.uploadMultipleImages = uploadMultipleImages
module.exports.deleteImage = deleteImage
module.exports.updateImage = updateImage
module.exports.latestFiles = latestFiles