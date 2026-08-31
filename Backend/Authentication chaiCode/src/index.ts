import { createServer } from 'node:http'
import { createApplication } from './app/index.js'

async function main() {
    try{
        const server = createServer(createApplication())
        const PORT = 8080

        server.listen(PORT, () => {
            console.log(`running at http://localhost:${PORT}`)
        })
    }catch(err){
        console.log("error");
    }
}
main()