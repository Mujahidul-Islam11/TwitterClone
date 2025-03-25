import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

const useEditProfile = () => {
    const queryClient = useQueryClient();

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
        }, onSuccess: () => {
            toast.success("Profile updated successfully");
            queryClient.invalidateQueries(["authUser"]);
        }
    })
    return { editProfile, isPending }
};

export default useEditProfile;