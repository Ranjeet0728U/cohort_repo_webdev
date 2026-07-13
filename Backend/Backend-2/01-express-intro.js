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

async function main() {
    await block_01_basicServer();
    process.exit(0);
}

main();