const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');


// router.get('/fakeuser', async (req, res) => {

//     const user = new User({
//         username: 'sabeel2323',
//         email: 'sabeel22@gmail.com'
//     });

//     const newUser = await User.register(user, 'sabeel12');

//     res.send(newUser);
// });

router.get('/register', (req, res) => {
    res.render('auth/signup');
})

router.post('/register', async(req, res) => {
    
    try {
        const { username, email, password } = req.body;

        const user = new User({
            username,
            email
        });
    
        await User.register(user, password);
    
        req.flash('success', `Welcome ${username} ,Please Login to Continue`);
        res.redirect('/login');
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
});


router.get('/login', (req, res) => {
    res.render('auth/login');
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true

}), (req, res) => {
    const {username}=req.user;
    req.flash('success', `Welcome Back ${username}`);
    res.redirect('/products');
});

router.get('/logout',(req,res)=>{
    req.logout();

    req.flash('success','Successfully Logout');
    res.redirect('/login');
})

module.exports = router;