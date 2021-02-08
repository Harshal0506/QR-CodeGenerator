const express=require('express');
const qr_code=require('qrcode');

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','hbs');
const PORT=process.env.PORT ||3000;
app.get('/',(req,res)=>{
    res.render('home');
})

app.post('/scan',(req,res)=>{
    const url=req.body.input;
    console.log(url);
    if(!url){
        //never possible
        res.status(400).send("There is no URL provided to be scanned");
    }else{
        qr_code.toDataURL(url)
        .then((url)=>{
            res.render('scan',{img:url});

        })
        .catch(err=>{
            res.status(400).send("Error Occured!!"+err.message);
        })
    }
})


app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})