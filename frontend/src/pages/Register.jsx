import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';

import { register, reset } from '../features/auth/authSlice';
import { Spinner } from '../components';

const Register = () => {
    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    // initialize navigate and dispatch
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // get we want from state with useselector
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // dispatch register
        if (password !== password2) {
            toast.error('Passwords do not match');
        }
        else {
            const userData = { name, email, password };

            dispatch(register(userData))
        }
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
                <FaUser /> Register
            </h1>
            <p>Kindly create an account</p>
        </section>

        <section className="form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name="name" 
                        value={name} 
                        placeholder="Enter your name"
                        onChange={handleChange}
                    />
                </div>
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
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password2" 
                        name="password2" 
                        value={password2} 
                        placeholder="Confirm password"
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

export default Register