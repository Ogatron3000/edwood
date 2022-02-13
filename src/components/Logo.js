import './Logo.css';
import {Link} from "react-router-dom";

export default function Logo() {
    return (
        <h1 className="logo"><Link to='/' tabIndex="-1">EDWD</Link></h1>
    )
}
