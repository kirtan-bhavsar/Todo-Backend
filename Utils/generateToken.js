import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";

const generateToken = async (res, user) => {
  // for cookie - name, token, cookieOptions

  // for jwt - payload, secret, expiresIn

  console.log("user", user);

  const payload = {
    user: {
      id: user.id,
    },
  };

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
    (err, token) => {
      if (err) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(err);
      }

      res
        .cookie("jwtToken", token, cookieOptions)
        .status(200)
        .json({
          message: "Registration/login successful",
          data: {
            user: { name: user.name, email: user.email },
            token,
          },
        });
    },
  );
};

export default generateToken;
