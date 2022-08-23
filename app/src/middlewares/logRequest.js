module.exports = function (req, res, next){
    console.log(
        JSON.stringify({
            Method:req.method,
            Path:req.path,
            Body:req.body,
            Status:res.statusCode,
        })
    )
  next();
};
