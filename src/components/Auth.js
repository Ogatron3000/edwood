import './Auth.css';
import {Link, useLocation, useNavigate} from "react-router-dom";
import pathToDisplayName from "../helpers/pathToDisplayName";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../slices/authSlice";
import {useForm} from "react-hook-form";

export default function Auth() {
    const { pathname } = useLocation();
    let linkToOtherPage = pathname === '/sign-in' ? '/sign-up' : '/sign-in';

    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const dispatch = useDispatch();
    const {status, isLoggedIn} = useSelector(state => state.auth);
    const navigate = useNavigate()

    const canAuth = ['idle', 'failed'].includes(status) && !isLoggedIn;

    async function onSubmit(data) {
        if (canAuth) {
            try {
                await dispatch(auth({formValues: data, pathname})).unwrap()
            } catch (e) {
                let key = Object.keys(e)[0]
                setError(key, {
                    type: 'server',
                    message: e[key]
                })
            }
            if (status === 'succeeded') {
                navigate('/')
            }
        }
    }

    return (
        <div className="auth">
            <h1 className="auth__title">{pathToDisplayName(pathname)}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="auth__input">
                    <label htmlFor="email">Email:</label>
                    <input type="email" {...register("email", {
                        required: {
                            value: true,
                            message: 'Email is required.'
                        },
                    })} />
                    {errors.email && <span className="auth_error">{errors.email.message}</span>}
                </div>
                <div className="auth__input">
                    <label htmlFor="password">Password:</label>
                    <input type="password" {...register("password", {
                        required: {
                            value: true,
                            message: 'Password is required.'
                        },
                        minLength: {
                            value: pathname === '/sign-in' ? null : 6,
                            message: 'Password must be at least 6 characters long.'
                        }
                    })}  />
                    {errors.password && <span className="auth_error">{errors.password.message}</span>}
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
