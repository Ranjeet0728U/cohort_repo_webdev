import express from 'express';
import type { Application } from 'express';

export function createServerApplication() : Application{
    const app = express();
    app.get('/' , function (req, res){
        return res.json({massage : 'hello ji or sb'});
    })
    app.get('/hello' , function (req, res){
        return res.json({massage : 'hello ji ky hal chal'});
        
    })
    return app;
}