import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const _generateToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "10h" });
}

export const login = async (req, res, next) => {
    try {
        const { mail, password } = req.body;
        const user = await User.findOne({ mail });
        if (!user) {
            return res.status(404).res.json({ "status": "failure", "msg": "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ "status": "failure", "msg": "Incorrect Password" });
        }
        //token generation
        const token = _generateToken({ mail, username: user.username });
        return res.status(200).json({ "status": "success", "username": user.username,  token})
    } catch (err) {
        return res.status(500).json({err:err.message});
    }
}

export const register = async (req, res, next) => {
    try {
        const { mail, password, firstName, lastName } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const latestUsername = await User.findOne({}, 'username', { sort: { 'username': -1 } });
        let username = "";
        if (!latestUsername) {
            username = "TS000001";
        } else {
            username = "TS" + (Number(latestUsername.username.substring(2, 8)) + 1).toString().padStart(6, "0");
        }
        const user = await User.create({ mail, password: hashedPassword, firstName, lastName, username });
        const token = _generateToken({ mail, username: user.username });
        return res.status(200).json({ "status": "success", username,  token})
    } catch (err) {
        return res.status(500).json({err:err.message});
    }
}

export const getUserName = async (req, res, next)=>{
    if(req.user.username){
        return res.status(200).json({username: req.user.username});
    }else{
        return res.status(401).json({"msg": "Unauthorized"});
    }
}