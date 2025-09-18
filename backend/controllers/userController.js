import { User } from "../models/Usermodel.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import { generateToken } from "../utils/token.js";


export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing", success: false
      });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "File is required.", success: false });
    }

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email.", success: false
      });
    }

    await User.create({
      fullname,
      email,
      phoneNumber,
      password,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
        profilePhotoOriginalName: file.originalname,
      },
    });

    return res.status(201).json({
      message: "Account created successfully.", success: true
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error.", success: false
    });
  }
};


// login

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing", success: false
      });
    }

    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false
      });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.", success: false
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.", success: false
      });
    }


    const token = generateToken(user._id);

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`, user, success: true
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error", success: false
    });
  }
};

//update profile
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;
    let fileUri;
    let cloudResponse;

    if (file) {
      fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    // 🔹 Update fields only if provided
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    const safeUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: safeUser,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};

// logout
export const logout = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};