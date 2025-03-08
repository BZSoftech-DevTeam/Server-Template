const SCO = require("../models/school-official"); // Adjust path as needed

const createOfficial = async (req, res) => {
  try {
    const existingOfficial = await SCO.findOne({
      official_ID: req.body.official_ID,
    });
    if (existingOfficial) {
      return res.status(400).json({ error: "Official already exists" });
    }

    const official = new SCO(req.body);
    await official.save();
    res.status(201).json(official);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOfficials = async (req, res) => {
  try {
    const officials = await SCO.find();
    res.status(200).json(officials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOfficialById = async (req, res) => {
  try {
    const { official_ID } = req.query;
    const official = await SCO.findOne({ official_ID });
    if (!official) {
      return res.status(404).json({ message: "Official not found" });
    }
    res.status(200).json(official);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOfficial = async (req, res) => {
  try {
    const { official_ID } = req.query;
    const updateData = req.body;

    const updatedOfficial = await SCO.findOneAndUpdate(
      { official_ID },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedOfficial) {
      return res.status(404).json({ message: "Official not found" });
    }

    res
      .status(200)
      .json({ message: "Official updated successfully", updatedOfficial });
  } catch (error) {
    console.error("Error updating official:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteOfficial = async (req, res) => {
  try {
    const { official_ID } = req.query;
    const deletedOfficial = await SCO.findOneAndDelete({ official_ID });
    if (!deletedOfficial) {
      return res.status(404).json({ error: "Official not found" });
    }
    res.status(200).json({ message: "Official deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete official",
      details: error.message,
    });
    console.error("Failed to delete official:", error);
  }
};

module.exports = {
  createOfficial,
  getOfficials,
  getOfficialById,
  updateOfficial,
  deleteOfficial,
};
