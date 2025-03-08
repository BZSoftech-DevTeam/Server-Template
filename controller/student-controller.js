const STD = require("../models/students"); // Adjust path as needed

const createStudent = async (req, res) => {
  try {
    const existingStudent = await STD.findOne({
      official_ID: req.body.official_ID,
    });
    if (existingStudent) {
      return res.status(400).json({ error: "Student already exists" });
    }

    const student = new STD(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await STD.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { official_ID } = req.query;
    const student = await STD.findOne({ official_ID });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { official_ID } = req.query;
    const updateData = req.body;

    const updatedStudent = await STD.findOneAndUpdate(
      { official_ID },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res
      .status(200)
      .json({ message: "Student updated successfully", updatedStudent });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { official_ID } = req.query;
    const deletedStudent = await STD.findOneAndDelete({ official_ID });
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete student",
      details: error.message,
    });
    console.error("Failed to delete student:", error);
  }
};

module.exports = {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
