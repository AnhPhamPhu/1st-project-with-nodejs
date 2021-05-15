const db = require('../../db');

class AuthMiddleware{
   
    authRequire(req, res, next){
        console.log('req.cookies.userId' + req.cookies.userId)
        if(!req.signedCookies.userId){
            res.redirect('/auth/login');
            return;
        }
        
        var user = db.get('user').find({ id: req.signedCookies.userId }).value();

        if(!user){
            res.redirect('auth/login');
            return;
        }

        res.locals.user = user;
        next();

    }

}

module.exports = new AuthMiddleware;