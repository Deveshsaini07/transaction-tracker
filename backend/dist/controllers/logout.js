export function logout(req, res) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
            secure: true
        });
        res.status(200).json({
            msg: "logged out"
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "error in logout"
        });
    }
}
//# sourceMappingURL=logout.js.map