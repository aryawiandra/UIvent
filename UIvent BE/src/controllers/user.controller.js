const userRepository = require('../repositories/user.repository');
const baseResponse = require('../utils/baseResponse.util');

const bcrypt = require("bcrypt");
const saltRounds = 12;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRegex = /^(?=.*\d)(?=.*[\W_]).{8,}$/;

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!emailRegex.test(email)) {
        return baseResponse(res, false, 400, "Invalid email", null);
    }

    if (!passRegex.test(password)) {
        return baseResponse(
            res,
            false,
            400,
            "Password must be at least 8 characters long and include at least one number and one special character",
            null
        );
    }

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        
        const user = await userRepository.registerUser(name, email, hash);

        if (!user) {
            return baseResponse(res, false, 409, "Email already used", null);
        }

        return baseResponse(res, true, 201, "User created", user);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userRepository.getUserByEmail(email);

        if (!user) {
            return baseResponse(res, false, 401, "Invalid email or password", null);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return baseResponse(res, false, 401, "Invalid email or password", null);
        }

        return baseResponse(res, true, 200, "Login success", user);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await userRepository.getUserByEmail(req.params.email);

        if (!user) {
            return baseResponse(res, false, 404, "User not found", null);
        }
        
        return baseResponse(res, true, 200, "User found", user);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
};

