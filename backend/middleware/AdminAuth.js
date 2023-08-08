var jwt = require("jsonwebtoken");
var secret = "zFkRJsfaxPhK8ql6nriJ1enb4tyQIuccWQJlaxJsxHj+V1kJGEsLsITBJbJpZzS+";

module.exports = function(req, res, next){
    const authToken = req.headers['authorization'];

    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];

        try{
            var decoded = jwt.verify(token, secret);
            if(decoded){
                next();
            }
           
        
        }catch(err){
            console.log(err);
            res.status(403);
            res.send("Você não está autenticado 1");
            return;
        }
    }else{
        res.status(401);
        res.send("Você não está autenticado 2");
        return;
    }
}