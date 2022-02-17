import './Auth.css';
import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import pathToDisplayName from "../helpers/pathToDisplayName";
import {useDispatch, useSelector} from "react-redux";
import {signIn, signUp} from "../slices/currentUserSlice";

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
    const currentUser = useSelector(state => state.currentUser);

    const canAuth =
        Object.values(formValues).every(Boolean) &&
        ['idle', 'failed'].includes(currentUser.status) &&
        !currentUser.isLoggedIn;

    async function handleSubmit(e) {
        e.preventDefault();
        if (canAuth) {
            if (pathname === '/sign-in') {
                await dispatch(signIn(formValues))
            } else {
                await dispatch(signUp(formValues))
            }
            if (currentUser.status === 'succeeded') {
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
                    {(currentUser.error && currentUser.error.includes('email')) && <span className="auth_error">{currentUser.error}</span>}
                </div>
                <div className="auth__input">
                    <label htmlFor="email">Password:</label>
                    <input type="password" name="password" value={formValues.password} onChange={handleChange}  />
                    {(currentUser.error && currentUser.error.includes('password')) && <span className="auth_error">{currentUser.error}</span>}
                </div>
                <div className="auth__buttons">
                    <button type="submit" className="button button-primary" disabled={currentUser.status === 'loading'}>
                        {currentUser.status === 'loading' ? 'Loading...' : pathToDisplayName(pathname)}
                    </button>
                    <Link to={linkToOtherPage} className="button button-secondary" onClick={(e) => e.target.blur()}>
                        {pathToDisplayName(linkToOtherPage)}
                    </Link>
                </div>
            </form>
        </div>
    )
}
