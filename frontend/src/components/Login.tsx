import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Login() {


    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    async function onSubmit() {
        try {
            const currentUsername =username;
            const currentPassword =password;

            setUsername("");
            setPassword("");
            
            await axios({
                method:'post',
                url:'http://localhost:3000/api/v1/user/login',
                data:{
                    "username":currentPassword,
                    "password":currentPassword
                },
                withCredentials:true,
            });
            navigate('/dashboard');
        } catch (error) {
            alert('couldnt login')
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-linear-to-r from-gray-300 to-gray-500">
            <div className="flex flex-col justify-center items-center bg-white shadow-lg rounded-2xl p-8 w-[90%] sm:w-[400px]">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Sign In</h1>
                    <p className="text-gray-500 text-sm">Welcome back! Please login to your account.</p>
                </div>

                <div className="w-full">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            placeholder="Enter your username"
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            onChange={(e)=>{
                                setUsername(e.target.value);
                            }}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            onChange={(e)=>{
                                setPassword(e.target.value);
                            }}
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={onSubmit}
                            className="w-full py-2 text-lg font-semibold text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-all duration-200 shadow-md"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
