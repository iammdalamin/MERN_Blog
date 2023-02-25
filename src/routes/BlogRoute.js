const express = require("express");
const { CreateBlog, UpdateBlog, DeleteBlog, SelectedBlog, getAllPost } = require("../controllers/BlogController");
const { requireSignIn } = require("../middlewares/AuthVerify");
const router = express.Router();



router.post("/create-post", requireSignIn ,CreateBlog)
router.get("/all-post", requireSignIn ,getAllPost)
router.put("/update-blog-post/:id", requireSignIn ,UpdateBlog)
router.delete("/delete-blog-post/:id", requireSignIn ,DeleteBlog)
router.delete("/post/:id", requireSignIn ,SelectedBlog)


module.exports = router;