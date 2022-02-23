import './Auth.css';
import {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import pathToDisplayName from "../helpers/pathToDisplayName";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../slices/authSlice";

export default function Auth() {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    })

    function handleChange(e) {
        setFormValues(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const { pathname } = useLocation();
    let linkToOtherPage = pathname === '/sign-in' ? '/sign-up' : '/sign-in';

    const dispatch = useDispatch();
    const {status, isLoggedIn, error} = useSelector(state => state.auth);
    const navigate = useNavigate()

    const canAuth =
        Object.values(formValues).every(Boolean) &&
        ['idle', 'failed'].includes(status) &&
        !isLoggedIn;

    async function handleSubmit(e) {
        e.preventDefault();
        if (canAuth) {
            await dispatch(auth({formValues, pathname}))
            if (status === 'succeeded') {
                setFormValues({email: '', password: ''})
                navigate('/')
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
                    {(error && error.toLowerCase().includes('email')) && <span className="auth_error">{error}</span>}
                </div>
                <div className="auth__input">
                    <label htmlFor="email">Password:</label>
                    <input type="password" name="password" value={formValues.password} onChange={handleChange}  />
                    {(error && error.toLowerCase().includes('password')) && <span className="auth_error">{error}</span>}
                </div>
                <div className="auth__buttons">
                    <button type="submit" className="button button-primary" disabled={status === 'loading'}>
                        {status === 'loading' ? 'Loading...' : pathToDisplayName(pathname)}
                    </button>
                    <Link to={linkToOtherPage} className="button button-secondary" onClick={(e) => e.target.blur()}>
                        {pathToDisplayName(linkToOtherPage)}
                    </Link>
                </div>
            </form>
        </div>
    )
}
