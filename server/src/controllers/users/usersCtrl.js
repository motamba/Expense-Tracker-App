const generateToken = require("../../middlewares/generateToken");
const User = require("../../model/User");
const expressAsyncHandler = require("express-async-handler");


//Resgister
const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, firstname, lastname, password } = req.body;

   //Check if User Exist
   const userExists = await User.findOne({ email });
   if (userExists) throw new Error("User Already Exist")
  try {
     const user = await User.create({email, firstname, lastname, password });
     res.status(200).json(user);
  }catch (error) {
    res.json(error);
  }
});

//Fetch all Users
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  try{
    const users = await User.find({});
    res.json(users);
  }catch(error){
    res.json(error);
  }
});

//Login User
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  //Find the User in DB
  const userFound = await User.findOne({ email });

  //Check if the User password Match

  if (userFound && (await userFound?.isPasswordMatch(password))){
    res.json({
      _id: userFound?._id,
      firstname: userFound?.firstname,
      lastname: userFound?.lastname,
      email: userFound?.email,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email/Password")
  }
  
});

//User Profile
const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  try {
        const profile = await User.findById(req?.user?._id).populate(["expenses", "income"]);
        res.json(profile);
  }catch (error) {
     res.json(error);
  }
});

//User UpdateProfile
const updateUserCtrl = expressAsyncHandler(async (req, res) => {
  try {
        const profile = await User.findByIdAndUpdate(req?.user?._id, {
          firstname: req?.body?.firstname,
          lastname: req?.body?.lastname,
          email: req?.body?.email,
        }, {
          new: true,
          runValidators: true
        });
        res.json(profile);
  }catch (error) {
     res.json(error);
  }
});

module.exports ={registerUser, fetchUsersCtrl, loginUserCtrl, userProfileCtrl, updateUserCtrl}