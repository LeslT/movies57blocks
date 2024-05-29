import { getUserAuth } from "../api/AuthAPI";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
    const {data, isError, isLoading } = useQuery({
        queryKey: ['userauth'],
        queryFn: getUserAuth,
        retry: false,
        refetchOnWindowFocus: false
    })
    return {data, isError, isLoading}
}