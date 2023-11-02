import jwt from "jsonwebtoken";
export const validateUser = async (req, res, next) => {
  try {
    const auth_header = req.headers["authorization"];
    const token = auth_header ? auth_header.split(" ")[1] : "";
    if (!token) {
      throw Error("token not found");
    }
    const userData = jwt.verify(token, "secret_key");
    if (!userData.user) {
      return res.status(401).send({ message: "Token expired" });
    }
    req.user = userData.id;
    return next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};
