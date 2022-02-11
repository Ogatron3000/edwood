import {Navigate, useParams} from "react-router-dom";
import Home from "./Home";

export default function ValidateHome() {
    const {filter, page} = useParams();
    const validParams = [undefined, 'popular', 'now_playing', 'upcoming'];

    // && page.match(/\d+/)

    if (validParams.includes(filter)) {
        return (
            <Home />
        )
    }

    return <Navigate to="/" />
}