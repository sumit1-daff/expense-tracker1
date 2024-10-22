const validateSignup = (schema) =>(req, res , next)=>{
    const { error } = schema.validate(req.body);
    if(error){
        console.log("user details are not validated");
        res.status(403).send(error.details[0].message);
    }else{
        console.log("User validated at signup!!");
        next();
    }
}

module.exports = {
    validateSignup,
}