
function validationMiddleware(DtoClass) {
    return async (req, res, next) => {
    const dtoInstance = new DtoClass(req.body);
     try{
         dtoInstance.validate();
     }catch(err){
         return res.status(400).json({
             message: err.message,
         })
     }

    req.validatedBody = dtoInstance;
    next();
    };
}

module.exports = { validationMiddleware };
