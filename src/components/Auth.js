import './Auth.css';
import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import pathToDisplayName from "../helpers/pathToDisplayName";
import {useDispatch, useSelector} from "react-redux";
import {signIn, signUp} from "../slices/authSlice";

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

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const canAuth =
        Object.values(formValues).every(Boolean) &&
        ['idle', 'failed'].includes(auth.status) &&
        !auth.isLoggedIn;

    async function handleSubmit(e) {
        e.preventDefault();
        if (canAuth) {
            if (pathname === '/sign-in') {
                await dispatch(signIn(formValues))
            } else {
                await dispatch(signUp(formValues))
            }
            if (auth.status === 'succeeded') {
                setFormValues({email: '', password: ''})
            }
        }
    }

    return (
        <div className="auth">
            <h1 className="auth__title">{pathToDisplayName(pathname)}</h1>
            <form onSubmit={handleSubmit}>
                <div className="auth__input">
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" value={formValues.email} onChange={handleChange} />
                    {(auth.error && auth.error.includes('email')) && <span className="auth_error">{auth.error}</span>}
                </div>
                <div className="auth__input">
                    <label htmlFor="email">Password:</label>
                    <input type="password" name="password" value={formValues.password} onChange={handleChange}  />
                    {(auth.error && auth.error.includes('password')) && <span className="auth_error">{auth.error}</span>}
                </div>
                <div className="auth__buttons">
                    <button type="submit" className="button button-primary" disabled={auth.status === 'loading'}>
                        {auth.status === 'loading' ? 'Loading...' : pathToDisplayName(pathname)}
                    </button>
                    <Link to={linkToOtherPage} className="button button-secondary" onClick={(e) => e.target.blur()}>
                        {pathToDisplayName(linkToOtherPage)}
                    </Link>
                </div>
            </form>
        </div>
    )
}
