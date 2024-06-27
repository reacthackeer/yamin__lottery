// useUserPrivateRouteCheck.js
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useAuthCheck = ({graterThanRole}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const {auth,isLoggedIn: authIsLoggedIn, authChecked} = useSelector((state)=> state.auth);
    useEffect(()=>{
        if(auth && auth?.tokenId && auth?.role && auth?.role < graterThanRole && authIsLoggedIn && authChecked){
            setIsLoggedIn(()=> true);
        }else{
            setIsLoggedIn(()=> false);
        }
    },[auth, graterThanRole])
    return isLoggedIn;
};

export default useAuthCheck;
