const express = require("express");
const router = express.Router();
const {
  createIssue,
  issueDetails,
  deleteIssue,
} = require("../../../controllers/api/v1/issue-cont");

router.route("/project/:id/issue/new").post(createIssue);
router.route("/porject/:id/issue/:issueId").get(issueDetails);
router.route("/project/:id/issue/:issueId/delete").delete(deleteIssue);

module.exports = router;
