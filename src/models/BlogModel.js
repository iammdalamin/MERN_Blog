const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required:true

  },
  author: {
    type: String,
  },
  email: {
    type: String,
  }
 
}, {
  timestamps: true,
versionKey:false});


const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;
