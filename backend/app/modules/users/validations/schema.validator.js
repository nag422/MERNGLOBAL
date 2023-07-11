var Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const userDbo = require("../dbo/user.dbo")
exports.signup = async function (req, res, next) {
    const signUpSchema = Joi.object({      
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string().required(),
    })
    try{
      signUpSchema.validate(req.body);
      const { email } = req.body;

      await userDbo.isExistedUser({ email: email }).then((status) => {
        console.log("is user", status)
        if (status === 401) {          
          return Promise.reject("E-Mail address or username already exists!");
        } else{
          next()
        }
      });
      
    } catch(err){
      res.status(400).send({
          success: false,
          message: err
        })
    }

    
  }