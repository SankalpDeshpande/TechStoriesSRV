import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
    req.user = jwt.verify(req.headers['token'], process.env.JWT_SECRET);
    next();
}
export default verifyJWT;