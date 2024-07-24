const express = require('express');
const User = require('../../models/user');



const getProfile = async (req, res) => {
    const { id } = req.params;
    try {

        const profile = await User.findOne({ where: { id: id } });

        if (!profile) {
            return res.status(404).json({ message: "User not found" });
        }


        return res.status(200).json({ profile });
    }
    catch (error) {
        return res.status(500).json({ error: error });
    }
}


const updateProfile = async (req, res) => {
    const { id } = req.params;
    const { lastName, firstName, email, } = req.body;

    try {
        const user = await User.findOne({ where: { id: id } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        

       

        user.lastName = lastName;
        user.firstName = firstName;
        user.email = email;
       

        const updatedUser = {
            lastName,
            firstName,
            email
          
        }


        await user.save();
        return res.status(200).json({ message: "user profile updated successfully", updatedUser });

    }
    catch (error) {
        return res.status(500).json({ error: error });
    }

}


const changePassword = async (req, res) => {
    const { email, newPassword , oldPassword } = req.body;
    const user = await User.findOne({ where: 
      { email:email } 
  
  
  
  })
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    if ( bcrypt.compare(oldPassword.toString(), user.password))
     {
      try {
        const hashedPwd = await bcrypt.hash(newPassword.toString(), 10);
        user.password = hashedPwd;
        await user.save();
        return res.status(200).json({ message: "Password changed successfully" });
      }
      catch (error) {
        return res.status(500).json({ error: error });
      }
    }
    else{
      return res.status(401).json({ message: "Old password is incorrect" });
    }
  
}  


module.exports = { getProfile, updateProfile ,changePassword };