import { EMAIL_REGEX } from "../constants.js";
import { AUTH_COOKIE_OPTIONS } from "../configs/authCookie.config.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating tokens",
      error
    );
  }
};

const handleUserSignup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Name, email & Password are required fields");
  }

  if (!EMAIL_REGEX.test(email)) {
    throw new ApiError(400, "Enter a valid email");
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    throw new ApiError(409, "User with email already exists");
  }

  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });

  const createdUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating the user!");
  }

  const { accessToken, refreshToken } = await generateTokens(createdUser._id);
  return res
    .status(201)
    .cookie("accessToken", accessToken, AUTH_COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, AUTH_COOKIE_OPTIONS)
    .json(
      new ApiResponse(
        201,
        {
          user: createdUser,
        },
        "User created successfully"
      )
    );
});

const handleUserLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "Email & Password are required fields");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User with the email doesn't exist");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Password incorrect");
  }

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const { accessToken, refreshToken } = await generateTokens(user._id);
  return res
    .status(200)
    .cookie("accessToken", accessToken, AUTH_COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, AUTH_COOKIE_OPTIONS)
    .json(new ApiResponse(200, { loggedInUser }, "Logged in Successfully"));
});

const handleUserLogout = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, {
    $set: {
      refreshToken: undefined,
    },
  });

  return res
    .status(200)
    .clearCookie("accessToken", AUTH_COOKIE_OPTIONS)
    .clearCookie("refreshToken", AUTH_COOKIE_OPTIONS)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const handleUpdateTokens = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken?._id);
  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(401, "Refresh Token Expired");
  }

  const { accessToken, refreshToken } = await generateTokens(user._id);
  return res
    .status(200)
    .cookie("accessToken", accessToken, AUTH_COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, AUTH_COOKIE_OPTIONS)
    .json(new ApiResponse(200, {}, "Access Token Refreshed successfully"));
});

export {
  handleUserSignup,
  handleUserLogin,
  handleUserLogout,
  handleUpdateTokens,
};
