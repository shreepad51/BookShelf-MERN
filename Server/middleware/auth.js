import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  // next parametet is optional , it makes function continue
  try {
    let token = req.header("Authorization");
    // we are grabbing authorization header from frontend
    // and then token will set on front end

    if (!token) {
      return res.status(403).send("Access Denied"); // in case token does not exist
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    /* A bearer token is a string of characters that is used for 
    authentication and authorization. It is a security token that can be used by anyone who has it.

    Bearer tokens are used in web applications and APIs 
    to hold user credentials and indicate authorization for requests and access.
    */

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
    // after verification next function is called
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
