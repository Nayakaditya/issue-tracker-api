const mongoose = require("mongoose");
const { Schema } = mongoose;

const issueSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Issue Title cannot be empty"],
      unique: [true, "The Issue with same title already present."],
    },
    description: {
      type: String,
      required: [true, "Issue Description cannot be empty"],
    },
    labels: {
      type: String,
      enum: [
        "bug",
        "documentation",
        "enhancement",
        "good first issue",
        "help wanted",
        "question",
        "invalid",
        "wontfix",
      ],
      default: "bug",
    },
    author: {
      type: String,
      required: [true, "Author name cannot be empty"],
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Issue", issueSchema);
