import { nanoid } from "nanoid";
import { URL } from "../models/url.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const handleGenerateShortUrl = asyncHandler(async (req, res) => {
  const shortId = nanoid(8);
  const url = req?.body?.url;

  if (!url) {
    throw new ApiError(500, "url is required");
  }

  const addedUrl = await URL.create({
    shortId: shortId,
    redirectUrl: url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  const shortenedUrl = await URL.findById(addedUrl?._id).select("-_id");
  if (!shortenedUrl) {
    throw new ApiError(
      500,
      "something went wrong while shortening the URL, please try again"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, shortenedUrl, "url shortened successfully"));
});

const handleGetAllUrls = asyncHandler(async (req, res) => {
  const urls = await URL.find({ createdBy: req.user._id });
  return res
    .status(200)
    .json(new ApiResponse(200, urls, "fetched all urls successfully"));
});

const handleVisitUrl = asyncHandler(async (req, res) => {
  const { shortId } = req.params;

  const originalUrl = await URL.findOneAndUpdate(
    { shortId: shortId },
    {
      $push: {
        visitHistory: Date.now(),
      },
    }
  ).select("-_id -shortId -createdAt -updatedAt");

  if (!originalUrl) {
    throw new ApiError(500, "invalid short url");
  }

  return res.redirect(originalUrl.redirectUrl);
});

const handleGetAnalytics = asyncHandler(async (req, res) => {
  const { shortId } = req.params;
  const result = await URL.findOne({
    $and: [{ shortId: shortId }, { createdBy: req.user._id }],
  });
  if (!result) {
    throw new ApiError(401, "unauthorized request");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
      },
      "analytics fetched successfully"
    )
  );
});

export {
  handleGenerateShortUrl,
  handleGetAllUrls,
  handleVisitUrl,
  handleGetAnalytics,
};
