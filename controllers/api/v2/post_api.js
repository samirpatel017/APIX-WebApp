module.exports.index= function(req,res){
    return res.json(200,{
        message:"list of profiles v2",
        posts:[]
    })
}