const express = require('express')
const router = express.Router()
const Product = require('../models/product');
const Review = require('../models/review');
const {isLoggedIn} = require('../middleware')





//to display 

router.get('/products',async(req,res)=>{
    const products = await Product.find({});
    res.render('index',{products});
})

//to get new product

router.get('/products/new',isLoggedIn,(req,res)=>{
    res.render('products/new');
})

router.post('/products',isLoggedIn,async(req,res)=>{
    const products = req.body;
  
    await Product.create(products)
    req.flash('success','Product added successfully');
     res.redirect('/products')
})


router.get('/products/:id',async(req,res)=>{
    const{id}=req.params; 
    const product = await Product.findById(id).populate('reviews');
    res.render('products/show',{product})
})

router.get('/products/:id/edit',isLoggedIn,async(req,res)=>{
    const {id}=req.params;
    const product = await Product.findById(id);
    res.render('products/edit',{product})
})

router.patch('/products/:id',isLoggedIn,async(req,res)=>{
    const{id}=req.params;
    await Product.findByIdAndUpdate(id,req.body);
    req.flash('success','Updated Successfully');
    res.redirect(`/products/${id}`)
})
router.delete('/products/:id',isLoggedIn,async(req,res)=>{
    const{id}=req.params;
    await Product.findByIdAndDelete(id,req.body);
    res.redirect('/products')
})

router.post('/products/:id/review',isLoggedIn,async(req,res)=>{
    const{id}=req.params;
    const{rating,comment} = req.body;

    const review = new Review({rating:rating,comment:comment,user:req.user.username})

    const product =  await Product.findById(id);
    product.reviews.push(review);

    await review.save();
    await product.save();
    req.flash('success','ThanK You For Your FeedBack');
    res.redirect(`/products/${id}`);

    
})

router.delete('/products/:productid/review/:reviewid', isLoggedIn,async(req, res) => {
        
    const { productid, reviewid } = req.params;
    
    await Product.findByIdAndUpdate(productid, { $pull: { reviews: reviewid } });
    await Review.findByIdAndDelete(reviewid);

    res.redirect(`/products/${productid}`);
})


module.exports=router;