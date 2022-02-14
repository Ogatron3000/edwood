import './Auth.css';
import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import pathToDisplayName from "../helpers/pathToDisplayName";

export default function Auth() {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    })

    const { pathname } = useLocation();

    function handleChange(e) {
        setFormValues(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    let linkToOtherPage = pathname === '/sign-in' ? '/sign-up' : '/sign-in';

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formValues.email)
        console.log(formValues.password)
    }

    return (
        <div className="auth">
            <h1 className="auth__title">{pathToDisplayName(pathname)}</h1>
            <form onSubmit={handleSubmit}>
                <div className="auth__input">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" value={formValues.email} onChange={handleChange} />
                </div>
                <div className="auth__input">
                    <label htmlFor="email">Password:</label>
                    <input type="password" name="password" value={formValues.password} onChange={handleChange}  />
                </div>
                <div className="auth__buttons">
                    <button type="submit" className="button button-primary">
                        {pathToDisplayName(pathname)}
                    </button>
                    <Link to={linkToOtherPage} className="button button-secondary" onClick={(e) => e.target.blur()}>
                        {pathToDisplayName(linkToOtherPage)}
                    </Link>
                </div>
            </form>
        </div>
    )
}