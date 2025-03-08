const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const protectAPIsMiddleware = require("../middleware/protectAPI");

router.use(bodyParser.json());
// router.use(protectAPIsMiddleware);
router.use(bodyParser.urlencoded({ extended: false }));

// * IMPORTING CONTROLLERS - SIMULATION 😎
const userController = require("../controller/user-controller");
const schoolController = require("../controller/school-controller");
const OfficialController = require("../controller/officials-controller");
const supervisorsController = require("../controller/supervisors-controller");
const studentController = require("../controller/student-controller");

// * CREATING ROUTES -  😎 ============================================
router.route("/createUser").post(userController.createUser);
router.route("/authenticate").post(userController.checkPassword);
router.route("/get-all-users").get(userController.getUsers);
router.route("/get-user").get(userController.getUserById);
router.route("/update-user").put(userController.updateUser);
router.route("/delete-user").delete(userController.deleteUser);

// * CREATING ROUTES -  😎 ============================================
router.route("/create-school").post(schoolController.createSchool);
router.route("/get-all-schools").get(schoolController.getSchools);
router.route("/get-school").get(schoolController.getSchoolById);
router.route("/update-school").put(schoolController.updateSchool);
router.route("/delete-school").delete(schoolController.deleteSchool);

// * CREATING ROUTES -  😎 ============================================
router.route("/create-officials").post(OfficialController.createOfficial);
router.route("/get-all-officials").get(OfficialController.getOfficials);
router.route("/get-officials").get(OfficialController.getOfficialById);
router.route("/update-officials").put(OfficialController.updateOfficial);
router.route("/delete-officials").delete(OfficialController.deleteOfficial);

// * CREATING ROUTES -  😎 ============================================
router.route("/create-supervisor").post(supervisorsController.createSupervisor);
router.route("/get-all-supervisor").get(supervisorsController.getSupervisors);
router.route("/get-supervisor").get(supervisorsController.getSupervisorById);
router.route("/update-supervisor").put(supervisorsController.updateSupervisor);
router.route("/delete-supervisor").delete(supervisorsController.deleteSupervisor);

// * CREATING ROUTES -  😎 ============================================
router.route("/create-student").post(studentController.createStudent);
router.route("/get-all-student").get(studentController.getStudents);
router.route("/get-student").get(studentController.getStudentById);
router.route("/update-student").put(studentController.updateStudent);
router.route("/delete-student").delete(studentController.deleteStudent);

module.exports = router;
