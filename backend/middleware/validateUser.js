// middlewares/validateUser.js
const validateUser = (req, res, next) => {
    console.log('Middleware is running');
    // Add validation logic here (e.g., check if the request body has required fields)
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    next(); // If validation passes, move to the next middleware/route handler
};

module.exports = validateUser;
