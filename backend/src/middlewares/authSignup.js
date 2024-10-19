const authSignup = async (req, res, next)=>{
    const {name, email, password} = req.body;
    console.log("inside the middle ware for auth signup")
    console.log(name , email , password);
    next();
}

exports.authSignup;