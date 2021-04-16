const User=require('../models/user');

module.exports.registerForm=(req,res)=>{

    res.render('users/register');

}

module.exports.PostRegister=async(req,res)=>{
    try{
        const {email,username,password}=req.body;
        const user=new User({email,username});
        const registerdUser= await User.register(user,password);
        req.login(registerdUser,err=>{
            if(err) 
            console.log(err);

            res.redirect('/');
        })        
    }
    catch(e)
    {
        req.flash('error',e.message);
        res.redirect('register');
    }

}

module.exports.loginForm=(req,res)=>{
    res.render('users/login');   
}

module.exports.login=(req,res)=>{
    //if we have reached this point, the person is aloready auth by passport

    const redirectURL=req.session.returnTo || '/hotels';
    delete req.session.returnTo;
    res.redirect(redirectURL)

}

module.exports.logout=(req,res)=>{
    req.logout();//pasport helped
    req.flash('success',"Logged out!")
    res.redirect('/hotels')
}