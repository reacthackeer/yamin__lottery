import { useSelector } from "react-redux";
import useAuthCheck from "./Store/hook/useAuthCheck";
import Loading from "./components/UtilsComponents/Loading";

const AppCover = ({children}) => {
    const authCheck = useAuthCheck(); 
    const {authChecked} = useSelector((state)=> state.auth);
    
    return authCheck && authChecked ? children : <Loading/>;
};

export default AppCover;