import { authKey } from "@/constance/authKey";
import { decodedToken } from "@/utils/jwt";
import { getFromLocalStorage, removeUserFromLocalStorage, setToLocalStorage } from "@/utils/local-storage"

export const storeuserInfo = ({ accessToken }: { accessToken: string }) => {
    setToLocalStorage(authKey, accessToken);
}

export const getUserInfo = () => {
    const authToken = getFromLocalStorage(authKey);
    if (authToken) {
        const decodedData: any = decodedToken(authToken);
        return {
            ...decodedData,
            role: decodedData?.role.toLowerCase(),
        }
    }
}

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authKey);
    if (authToken) {
    };
    return !!authToken;
}

export const removeUser = () => {
    return removeUserFromLocalStorage(authKey);
};