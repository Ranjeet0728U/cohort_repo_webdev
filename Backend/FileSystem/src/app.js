import cookieParser from 'cookie-parser';
import express from 'express';
import multer from 'multer';
import fs from 'node:fs'
import path from 'node:path';
import crypto from 'crypto';
import authRoute from './module/auth/auth.routes.js'
import ApiResponse from './common/utils/api-respons.js';

const app = express();
app.use(express.json())


app.use(express.urlencoded({extended : true}))
app.use(cookieParser());

const upload = multer();

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
    const filename = path.basename(req.file.originalname).name;
    const ext = path.parse(req.file.originalname).ext
    fs.writeFileSync(`${filename}${ext}`, req.file.buffer)

    ApiResponse.ok(res, 'file uploaded successfully', res.file)

})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = './src/module/file-upload';
        fs.mkdir( uploadPath,{recursive : true}, (err) => {
            if(err)console.log(err)
            
        })
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(16, function (err, raw) {
            if (err) return cb(err)
            const fileName = path.parse(file.originalname).name
            const ext = path.extname(file.originalname)
            cb(null, fileName + '-' + raw.toString('hex')+ ext)
        })
    }
})

const discUpload = multer({storage : storage})

app.post('/disc-upload', discUpload.single('file'), (req, res) => { // to upload single document in storage
    ApiResponse.ok(res, 'file uploaded success fully', req.file.originalname)

})

app.post('/disc-uploads', discUpload.array('photo'), (req,res) => {// to upload multiple same type documents
    ApiResponse.ok(res, 'files uploaded successFully', req.files.originalname);
})

app.post('/disc-files', // to upload multiple type document 
    discUpload.fields([
        {name : 'file', maxCount : 2},
        {name : 'photo', maxCount : 2}
    ]), 
    (req, res) => {
    ApiResponse.ok(res, 'files Uploaded successfully', req.files.filename);
})

const LimitingUpload = multer({
    storage : storage,
    limits : {
        fileSize : 1024 * 1024 * 2
    }
})

app.post('/disc-limit', LimitingUpload.single('file'), (req, res) => { // uploaded with limiting file size
    ApiResponse.ok(res, 'file uploaded', req.file.originalname);
    console.log(req.file.originalname)
})




app.use('/api/auth', authRoute);

export default app;