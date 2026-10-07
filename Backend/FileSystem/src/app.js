import cookieParser from 'cookie-parser';
import express from 'express';
import multer from 'multer';
import fs from 'node:fs'
import path from 'node:path';
import authRoute from './module/auth/auth.routes.js'
import ApiResponse from './common/utils/api-respons.js';

const app = express();
app.use(express.json())
const upload = multer();

app.use(express.urlencoded({extended : true}))
app.use(cookieParser());

app.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
    const filename = path.basename(req.file.originalname).name;
    const ext = path.parse(req.file.originalname).ext
    fs.writeFileSync(`${filename}${ext}`, req.file.buffer)

    ApiResponse.ok(res, 'file uploaded successfully', res.file)

})

app.use('/api/auth', authRoute);

export default app;