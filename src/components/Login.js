import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '~/store/actions/authAction';
import { ERROR_MESSAGE_CLEAR, SUCCESS_MESSAGE_CLEAR } from '~/store/types/authType';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();

    const { successMessage, error, authenticate } = useSelector((state) => state.auth);

    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const login = (e) => {
        e.preventDefault();
        dispatch(userLogin(state));
    };

    useEffect(() => {
        if (authenticate) navigate('/');

        if (successMessage) {
            alert.success(successMessage);
            dispatch({ type: SUCCESS_MESSAGE_CLEAR });
        }

        if (error) {
            error.map((err) => alert.error(err));
            dispatch({ type: ERROR_MESSAGE_CLEAR });
        }
    }, [successMessage, error]);
    return (
        <div className="login">
            <div className="card">
                <div className="card-header">
                    <h3>Login</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={login}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={state.email}
                                name="email"
                                onChange={inputHandle}
                                placeholder="Email"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={state.password}
                                name="password"
                                onChange={inputHandle}
                                placeholder="Password"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Login" className="btn" />
                        </div>
                        <div className="form-group">
                            <span>
                                <Link to="/messenger/register">Register Your Account</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
