const validateUser = (req, res, next) =>{
    const token = req.cookies.authToken;
    if(!token){
        return res.status(401).send("Invalid User");
    }

    try{
        const verified = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch(err){
        console.log("Error occurred at middleware!!",err);
        res.status(400).send("Invalid token");
    }
}
export default validateUser;