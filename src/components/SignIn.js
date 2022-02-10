import {useState} from "react";

export default function SignIn() {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    })

    function handleChange(e) {
        setFormValues(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    return (
        <div style={{background: 'black'}}>
            <form>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email" value={formValues.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email">Password:</label>
                    <input type="password" name="password" value={formValues.password} onChange={handleChange}  />
                </div>
            </form>
        </div>
    )
}