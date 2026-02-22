const jwt = require('jsonwebtoken');


const jwtAuthMiddleware = (req, res, next) => {

    // first chcek request headers has authorization or not
    const authorization =req.headers.authorization
    if(!authorization){
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    // Extract the jwt  token from the request Authorization headers
    const token = req.headers.authorization?.split(' ')[1]; // Assuming the token is sent as "Bearer <token>"
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
}

 // Funtion to generate a JWT token for a user
const generateToken = (userData) => {
    // Generate a JWT token with user data and secret key, set to expire in 1 hour
    return jwt.sign({ id: userData._id, email: userData.email }, process.env.JWT_SECRET_KEY, { expiresIn: 60 });
}

module.exports = {  jwtAuthMiddleware, generateToken }; 