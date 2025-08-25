import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedComapnyRoute = ({children}) => {
    const {user} = useSelector(store=>store.auth);
    console.log(user);
    

    const navigate = useNavigate();

    useEffect(()=>{
        if(user === null || user.role !== 'recruiter'){
            navigate("/");
        }
    },[]);

    return (
        <>
        {children}
        </>
    )
};
export default ProtectedComapnyRoute;