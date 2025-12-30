const {User} = require("../models");
const jwt= require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req,res)=>{
    const users = await User.findAll();
    res.json(users);

};

exports.getUserById = async (req,res)=>{
    const id = parseInt(req.params.id, 10);
    const user = await User.findByPk(id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
}

exports.createUser = async (req,res)=>{
    const { userName, email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({
            message: "email, password and role are required"
        });
    }

    // Make sure email is unique
    const existing = await User.findOne({where:{email}});
    if (existing) {
        return res.status(409).json({ message: "User with this email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email, 
        password_hash:hashedPassword,
        role,
        userName,
    });

    const token = jwt.sign(
        {userId:user.userId,email:user.email,role:user.role,userName:user.userName},process.env.JWT_SECRET,{expiresIn:"1h"}
    );
    res.status(201).json({
        message:" User created!",
        user,
        token,
    });
}

exports.updateUser = async (req,res) => {
    const id = parseInt(req.params.id, 10);
    const user= await User.findByPk(id);
    
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    
    const{ userName, email, password, role} = req.body;

    if (email!==undefined) user.email=email;
    if (password!==undefined){
        const hashedPassword = await bcrypt.hash(password,10);
        user.password_hash=hashedPassword;
    }
    if (role!==undefined) user.role=role;
    if (userName!==undefined) user.userName=userName;

    await user.save();

    res.json({
        message:"User updated successfully",
        user,
    });

}

exports.deleteUser = async (req,res)=>{
    const id =parseInt(req.params.id,10);
    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    res.json({
        message:"User deleted successfully",
        user,
    });
}
    