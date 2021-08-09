module.exports.setFlash= function(req,res,next){
    res.locals.success_message= req.flash('success_message');
    res.locals.error_message= req.flash('error_message');
    res.locals.error = req.flash('error');
    next();
}


const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
module.exports.imageFilter = imageFilter;