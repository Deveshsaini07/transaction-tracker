import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


function Signup() {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [balance,setBalance] = useState(0);
    const navigate = useNavigate();

    async function onSubmit(){
        await axios({
            method:'post',
            url:'http://localhost:3000/api/v1/user/signup',
            data:{
                "username":username,
                "password":password,
                "balance":balance
            },
            withCredentials:true
        }).then((res)=>{
            if(res.status != 200){
                alert('couldnt signup')
            }
            else{
                navigate('/login');
            }
        })
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-linear-to-r from-gray-300 to-gray-500">
            <div className="flex flex-col justify-between items-center bg-white shadow-lg rounded-2xl p-8 w-[90%] sm:w-[400px]">
                
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-800 mb-1">Sign Up</h1>
                    <p className="text-gray-500 text-sm">Enter your information to create an account</p>
                </div>

                {/* Form Fields */}
                <div className="w-full">
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
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
                            placeholder="Enter your password"
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            onChange={(e)=>{
                                setPassword(e.target.value);
                            }}
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="balance" className="block text-gray-700 font-semibold mb-1">
                            Balance
                        </label>
                        <input
                            id="balance"
                            type="number"
                            placeholder="Enter your current Balance"
                            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                            onChange={(e)=>{
                                setBalance(Number(e.target.value));
                            }}
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={onSubmit}
                            className="w-full py-2 text-lg font-semibold text-white bg-amber-600 rounded-lg hover:bg-amber-700 transition-all duration-200 shadow-md"
                        >
                            Submit
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <span className="text-gray-600 text-sm">Already have an account?</span>
                    <button className="ml-2 text-amber-600 font-semibold hover:underline cursor-pointer">
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Signup;
