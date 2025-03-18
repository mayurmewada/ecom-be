const  bcrypt = require("bcryptjs");
const authModel = require("../schema/auth_schema");

const signup = async (req, res) => {
    try {
        const { email, phone, password } = req.body;
        const isEmailExist = await authModel.findOne({ email });
        if (isEmailExist) {
            res.status(400).json({
                message: "Email already Exist",
            });
        } else {
            const salt = bcrypt.genSaltSync(11);
            const hashedPassword = bcrypt.hashSync(password, salt);
            const newUser = await new authModel({ email, phone, password: hashedPassword });
            newUser.save();
            res.status(200).json({
                data: newUser,
                message: "User Registered Successfully",
            });
        }
    } catch (error) {
        res.status(500).json({
            messgae: error,
        });
    }
};

module.exports = { signup };
