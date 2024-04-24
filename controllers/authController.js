import authModel from '../models/authmodel.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';

class AuthController
{
    static userRegistration = async (req,res) => {

        // fields submitted by user are fetched 
        const {username,email,password} = req.body;
        try 
        {
            if(username && email && password)
            {
                const isUser = await authModel.findOne({email:email});

                // new user 
                if(!isUser)
                {
                    // pass hashing, bcryptjs is hashing technique(blowfish)
                    // genSalt is no of hash rounds 
                    const genSalt = await bcryptjs.genSalt(10);
                    const hashedpassword = await bcryptjs.hash(password,genSalt);
                    
                    // create and save new user 
                    const newUser = authModel({
                        username,
                        email,
                        password:hashedpassword,
                    });
                    const savedUser = await newUser.save();

                    if(savedUser)
                        return res.status(200).json({message:"User Registration Successful"});
                }

                // if user already registered
                else
                    return res.status(400).json({message:"Email already exists !"});
            }

            // if any of the field is missing 
            else
                return res.status(400).json({message:"all fields are mandatory"});

        }
        catch (error)
        {
            return res.status(400).json({message:error.message});
        }
    };

    static userLogin = async (req,res) => {
      const {email,password} = req.body;
      
      try
      {
        // if all Credential are filled 
        if(email && password)
        {
            const isEmail = await authModel.findOne({email:email});

            if(isEmail)
            {
                // if user Credentials match with database
                // Load hash from the db, which was preivously stored 
                if(isEmail.email === email && (await bcryptjs.compare(password,isEmail.password)))
                {
                    // GENERATE TOKEN   
                    const token = jwt.sign(
                        {userID:isEmail._id},
                        "pleaseSubscribe",
                        {expiresIn:"2d",
                    });

                    return res.status(200).json({
                        message:"Login Succeesful",
                        token,
                        name:isEmail.username,
                    })
                }
                else
                    return res.status(400).json({message:"Wrong credentials"});
            }

            //no user found
            else
                return res.status(400).json({message:"Email ID not found"});
        }

        // any Credential is missed 
        else
            return res.status(400).json({message:"All fields are required"});

      }
      catch(error)
      {
        return res.status(400).json({message:error.message})
      }
    };
}

export default AuthController;