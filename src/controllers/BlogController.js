const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/api");
const Blog = require("../models/BlogModel");
const User = require("../models/UserModel");

exports.CreateBlog = async (req, res) => {
  const { title, content } = req.body;
  const email = req.headers.email;
  try {
    await User.aggregate([{ $match: { email } }], (err, data) => {
      if (!err) {
        const author = data[0].name;
        Blog.create({ title, content, author, email }, (err, data) => {
          if (!err) {
            res.status(200).json({
              message: "Blog Post Create Successfully",
              data: data,
            });
          } else {
            res.status(400).json({
              message: "Failed to create",
              data: err,
            });
          }
        });
      }
    });
  } catch (error) {
    res.status(400).json |
      {
        message: "Create Failed",
        data: error,
      };
  }
};

exports.UpdateBlog = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    await Blog.findByIdAndUpdate({ _id: id }, body).then((data) => {
      res.status(201).json({
        message: "Blog post created successfully",
        data: data,
      });
    });
  } catch (err) {
    res.status(400).json({
      message: "Blog post created failed",
      data: err,
    });
  }
};

exports.DeleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    await Blog.findByIdAndDelete({ _id: id }).then((result) => {
      if (result != null) {
        res.status(201).json({
          message: "Blog post delete successfully",
          data: result,
        });
      } else {
        res.status(400).json({
          message: "Blog post deleted failed",
          data: err,
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      data: err,
    });
  }
};

exports.SelectedBlog = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await Blog.find({ _id: id }).then((data) => {
      res.status(400).json({
        message: "Selected Post",
        data: data,
      });
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong!",
      data: err,
    });
  }
};


exports.getAllPost = async(req, res) => {
  const { email } = req.headers;
  await Blog.aggregate([{ $match: { email } }]).then((data) => {
    res.status(200).json({
      message: "All tasks getting success!",
      data:data
    })
  }).catch((err) => {
    res.status(200).json({
      message: "All tasks getting failed!",
      data:err
    })
  })
}