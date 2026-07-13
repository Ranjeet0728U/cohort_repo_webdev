import http from 'node:http'
import { env } from './env'
import {createServerApplication} from './app/index'
async function  main(){
    try{
        const server = http.createServer(createServerApplication());
        const PORT : number = env.PORT ? +env.PORT : 8080;
        server.listen(PORT ,() =>{
            console.log(`http://localhost:${PORT}`);
        })

    }catch(err){
        console.log(err);
    }
}

main();
