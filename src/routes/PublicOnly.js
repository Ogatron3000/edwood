import {useSelector} from "react-redux";
import {Outlet, Navigate} from "react-router-dom";

export default function PublicOnly() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    if (isLoggedIn) {
        return <Navigate to='/' />
    }

    return <Outlet />
}