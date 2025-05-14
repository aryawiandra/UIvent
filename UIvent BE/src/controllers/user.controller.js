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

        const { password: _removed, ...safeUser } = user;
        return baseResponse(res, true, 201, "User created", safeUser);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
};

// Endpoint to make account with role (for development purpose only)
// exports.registerUserByAdmin = async (req, res) => {
//     const { name, email, password, role, organization } = req.body;
    
//     if (!emailRegex.test(email)) {
//         return baseResponse(res, false, 400, "Invalid email", null);
//     }

//     if (!passRegex.test(password)) {
//         return baseResponse(
//             res,
//             false,
//             400,
//             "Password must be at least 8 characters long and include at least one number and one special character",
//             null
//         );
//     }

//     try {
//         const salt = await bcrypt.genSalt(saltRounds);
//         const hash = await bcrypt.hash(password, salt);
        
//         const user = await userRepository.registerUserByAdmin(name, email, hash, role, organization);

//         if (!user) {
//             return baseResponse(res, false, 409, "Email already used", null);
//         }

//         const { password: _removed, ...safeUser } = user;  
//         return baseResponse(res, true, 201, "User created", safeUser);
//     }
//     catch (error) {
//         console.error("Server error", error);
//         return baseResponse(res, false, 500, "Server Error", null);
//     }
// };

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

        const { password: _removed, ...safeUser } = user;
        return baseResponse(res, true, 200, "Login success", safeUser);
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
        
        const { password: _removed, ...safeUser } = user;
        return baseResponse(res, true, 200, "User found", safeUser);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
};

exports.updateRole = async (req, res) => {
    if (!req.body.role) {
        return baseResponse(res, false, 400, "Missing role", null);
    }
    try {
        const user = await userRepository.updateRole(req.params.email, req.body);

        if (!user) {
            return baseResponse(res, false, 404, "User not found", null);
        }

        const { password: _removed, ...safeUser } = user;
        return baseResponse(res, true, 200, "User role updated successfully", safeUser);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}

exports.updateName = async (req, res) => {
    if (!req.body.name) {
        return baseResponse(res, false, 400, "Missing name", null);
    }
    try {
        const user = await userRepository.updateName(req.params.email, req.body);

        if (!user) {
            return baseResponse(res, false, 404, "User not found", null);
        }

        const { password: _removed, ...safeUser } = user;
        return baseResponse(res, true, 200, "User name updated successfully", safeUser);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}

exports.updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return baseResponse(res, false, 400, "Missing old or new password", null);
    }

    try {
        const user = await userRepository.getUserByEmail(req.params.email);
        if (!user) {
            return baseResponse(res, false, 404, "User not found", null);
        }

        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            return baseResponse(res, false, 401, "Invalid old password", null);
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(newPassword, salt);

        const updatedUser = await userRepository.updatePassword(req.params.email, hash);
        const { password: _removed, ...safeUser } = updatedUser;
        return baseResponse(res, true, 200, "Password updated successfully", safeUser);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await userRepository.deleteUser(req.params.email);

        if (!user) {
            return baseResponse(res, false, 404, "User not found", null);
        }

        const { password: _removed, ...safeUser } = user;
        return baseResponse(res, true, 200, "User deleted successfully", safeUser);
    }
    catch (error) {
        console.error("Server error", error);
        return baseResponse(res, false, 500, "Server Error", null);
    }
}