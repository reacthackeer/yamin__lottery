import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useValidateUserMutation } from "../../Store/feature/auth/api";
import { setLoginUser, setUserLoggedOut } from "../../Store/feature/auth/authSlice";
import useAuthCheck from "../../Store/hook/useAuthCheckAuth";

const CheckAdminIsLoggedIn = ({children}) => {
    const isLoggedIn = useAuthCheck({graterThanRole: 2});
    const [validateToken, setValidateToken] = useState(true);
    const [provideTokenId, {data, isLoading, isSuccess, isError}] = useValidateUserMutation();
    const {auth, isLoggedIn: stateIsLoggedIn, authChecked} = useSelector((state)=> state.auth);
    
    const dispatch = useDispatch();
    useEffect(()=>{
        if(auth && stateIsLoggedIn && authChecked){
            provideTokenId(auth.tokenId);
        }
    },[]);

    useEffect(()=>{ 
        if(!isLoading && isError && !isSuccess){ 
            setValidateToken(()=> false) 
            dispatch(setUserLoggedOut())
            localStorage.removeItem('auth');
        } 
        if(!isLoading && isSuccess && !isError){  
            localStorage.setItem('auth', JSON.stringify(data));
            dispatch(setLoginUser(data));
        }
    },[data, isError, isSuccess, isLoading])

    const navigate = useNavigate();
    return isLoggedIn && validateToken ? children : navigate('/login')
};

export default CheckAdminIsLoggedIn;