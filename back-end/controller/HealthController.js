const HealthData = require("../models/healthData");

const getAllTracks = async (req, res) => {
  try {
    const allTracks = await HealthData.find();
    res.json(allTracks);
  } catch (error) {
    console.error("Error fetching tracks:", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

const getAllTracksByDate = async (req, res) => {
  const requestedDate = new Date(req.params.date);
  try {
    const tracksForDay = await HealthData.find({
      date: {
        $gte: requestedDate,
        $lt: new Date(requestedDate.getTime() + 24 * 60 * 60 * 1000),
      },
    });
    res.json(tracksForDay);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const putATrack = async (req, res) => {
  const requestedDate = new Date(req.params.date);
  try {
    const existingTrack = await HealthData.findOne({
      date: {
        $gte: requestedDate,
        $lt: new Date(requestedDate.getTime() + 24 * 60 * 60 * 1000),
      },
    });
    console.log("existing track", existingTrack);

    if (existingTrack) {
      // Update existing track
      Object.assign(existingTrack, req.body);
      await existingTrack.save();
      res.json(existingTrack);
    } else {
      // Create new track for the day if it doesn't exist
      const newTrack = new HealthData({
        date: requestedDate,
        ...req.body,
      });
      await newTrack.save();
      console.log(newTrack);
      res.status(200).json(newTrack);
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

module.exports = { getAllTracks, getAllTracksByDate, putATrack };
