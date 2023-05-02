const express = require("express");
const router = express.Router();
const {
  cretaeProject,
  getProjectDetails,
  deleteProject,
  getAllProjects,
  searchProject,
  filterByAuthor,
  filterByLabels,
} = require("../../../controllers/api/v1/project-cont");

router.route("/projects").get(getAllProjects);
router.route("/project/new").post(cretaeProject);
router.route("/project/:id").get(getProjectDetails);
router.route("/project/:id/delete").delete(deleteProject);
router.route("/projects/search").get(searchProject);
router.route("/projects/author").get(filterByAuthor);
router.route("/projects/labels").get(filterByLabels);

module.exports = router;
