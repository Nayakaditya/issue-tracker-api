const Project = require("../../../models/project-schema");

module.exports = {
  getAllProjects: async function (req, res) {
    const project = await Project.find();

    res.status(200).json({
      success: true,
      project,
    });
  },

  cretaeProject: async function (req, res) {
    try {
      const { title, description, author } = req.body;
      await Project.create({ title, description, author });

      res.status(200).json({
        success: true,
        message: "Project Created Successfully",
      });
    } catch (error) {
      if (error.code === 11000) {
        res.status(500).json({
          success: false,
          message: "Duplicate element found",
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Error in creating project",
        });
      }
    }
  },

  getProjectDetails: async function (req, res) {
    try {
      const project = await Project.findById(req.params.id);

      if (!project) {
        res.status(404).json({
          success: false,
          message: `Cannot find the project with this => ${project.id} id `,
        });
      }

      const { id, title, description, author } = project;
      res.status(200).json({
        success: true,
        id,
        title,
        description,
        author,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in finding project",
      });
    }
  },

  deleteProject: async function (req, res) {
    try {
      const project = await Project.findById(req.params.id);

      if (!project) {
        res.status(404).json({
          success: false,
          message: "Cannot find the project",
        });
      }

      await Project.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: `Project deleted with id ${project.id}`,
        deletedAt: new Date(),
      });

      await project.save();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Some wrong with deleting project",
        error: error.message,
      });
    }
  },

  searchProject: async function (req, res) {
    const { q } = req.query;
    const regex = new RegExp(q, "i");

    const results = await Project.find({
      $or: [{ title: { $regex: regex } }, { description: { $regex: regex } }],
    }).populate("issues");

    if (results.length === 0) {
      res.status(404).json({
        success: false,
        message: "This project is not available",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "found",
      results,
    });
  },

  filterByAuthor: async function (req, res) {
    try {
      const { author } = req.query; // get the author parameter from the request query
      const authorRegexp = new RegExp(author, "i");
      const projects = await Project.find({
        author: { $regex: authorRegexp },
      }).populate("issues"); // find all projects with the matching author and populate the "issues" field with Issue documents

      res.status(200).json({ success: true, data: projects });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  filterByLabels: async function (req, res) {
    try {
      const labels = req.query.labels;
      const labelsArray = labels.split(",");
      const projects = await Project.find({
        labels: { $in: labelsArray },
      }).populate("issues");

      res.status(200).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },
};
