import jwt from "jsonwebtoken"
import authModel  from "../models/authmodel.js"
 
const checkIsUserAuthenticated = async (req,res,next) => {
    let token;
    const {authorization} = req.headers;
 
    if(authorization && authorization.startsWith("Bearer"))
    {
        try{
            token = authorization.split(" ")[1];
            const { userID } = jwt.verify(token,"pleaseSubscribe");
            // get user from token

            // exclude the user's password from the retrieved data for security reasons.
            req.user = await authModel.findById(userID).select("--password");

            // request to continue to the next middleware in the pipeline
            next(); 
        }
        catch(error)
        {
            return res.status(400).json({message:"unAuthorized User"});
        }
    }
    else{
        return res.status(400).json({message:"unAuthorized User"});
    }
};

export default checkIsUserAuthenticated;