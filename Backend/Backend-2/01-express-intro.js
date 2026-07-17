import express from 'express';

function block_01_basicServer(){
    return new Promise((resolve) =>{
        const app = express();
        
        console.log('+++++++++++++++++++++++++++++++++++++++');
        console.log(app);            
        console.log('+++++++++++++++++++++++++++++++++++++++');
        app.use(express.json());

        app.get('/menu',(req,res) =>{
            res.json({
                items : ['thali','biryani'],
            });
        });

        app.get('/search', (req,res) => {
            const {q , limit} = req.query;
            res.json({
                query : q,
                limit : limit || '10',
            });
        });

        app.get('/menu/:id', (req, res) => {
            const {id} = req.params;
            res.json({
                items : id,
                price : 149,
            });
        });

        app.post('/order', (req, res) => {
            const order = req.body;
            res.status(201).json({
                status : 'created',
                order : order,
            })
        });

        const server = app.listen(0, async() => {
            console.log('+++++++++++++++++++++++++++++++++++++++');
            console.log(server);            
            console.log('+++++++++++++++++++++++++++++++++++++++');
            const port = server.address().port;
            const base = `http://127.0.0.1:${port}`;
            try{
                const menuRes = await fetch(`${base}/menu`);
                const menuData = await menuRes.json();
                console.log('GET / menu :', JSON.stringify(menuData));
                
                const searchRes = await fetch(`${base}/search?q=biryani&limit=5`);
                const searchData = await searchRes.json();
                console.log('GET / search : ', JSON.stringify(searchData));
                console.log('+++++++++++++++++++++++++++++++++++++++');
                
                const menuItems = await fetch(`${base}/menu/42`);
                const menuItemsData = await menuItems.json();
                console.log('GET / search : ', JSON.stringify(menuItemsData));
                console.log('+++++++++++++++++++++++++++++++++++++++');
                

                const orderRes = await fetch(`${base}/order`,{
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                    body : JSON.stringify({
                        dish : 'biryani',
                        quantity : 2,
                    })
                    
                })
                const orderData = await orderRes.json();
                console.log('POST/order',JSON.stringify(orderData));

            }catch(err){
                console.log('error is ', err);
            }finally{
                server.close(() =>{
                    console.log('block server');
                    resolve();
                });
            }
        })
    })
}

function block_02_response(){
    return new Promise((resolve) =>{
        const app = express();

        app.get('/text',(req,res) =>{
            res.send("hello from chaiCode");
        });

        app.get('/json',(req,res) =>{
            res.json({
                framework : 'express',
                version : '2.0.1'
            })
        });

        app.get('/not-found',(req,res) =>{
            res.status(404).json({
                error : "request not found",
            })
        });

        app.get('/health',(req,res) =>{
            res.sendStatus(201);
        })

        app.get('/new-menu',(req,res) =>{
            res.send('<p>Hello mitra</p> <h1> Kya hal chal hai</h1>');
            res.json({
                body : "check it",
                massage : 'redirected here'
            })
        })

        app.get('/old-menu', (req,res) =>{
            res.redirect(301,'/new-menu');
        });

        app.get('/xml',(req,res) =>{
            res.type('application/xml').send('<food><name>Biryani</name></food>')
        })

        app.get('/custom-header', (req,res) =>{
            res.set('X-Powered-By','Ranjeet');
            res.set('X-Res-Id', '2014');

            res.json({
                massage : 'header set',
            });
        });

        app.get('/no-content',(req,res) =>{
            res.status(204).end();
        })

        const port = 3000;

        const server = app.listen(port, async() =>{
            const port = server.address().port;
            console.log(`http://localhost:${port}`);
            
        })
    })
    

}

async function main() {
    await block_01_basicServer();
    block_02_response();

}

main();