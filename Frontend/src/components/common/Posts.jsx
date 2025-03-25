import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

const Posts = ({ feedType, username, userId }) => {

	const getPostsEndPoints = () => {
		switch (feedType) {
			case "forYou":
				return "http://localhost:5000/api/post/all";
			case "following":
				return "http://localhost:5000/api/post/following";
			case "posts":
				return `http://localhost:5000/api/post/user/${username}`;
			case "likes":
				return `http://localhost:5000/api/post/liked/${userId}`;
			default:
				return "http://localhost:5000/api/post/all"
		}
	}

	const postEndPoints = getPostsEndPoints();

	const { data: POSTS, isLoading, refetch } = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			try {
				const res = await axios.get(postEndPoints, {
					withCredentials: true
				});

				const data = res.data;

				if (data.error) throw new Error(data.error || "Something went wrong");

				return data;
			} catch (error) {
				throw new Error(error.response.message || error.message || "Something went wrong")
			}
		}
	});

	useEffect(()=>{
		refetch();
	},[feedType, refetch, username, userId]);

	return (
		<>
			{isLoading && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && POSTS?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && POSTS && (
				<div>
					{POSTS.map((post) => (
						<Post key={post._id} post={post} refetch={refetch}/>
					))}
				</div>
			)}
		</>
	);
};
export default Posts;