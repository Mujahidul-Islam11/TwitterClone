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

const deletePost = async (req, res) => {
    try{
		const post = await Post.findById(req.params.id);
		if (!post) return res.status(404).json({ error: "Post not found" });

		if (post.user.toString() !== req.user._id.toString()) {
			return res.status(400).json({ error: "You are not authorized to delete this post" });
		}

		if (post.img) {
			const imgId = post.img.split('/').pop().split('.')[0];
            await cloudinary.destroy(imgId);
		}

		await Post.findByIdAndDelete(req.params.id);
		res.status(200).json({message: "Post deleted successfully"});

    }catch(err){
        res.status(500).json({error: "Internal Server Error"});
        console.log(err)
    }
};

const commentOnPost = async (req, res) => {
    try{
        const {text} = req.body;
		const postId = req.params.id;
        const userId = req.user._id;

        if(!text){
            return res.status(404).json({
             error: "Text field is required"
            })
        }

        const post = await Post.findById(postId);

		if (!post) return res.status(404).json({ error: "Post not found" });
        
        const comment = {
            user: userId,
            text
        };

		post.comments.push(comment);
		await post.save();
		res.status(200).json({post});

    }catch(err){
        res.status(500).json({error: "Internal Server Error"});
        console.log(err)
    }
};

module.exports = {
    createPost, deletePost, commentOnPost
}