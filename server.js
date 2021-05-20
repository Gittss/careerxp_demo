const express=require('express'),
    app=express(),
    bodyparser=require('body-parser');
const path=require('path')
const mongoose=require('mongoose')
const WooCommerceRestApi=require('@woocommerce/woocommerce-rest-api').default
var slug=require('slug')

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'pug')

const api=new WooCommerceRestApi({
    url: "https://imfpa.org",
    consumerKey: "ck_2ed4da7fb626b3dfb9f71f4130d921897f3e54f4",
    consumerSecret: "cs_ebc8e1c14eee3ea5496993205384eeffa10e779c",
    version: "wc/v3"
})

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

//--------------------Express server setup--------------------
app.listen(2000,(err)=>{
    if(!err) console.log('App running at port : 2000')
})

//--------------------------Routes----------------------------
app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/add',(req,res)=>{
    api.post('/wp-json/wc/v3/products',(req,res)=>{
        const data = {
            name: "Premium Quality",
            type: "simple",
            regular_price: "21.99",
            description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
            short_description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            categories: [
              {
                id: 9
              },
              {
                id: 14
              }
            ],
            images: [
              {
                src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg"
              },
              {
                src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_back.jpg"
              }
            ]
        };
        
        api.post("products", data)
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error.response.data);
        });
    })
})

// app.get('/products',(req,res)=>{
// })