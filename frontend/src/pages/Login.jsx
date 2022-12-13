import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaSignInAlt } from 'react-icons/fa';

import { login, reset } from '../features/auth/authSlice';
import { Spinner } from '../components';

const Login = () => {
    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    // initialize navigate and dispatch
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // get states
    const { user, isError, isLoading, isSuccess, message} = useSelector((state) => state.auth);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // dispatch login
        const userData = { email, password};

        dispatch(login(userData));
    }

    useEffect(() => {
        if(isError) {
            toast.error(message);
        }

        if(isSuccess || user) {
            navigate('/');
        }

        // reset
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch])

    if (isLoading) {
        return <Spinner />
    }

  return (
    <>
        <section className="heading">
            <h1>
                <FaSignInAlt /> Login
            </h1>
            <p>Sign in to start setting goals</p>
        </section>

        <section className="form">
            <form onSubmit={handleSubmit}>
                
                <div className="form-group">
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email" 
                        value={email} 
                        placeholder="Enter your email"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        name="password" 
                        value={password} 
                        placeholder="Enter your password"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-block'>
                        Submit
                    </button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login