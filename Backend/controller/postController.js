const Post = require("../models/post.model");
const User = require("../models/user.model");
const {v2} = require("cloudinary")
const cloudinary = v2;

const createPost = async (req, res) => {
    try{
        const { text } = req.body;
		let { img } = req.body;
		const userId = req.user._id.toString();

		const user = await User.findById(userId);
		if (!user) return res.status(404).json({ message: "User not found" });

		if (!text && !img) {
			return res.status(400).json({ error: "Post must have text or image" });
		}

		if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img);
			img = uploadedResponse.secure_url;
		}

		const newPost = new Post({
			user: userId,
			text,
			img,
		});

		await newPost.save();
		res.status(201).json(newPost);

    }catch(err){
        res.status(500).json({error: "Internal Server Error"});
        console.log(err)
    }
};

module.exports = {
    createPost
}