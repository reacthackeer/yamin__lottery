import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAuthChecked, setLoginUser } from "../feature/auth/authSlice";

const useAuthCheck = () => {
    const [authCheck, setAuthCheck] = useState(false);
    const dispatch = useDispatch(); 
    useEffect(()=>{
        let authInfo = JSON.parse(localStorage.getItem('auth')) || {};
        if(authInfo && authInfo?.id){ 
            dispatch(setLoginUser(authInfo));
            setAuthCheck(()=> true);
        }else{
            setAuthCheck(()=> true);
            dispatch(setAuthChecked(true));
        }
    },[dispatch])
    return authCheck;
};

export default useAuthCheck;