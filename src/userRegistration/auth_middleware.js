// import jwt from "jsonwebtoken";
// import userModel from "../userRegistration/modeluser.js";

// var checkUserAuth = async (req, res, next) => {
//   let token;
//   const { authorization } = req.headers;
//   if (authorization && authorization.startsWith("Bearer")) {
//     try {
//       //get token from header
//       token = authorization.split(" ")[1]; //based on

//       //verify token
//       const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);

//       console.log(userId)
      

//       //get user from token
//       req.user = await userModel.findById(userId).select("-password"); // password ko hata kar db se dega

//       next()
//     } catch (error) {
//       console.log(error);
//       res.status(401).send({ message: "User not authorized" });
//     }
//   }

//   if (!token) {
//     res.status(401).send({ message: "User not authorized, no token" });
//   }
// };

// export default checkUserAuth;

import jwt from "jsonwebtoken";
import userModel from "../userRegistration/modeluser.js";

const checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      // GetING  token from header
      token = authorization.split(" ")[1];

      // Verify token
      const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);

      console.log(userId); // For debugging checking

      // Get user from token
      req.user = await userModel.findById(userId).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ message: "User not authorized" });
    }
  } else {
    res.status(401).send({ message: "User not authorized, no token" });
  }
};

export default checkUserAuth;

