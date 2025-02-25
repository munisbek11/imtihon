const Post = require("../models/Post");
const path = require("path");

exports.getInitialPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(5);
    const totalPosts = await Post.countDocuments();

    res.json({
      posts,
      hasMore: posts.length < totalPosts,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPostBySlug = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      const err = new Error("Bunday post topilmadi");
      err.statusCode = 404;
      return next(err);
    }

    post.views += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    next(error);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, category, content, tags, highlighted } = req.body;

    // let imagePath = "";

    // if (req.file) {
    //   imagePath = `/uploads/${req.file.filename}`;
    // } else {
    //   const err = new Error("Rasm yuklanmagan");
    //   err.statusCode = 400;
    //   return next(err);
    // }

    const newPost = new Post({
      title,
      category,
      content,
      tags,
      highlighted,
    });

    await newPost.save();

    res
      .status(201)
      .json({ message: "Post muvaffaqiyatli yaratildi", post: newPost });
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { title, category, content, tags, image, highlighted } = req.body;
    const { slug } = req.params;

    let post = await Post.findOne({ slug });
    if (!post) {
      const err = new Error("Bunday post topilmadi");
      err.statusCode = 404;
      return next(err);
    }

    if (title) post.title = title;
    if (category) {
      const allowedCategories = [
        "Sud-huquq",
        "Ijtimoiy-iqtisodiy",
        "Boshqa",
        "Talim",
        "Siyosat",
        "Xorij",
      ];
      if (!allowedCategories.includes(category)) {
        const err = new Error("Bunday category yo'q");
        err.statusCode = 400;
        return next(err);
      }
      post.category = category;
    }
    if (image) post.image = image;
    if (content) post.content = content;
    if (tags) post.tags = tags;
    if (highlighted !== undefined) post.highlighted = highlighted;

    await post.save();

    res.json({ message: "Post yangilandi", post });
  } catch (error) {
    next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const post = await Post.findOneAndDelete({ slug });
    if (!post) {
      const err = new Error("Bunday post topilmadi");
      err.statusCode = 404;
      return next(err);
    }

    res.json({ message: "Post o‘chirildi" });
  } catch (error) {
    next(error);
  }
};

exports.getDolzarbPosts = async (req, res, next) => {
  try {
    const dolzarbPosts = await Post.find({ highlighted: true }).sort({
      date: -1,
    });
    res.json(dolzarbPosts);
  } catch (error) {
    next(error);
  }
};

exports.searchFunc = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      const err = new Error("Qidiruv uchun matn kiriting");
      err.statusCode = 400;
      return next(err);
    }

    const regex = new RegExp(query, "i");
    const posts = await Post.find({ title: { $regex: regex } });

    if (posts.length === 0) {
      const err = new Error("Mos postlar topilmadi");
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
