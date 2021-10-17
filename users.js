var express = require('express');
var router = express.Router();
var userModel = require('../../models').user;

module.exports = function (passport){
  router.get('/',function(req,res,next){
    console.log("userPage");
    res.send("userPage");
  });

  router.get('/login',function(req,res,next){
    console.log(req.user);
    res.send('loginPage');
  });
  
  router.post('/login',
    passport.authenticate('local', {
      successRedirect: '/home',
      failureRedirect: '/users/login'
  }));

  router.get("/kakao", passport.authenticate('kakao'));


  router.get("/Api/Member/Oauth2ClientCallback/kakao",
    passport.authenticate('kakao', {
      failureRedirect: '/users/login',
      successRedirect: '/home'
    }));
  
  router.get('/logout',function(req,res,next){
    req.logout();
    req.session.save((err)=>{
      console.log(err);
      res.redirect('/');
    });
  })
  
  
  router.get('/signup',function(req,res,next){
    res.send('signupPage');
  });
  
  router.post('/signup',async(req, res, next) =>{
    const { email, nickName, password} = req.body;
    if (! email || ! password || ! nickName) {
      var msg='signup failed:empty value(s)' 
      res.send(msg);
      return;
    }
    try{
      const same_email=userModel.findOne({where:{user_email:email}})
      if(same_email.user_email!=null || same_email.user_email !=undefined){
        var msgg='signup failed:same value(s) email'+same_email.user_email;
        res.send({msg:msgg});
        return;
      }
      const same_nickname=userModel.findOne({where:{nickname:nickName}})
      if(same_nickname.nickname!=null || same_nickname.nickname!=undefined) {
        var msgg='signup failed:same value(s) nickname'+same_nickname.nickname;
        res.send({msg:msgg});
        return;
      }if(same_nickname.nickname==null && same_email.user_email==null){
        const User = await userModel.create({
          nickname:nickName,
          user_email:email,
          user_pwd:password,
          marketing_aggree:false,
          SNS_register:'NVR'
        });
        res.send({nickname:nickName,usre_email:email,user_pwd:password});
      }else {
        console.log("뭘까");
        res.send('뭐지모를 err 방지용')
      }
    }catch(err){    
      var msg='signup failed\n'+err;
      console.log(msg);
      res.send(msg);
    }
  });
  return router;
}
