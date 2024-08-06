import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../userRegistration/modeluser.js";

class usercontroller {
  static userRegistration = async (req, res) => {
    const { name, email, phone, password, password_confirmation, tc } =
      req.body;
    try {
      const user = await userModel.findOne({ email: email });

      if (user) {
        return res
          .status(409)
          .json({ message: "User with same email already exists" });
      } else {
        if (name && email && phone && password && password_confirmation && tc) {
          if (password === password_confirmation) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const doc = new userModel({
              name: name,
              email: email,
              phone: phone,
              password: hashedPassword,
              tc: tc,
            });

            await doc.save();
            const saved_user = await userModel.findOne({ email: email });

            //gentrate JWT Token
            const token = jwt.sign(
              { userId: saved_user._id }, 
              process.env.JWT_SECRET_KEY,
              { expiresIn: "3h" }
            );
            
            
            return res
              .status(201)
              .json({ message: "User Registration successful", token: token });
          } else {
            return res.status(400).json({ message: "Passwords do not match" });
          }
        } else {
          return res
            .status(400)
            .json({ message: "Please fill all the fields" });
        }
      }
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.phone) {
        return res
          .status(409)
          .json({ message: `Phone number ${phone} is already registered` });
      }
      return res
        .status(500)
        .json({ message: "Unable to register", error: error.message });
    }
  };

  static userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      if (email && password) {
        const user = await userModel.findOne({ email: email });
        if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            //Genrate JWT Token
            const token = jwt.sign(
              {userId: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "3h" }
            );
            
            res
              .status(200)
              .json({
                status: "success",
                message: "Login Success",
                token: token,
              });
          } else {
            return res.status(400).json({ message: "Invalid password" });
          }
        } else {
          return res.status(400).json({ message: "User not registered" });
        }
      } else {
        return res.status(400).json({ message: "Please fill all the fields" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error during login", error: error.message });
    }
  };
  static changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body;
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({ " status": "failed", message: "Passwords do not match" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await userModel.findByIdAndUpdate(req.user._id, {$set: {password: hashedPassword}})
        //console.log(req.user)
        res.send({"status": "success", "message": "password chnaged Succesfully"})
      }
    } else {
      res.send({ " status": "failed", message: "All Feilds are Required" });
    }
  };
}

export default usercontroller;
