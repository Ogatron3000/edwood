import {useSelector} from "react-redux";
import {Outlet, Navigate} from "react-router-dom";

export default function RequiredAuth() {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to='/sign-in' />
    }

    return <Outlet />
}
