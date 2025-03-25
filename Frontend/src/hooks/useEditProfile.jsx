import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useEditProfile = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const authUser = queryClient.getQueryData(["authUser"]);

    const { mutate: editProfile, isPending } = useMutation({
        mutationFn: async (formData) => {
            try {
                console.log(formData);
                const res = await axios.post("http://localhost:5000/api/user/update", formData, { withCredentials: true });

                const data = res.data;

                if (data.error) throw new Error(data.error || "Something went wrong");

                return data;
            } catch (error) {
                throw new Error(error.message || "Something went wrong")
            }
        }, onSuccess: async() => {
            toast.success("Profile updated successfully");

            await queryClient.invalidateQueries(["userProfile"]);
            await queryClient.invalidateQueries(["authUser"]);
            
            navigate(`/profile/${authUser?.user?.username}`);
        }
    })
    return { editProfile, isPending }
};

export default useEditProfile;