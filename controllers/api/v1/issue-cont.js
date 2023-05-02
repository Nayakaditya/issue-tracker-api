const Issue = require("../../../models/issue-schema");
const Project = require("../../../models/project-schema");

module.exports = {
  createIssue: async function (req, res) {
    try {
      const project = await Project.findById(req.params.id);

      if (!project) {
        res.status(404).json({
          success: false,
          message: "It seems like this project is not available",
        });
        return;
      }

      const issue = await Issue.create(req.body);

      project.issues.push({
        _id: issue._id,
      });

      res.status(200).json({
        success: true,
        message: "Issue created and added to project successfully",
        issueId: issue._id,
      });

      await project.save();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in creating an issue",
        error,
      });
    }
  },

  issueDetails: async function (req, res) {
    try {
      const project = await Project.findById(req.params.id);

      if (!project) {
        res.status(404).json({
          success: false,
          message: "It seems like this project is not available",
        });
        return;
      }

      const issue = await Issue.findById(req.params.issueId);

      if (!issue) {
        res.status(404).json({
          success: false,
          message: "It seems like this issue is not available",
        });
        return;
      }

      const found = {
        success: true,
        project,
        issue,
      };

      res
        .status(200)
        .json({
          found,
        })
        .end();
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Error in finding an issue",
          error,
        })
        .end();
    }
  },

  deleteIssue: async function (req, res) {
    try {
      const project = await Project.findById(req.params.id);

      if (!project) {
        res.status(404).json({
          success: false,
          message: "It seems like this project is not available",
        });
        return;
      }

      const issue = await Issue.findById(req.params.issueId);

      if (!issue) {
        res.status(404).json({
          success: false,
          message: "It seems like this issue is not available",
        });

        return;
      }

      await Issue.deleteOne({ _id: req.params.issueId });

      project.issues.pull(req.params.issueId);

      await project.save();

      res.status(200).json({
        success: true,
        message: `Issue deleted with id ${issue._id}`,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in deleting issue",
        error,
      });
    }
  },
};
