import User from "./Models/User.js";
import Rate from "./Models/Rate.js";

import Jwt from "jsonwebtoken";

const generateAccessToken = (id) => {
    const payload = { id };
    return Jwt.sign(payload, process.env.token_key, { expiresIn: "24d" });
};
class authController {
    async signUp(req, res) {
        try {
            const { username, password } = req.body;
            const candidate = await User.findOne({ username });
            if (candidate)
                return res
                    .status(400)
                    .json({ message: "A user with this name already exists" });

            const user = new User({
                username: username,
                password: password,
            });
            await user.save();

            return res.json({
                message: "The user successfully registered!",
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
    async signIn(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                return res
                    .status(400)
                    .json({ message: `User: ${username} not found!` });
            }

            const validPassword = password === user.password;

            if (!validPassword) {
                return res.status(400).json({ message: "Wrong password" });
            }

            const resData = {
                username: user.username,
                token: generateAccessToken(user._id),
            };

            return res.json(resData);
        } catch (error) {
            res.status(400).json({ message: "login error" });
        }
    }
    async deleteUser(req, res) {
        try {
            const userId = Jwt.decode(
                req.headers.authorization.split(" ")[1]
            ).id;
            const deleteUser = await User.deleteOne({ _id: userId });

            if (deleteUser.deletedCount !== 1)
                return res.status(404).json({ message: "User not found" });

            await Rate.deleteMany({ user_id: userId });

            return res.json({
                message: "The user has been successfully deleted",
            });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "User deleting Error:", error });
        }
    }
}
export default new authController();
