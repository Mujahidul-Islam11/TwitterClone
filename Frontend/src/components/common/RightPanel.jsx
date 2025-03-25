import { Link } from "react-router-dom";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const RightPanel = () => {

	const { data: users, isLoading } = useQuery({
		queryKey: ["suggestedUser"],
		queryFn: async () => {
			try {
				const res = await axios.get("http://localhost:5000/api/user/suggested", {withCredentials: true});

				if (res.data.error) throw new Error(res.data.error || "Something went wrong")

				return res.data

			} catch (err) {
				console.log(err.message)
			}
		}
	})

	const {mutate: followUnfollowUser} = useMutation({
		mutationFn: async(userId)=>{
			try {
				const res = await axios.post(`http://localhost:5000/api/user/follow/${userId}`, {}, {withCredentials: true})
				const data = res.data;

				console.log(data)

				if(data.error) throw new Error(data.error || "Something went wrong");

				return data;
				
			} catch (error) {
				console.log(error.message || "Something went wrong")
				throw new Error(error.message || "Something went wrong")
			}
		}
	})
    
	if(users?.length === 0) return <div className="md:w-64 w-0"></div>

	const handleFollowUnFollow = (userId) =>{
		followUnfollowUser(userId)
	}

	return (
		<div className='hidden lg:block my-4 mx-2'>
			<div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
				<p className='font-bold'>Who to follow</p>
				<div className='flex flex-col gap-4'>
					{/* item */}
					{isLoading && (
						<>
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
						</>
					)}
					{!isLoading &&
						users?.map((user) => (
							<Link
								to={`/profile/${user.username}`}
								className='flex items-center justify-between gap-4'
								key={user._id}
							>
								<div className='flex gap-2 items-center'>
									<div className='avatar'>
										<div className='w-8 rounded-full'>
											<img src={user.profileImg || "/avatar-placeholder.png"} />
										</div>
									</div>
									<div className='flex flex-col'>
										<span className='font-semibold tracking-tight truncate w-28'>
											{user.fullName}
										</span>
										<span className='text-sm text-slate-500'>@{user.username}</span>
									</div>
								</div>
								<div>
									<button
										className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
										onClick={(e) => {
											e.preventDefault();
											handleFollowUnFollow(user._id)
										}}
									>
										Follow
									</button>
								</div>
							</Link>
						))}
				</div>
			</div>
		</div>
	);
};
export default RightPanel;