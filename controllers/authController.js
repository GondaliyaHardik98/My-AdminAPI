const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");

// Register user
const registerUser = async (req, res) => {
    const { name, email, password, roles } = req.body;

    try {
        const [user] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        if (user.length > 0) {
            return res.status(400).json({ success: false, message: "User already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.promise().query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
            name,
            email,
            hashedPassword,
        ]);

        const userId = result.insertId;

        for (const roleId of roles) {
            await db.promise().query("INSERT INTO user_roles (user_id, role_id) VALUES (?, ?)", [userId, roleId]);
        }

        res.status(201).json({ success: true, message: "User registered successfully." });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const [user] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        if (user.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid email or password." });
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid email or password." });
        }

        const [roles] = await db.promise().query(
            "SELECT roles.role_name FROM roles INNER JOIN user_roles ON roles.id = user_roles.role_id WHERE user_roles.user_id = ?",
            [user[0].id]
        );

        const token = jwt.sign(
            { userId: user[0].id, roles: roles.map((role) => role.role_name) },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({ success: true, token });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
