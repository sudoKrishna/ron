import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = "this";

export const authMiddleware = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const payload = decoded as JwtPayload & { userId: string };

    req.user = payload;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};