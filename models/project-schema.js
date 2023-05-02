const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Prject Title cannot be empty"],
      max: 255,
      unique: [true, "This project is already there!"],
    },
    description: {
      type: String,
      required: [true, "Project Description cannot be empty"],
    },
    author: {
      type: String,
      required: [true, "Project author cannot be empty"],
    },
    issues: [
      {
        type: Schema.Types.ObjectId,
        ref: "Issue",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
