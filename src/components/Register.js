import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '~/store/actions/authAction';
import { useAlert } from 'react-alert';
import { ERROR_MESSAGE_CLEAR, SUCCESS_MESSAGE_CLEAR } from '~/store/types/authType';

const Register = () => {
    const alert = useAlert();

    const { successMessage, error, authenticate } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        image: '',
    });

    const [loadImage, setLoadImage] = useState('');

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const fileHandle = (e) => {
        if (e.target.files.length !== 0) {
            setState({
                ...state,
                [e.target.name]: e.target.files[0],
            });
        }

        const reader = new FileReader();
        reader.onload = () => {
            setLoadImage(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    const register = (e) => {
        const { userName, email, password, confirmPassword, image } = state;
        e.preventDefault();

        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        formData.append('image', image);

        dispatch(userRegister(formData));
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
        <div className="register">
            <div className="card">
                <div className="card-header">
                    <h3>Register</h3>
                </div>
                <div className="card-body">
                    <form action="" onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="username">User Name</label>
                            <input
                                type="text"
                                name="userName"
                                value={state.userName}
                                onChange={inputHandle}
                                className="form-control"
                                placeholder="User name"
                                id="userName"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={state.email}
                                onChange={inputHandle}
                                className="form-control"
                                placeholder="Email"
                                id="email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={state.password}
                                onChange={inputHandle}
                                className="form-control"
                                placeholder="Password"
                                id="password"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                value={state.confirmPassword}
                                className="form-control"
                                placeholder="Confirm Password"
                                id="confirmPassword"
                                name="confirmPassword"
                                onChange={inputHandle}
                            />
                        </div>
                        <div className="form-group">
                            <div className="file-image">
                                <div className="image">{loadImage ? <img src={loadImage} alt="" /> : ''}</div>
                                <div className="file">
                                    <label htmlFor="image">Select Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={fileHandle}
                                        className="form-control"
                                        id="image"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" className="btn" value="register" />
                        </div>
                        <div className="form-group">
                            <span>
                                <Link to="/messenger/login">Login Your Account</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
