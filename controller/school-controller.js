const SCH = require("../models/school-model"); // Adjust path as needed

const createSchool = async (req, res) => {
  try {
    const existingSchool = await SCH.findOne({
      school_ID: req.body.school_ID,
    });
    if (existingSchool) {
      return res.status(400).json({ error: "School already exists" });
    }

    const school = new SCH(req.body);
    await school.save();
    res.status(201).json(school);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSchools = async (req, res) => {
  try {
    const schools = await SCH.find();
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSchoolById = async (req, res) => {
  try {
    const { school_ID } = req.query;
    const school = await SCH.findOne({ school_ID });
    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }
    res.status(200).json(school);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSchool = async (req, res) => {
  try {
    const { school_ID } = req.query;
    const updateData = req.body;

    const updatedSchool = await SCH.findOneAndUpdate(
      { school_ID },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSchool) {
      return res.status(404).json({ message: "School not found" });
    }

    res
      .status(200)
      .json({ message: "School updated successfully", updatedSchool });
  } catch (error) {
    console.error("Error updating school:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteSchool = async (req, res) => {
  try {
    const { school_ID } = req.query;
    const deletedSchool = await SCH.findOneAndDelete({ school_ID });
    if (!deletedSchool) {
      return res.status(404).json({ error: "School not found" });
    }
    res.status(200).json({ message: "School deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete school",
      details: error.message,
    });
    console.error("Failed to delete school:", error);
  }
};

module.exports = {
  createSchool,
  getSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
};
