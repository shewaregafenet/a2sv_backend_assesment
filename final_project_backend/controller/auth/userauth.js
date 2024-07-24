const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/user');

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Invalid password or email' });
    }

    const token = jwt.sign(
        {
            email: user.email,
        },
        process.env.ACCESS_TOKEN_SECRET
    );
    const decodedToken = jwt.decode(token);
    const Email = User.email;
    
    console.log('decodedToken', decodedToken);

    res.json({ token,Email });
};

const signup = async (req, res) => {
    const { email, password, lastName , firstName } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword, lastName,firstName });

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { login, signup };
