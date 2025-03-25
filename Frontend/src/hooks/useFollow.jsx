import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useFollow = () => {
    const queryClient = useQueryClient();

    const {mutate: followUnfollowUser, isPending} = useMutation({
		mutationFn: async(userId)=>{
			try {
				const res = await axios.post(`http://localhost:5000/api/user/follow/${userId}`, {}, {withCredentials: true})
				const data = res.data;

				if(data.error) throw new Error(data.error || "Something went wrong");

				return data;
				
			} catch (error) {
				console.log(error.message || "Something went wrong")
				throw new Error(error.message || "Something went wrong")
			}
		},
        onSuccess: ()=>{
            queryClient.invalidateQueries(["authUser"]);
            queryClient.invalidateQueries(["suggestedUser"]);
        }
	})

    return {followUnfollowUser, isPending}
};

export default useFollow;