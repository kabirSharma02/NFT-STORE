const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');
const {isLoggedIn} = require('../middleware');
const { application } = require('express');


router.get('/cart/:productid/add', isLoggedIn, async (req, res) => {
    
    const { productid } = req.params;
    const product = await Product.findById(productid);
    const user = req.user;

    user.cart.push(product);

    await user.save();
    req.flash('success','Successfully added the Product')
    res.redirect('/cart/user')
});

router.get('/cart/user', isLoggedIn,async(req, res) => {

    const userid = req.user._id
    const user = await User.findById(userid).populate('cart');

   
    res.render('cart/usercart',{cart:user.cart});
})




router.delete('/user/:userid/cart/:id', async (req, res) => {

    try {
        const { userid, id } = req.params;
        await User.findByIdAndUpdate(userid, { $pull: { cart: id } })
        req.flash('success',"Product Remove Successfully");
        res.redirect('/cart/user');
    }
    catch (e) {
        req.flash('error', "Oops, Something Went Wrong .Try Again ");
        res.redirect('/error');
    }

});





module.exports = router