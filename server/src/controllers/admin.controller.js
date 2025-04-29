import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../model/admin.schema.js";

class AdminController {
    // admin Register
    static async adminRegister(req, res) {
        const { username, password } = req.body;

        try {
            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Please enter all fields",
                });
            }

            let adminCheck = await Admin.findOne({ username });

            if (!adminCheck) {
                return res.status(400).json({
                    success: false,
                    message: "Please add different username and password",
                });
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const admindata = {
                username: username,
                password: hashPassword,
            };

            const admin = await Admin.create({ admindata });

            // Success response

            return res.status(201).json({
                success: true,
                message: "Admin created successfully",
                data: admin,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    // Admin Login

    static async adminLogin(req, res) {
        const { username, password } = req.body;

        try {
            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Please enter all fields",
                });
            }

            let admin = await Admin.find({
                username: username,
                password: password,
            });

            if (!admin) {
                return res.status(400).json({
                    success: false,
                    message: "Admin user not found",
                });
            }

            const isMatchPassword = await bcrypt.compare(
                password,
                admin.password
            );

            if (!isMatchPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Creadinals",
                });
            }

            // token

            const token = jwt.sign(
                {
                    id: admin._id,
                    role: admin.role,
                },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: "1d",
                }
            );

            // Response Success

            return res.status(200).json({
                success: true,
                message: "Admin Login Success",
                data: admin,
                token: token,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }
}

export default AdminController;
