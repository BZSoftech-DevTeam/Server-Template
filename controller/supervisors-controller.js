const SPV = require("../models/supervisors"); // Adjust path as needed

const createSupervisor = async (req, res) => {
  try {
    const existingSupervisor = await SPV.findOne({
      sup_ID: req.body.sup_ID,
    });
    if (existingSupervisor) {
      return res.status(400).json({ error: "Supervisor already exists" });
    }

    const supervisor = new SPV(req.body);
    await supervisor.save();
    res.status(201).json(supervisor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSupervisors = async (req, res) => {
  try {
    const supervisors = await SPV.find();
    res.status(200).json(supervisors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSupervisorById = async (req, res) => {
  try {
    const { sup_ID } = req.query;
    const supervisor = await SPV.findOne({ sup_ID });
    if (!supervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }
    res.status(200).json(supervisor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSupervisor = async (req, res) => {
  try {
    const { sup_ID } = req.query;
    const updateData = req.body;

    const updatedSupervisor = await SPV.findOneAndUpdate(
      { sup_ID },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSupervisor) {
      return res.status(404).json({ message: "Supervisor not found" });
    }

    res
      .status(200)
      .json({ message: "Supervisor updated successfully", updatedSupervisor });
  } catch (error) {
    console.error("Error updating supervisor:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteSupervisor = async (req, res) => {
  try {
    const { sup_ID } = req.query;
    const deletedSupervisor = await SPV.findOneAndDelete({ sup_ID });
    if (!deletedSupervisor) {
      return res.status(404).json({ error: "Supervisor not found" });
    }
    res.status(200).json({ message: "Supervisor deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete supervisor",
      details: error.message,
    });
    console.error("Failed to delete supervisor:", error);
  }
};

module.exports = {
  createSupervisor,
  getSupervisors,
  getSupervisorById,
  updateSupervisor,
  deleteSupervisor,
};
