const bcrypt = require("bcryptjs");
const authModel = require("../schema/auth_schema");

const signup = async (req, res) => {
    try {
        const { email, phone, password } = req.body;
        const isEmailExist = await authModel.exists({ email });
        if (isEmailExist) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = bcrypt.hashSync(password, 11);
        const newUser = await authModel.create({ email, phone, password: hashedPassword });
        return res.status(201).json({
            data: newUser,
            message: "User Registered Successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message || "Something went wrong",
        });
    }
};

module.exports = { signup };
