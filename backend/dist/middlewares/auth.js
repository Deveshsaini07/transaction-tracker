import jwt from 'jsonwebtoken';
import { z } from 'zod';
const inputSchema = z.string().min(6);
export function Auth(req, res, next) {
    try {
        const check = inputSchema.safeParse(req.headers.cookie);
        if (check.success == false) {
            res.status(400).json({
                msg: "invalid token"
            });
            return;
        }
        const fullToken = req.headers.cookie;
        if (!fullToken) {
            res.status(403).json({
                msg: "un-authorized"
            });
            return;
        }
        const token = fullToken.slice(6);
        // console.log(token);
        const data = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(data);
        req.userId = data.id;
        next();
    }
    catch (error) {
        res.status(403).json({
            msg: "invalid token"
        });
        return;
    }
}
;
//# sourceMappingURL=auth.js.map