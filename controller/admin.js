import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import connect from '../dbConnect.js'
import dotenv from 'dotenv';

dotenv.config({
  path: '../.env'
})


export const login = (req, res, next) => {
    const { password } = req.body;
    const emailCheckSql = `SELECT * FROM admin`;
  
    connect.query(emailCheckSql, (err, result) => {

      if(err){
        throw err;
      }

      bcryptjs.compare(password, result[0]["password"], (bErr, bResult) => {
        // wrong password
        if (bErr) {
          throw bErr;
        }
        if (bResult) {
          const token = jwt.sign({ id: result[0].id }, process.env.BCRYPT_SECRET, {
            expiresIn: "1h",
          });
          return res.status(200).cookie("token", token, { expiresIn: "1d", httpOnly: true }).json({
            success: true,
            msg: "Logged in!",
            token,
            user: {
              name: result[0].name,
              email: result[0].email,
            },
          });
        }
        return res.status(401).json({
          success: false,
          msg: "Username or password is incorrect!",
        });
      });
    });
  };


export const logout = (req, res) => {
    return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
        message: "user logged out successfully.",
        success: true
    })
}