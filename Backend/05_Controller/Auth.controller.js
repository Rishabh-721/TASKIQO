import User from "../02_Model/User.model.js";
import auth from "../03_Middleware/Auth.Middleware.js";
import {hashingPwd, matchingPwd} from "../04_Utils/PwdChange.utils.js"
import generateToken from "../04_Utils/CreatingToken.utils.js";


const signUp = async(req, res) => {
    try {
    
        const {fullName, userEmail, pwd} = req.body;

        if(!fullName || !userEmail || !pwd){
            return res.status(400).json({
                message: "Please Provide All Required Info"
            })
        }

        const isExist = await User.findOne({email: userEmail});

        if(isExist){
            return res.status(400).json({
                message: `User Already Exists, Kindly Login With Correct Info`
            })
        }
        const hashedPwd = await hashingPwd(pwd);
        const user = await User.create({
            name: fullName,
            email: userEmail,
            password: hashedPwd,
        });

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: `User created successfully. Please wait for Super Admin approval.`,
            data: userResponse,
        })

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        })
    }
}

const login = async(req, res) => {
    try {
        const {userEmail, pwd} = req.body;

        if(!userEmail || !pwd){
            return res.status(400).json({
                message: "Please Provide All Required Info"
            })
        }

        const user = await User.findOne({ email : userEmail }).select("+password");

        if(!user){
            return res.status(401).json({
               message: "Invalid email or password." 
            });
        }

        if (user.isDeleted) {
            return res.status(403).json({
                message: "Account has been deleted."
            });
        }

        if(!user.isActive){
            return res.status(400).json({
                message: "Kindly Ask Super Admin for Approval"
            })
        }

        const isMatch = await matchingPwd(pwd, user.password);

        if(!isMatch){
            return res.status(401).json({
                message: `Invalid email or password.`
            })
        }

        const data = {
            userId: user._id,
            userSessionVersion: user.sessionVersion,
            purpose: "Auth",
        }

        const userResponse = user.toObject();
        delete userResponse.password;

        const tokenCode = await generateToken(data, "7d");

        res.status(200).json({
            message: `User Logged in Successfully`,
            data: userResponse,
            token: tokenCode,
        })

    } catch (error) {
        res.status(500).json({
            message: `Server Error: ${error.message}`
        })   
    }
}


const getMe = async(req, res) => {
    res.status(200).json({
        message: "User Found Successfully",
        data: req.user
    })
}

export {signUp, login, getMe};