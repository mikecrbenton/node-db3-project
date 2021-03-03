const db = require("../../data/db-config")

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
   const id = req.params.scheme_id
   db("schemes")
      .where("scheme_id",id)
         .then( foundScheme => {
            if(foundScheme[0]) {
               next()
            }else{
               return res.status(404).json({ message: "scheme with scheme_id <actual id> not found" }) 
            }
         })
         .catch( err => {
            return res.status(404).json({ message: "scheme with scheme_id <actual id> not found" }) 
         })
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
   if(!req.body.scheme_name){
      return res.status(400).json({message: "invalid scheme_name" })
   }
   next()
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
   if(!req.body.instructions){
      return res.status(400).json({message: "invalid step" })
   }
   if( (req.body.step_number < 1) || (typeof(req.body.step_number) !== 'number')){
      return res.status(400).json({message: "invalid step" })
   }
   next()
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
