const bcrypt = require("bcryptjs");
const authModel = require("../schema/auth_schema");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const isUserFound = await authModel.findOne({ email });
        if (!isUserFound) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }
        const genuineUser = bcrypt.compareSync(password, isUserFound.password);
        if (!genuineUser) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }
        return res.status(200).json({
            data: { email: isUserFound.email, _id: isUserFound._id },
            message: "User Loggedin Successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message || "Something went wrong",
        });
    }
};

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

module.exports = { login, signup };
