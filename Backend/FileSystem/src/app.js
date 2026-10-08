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
            const ext = path.extname(file.originalname)
            cb(null, file.fieldname + '-' + raw.toString('hex')+ ext)
        })
    }
})

const discUpload = multer({storage : storage})

app.post('/disc-upload', discUpload.single('file'), (req, res) => {
    ApiResponse.ok(res, 'file uploaded success fully', req.file.originalname)

})





app.use('/api/auth', authRoute);

export default app;