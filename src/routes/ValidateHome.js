import {Navigate, useParams} from "react-router-dom";
import Home from "../pages/Home";

export default function ValidateHome() {
    const {filter, page} = useParams();
    const validParams = [undefined, 'popular', 'now_playing', 'upcoming'];

    if (validParams.includes(filter) && (page === undefined || page.match(/\d+/))) {
        return (
            <Home />
        )
    }

    return <Navigate to="/" />
}