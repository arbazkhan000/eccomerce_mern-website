import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    try {
        const token =
            req.cookies.headers || req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid token" });
            }

            req.user = user;
            req.user = user.role;
        });

        next();
    } catch (error) {
        return res.status(500).json({
            message: "Error validating token",
            error: error.message,
            success: false,
        });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};

export { authMiddleware, isAdmin };
