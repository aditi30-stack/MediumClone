import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { Link } from "react-router-dom"
import { SignupType} from "@proj13xb/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Auth({type}: {type: "signup" | "signin"}) {
    const navigate = useNavigate();

    const [postInputs, setPostInputs] = useState<SignupType>({
        name: "",
        username: "",
        password:  "" 
    });

    async function sendRequest(): Promise<any> {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type=== "signup" ? "signup": "signin"}`, postInputs)
            const jwt = response.data;
            localStorage.setItem("token", jwt.jwt);
            navigate("/Blogs")
            
            
        
        }catch(e) {
            console.log(e)

        }
    } 

    return (
        <div className="flex flex-col justify-center space-y-6 h-screen text-black">
            
            <div className="text-center space-y-2">
                <h1 className="font-bold text-4xl">Create an account</h1>
                <p className="text-slate-400 text-lg text-semibold">
                    {type === "signin"?"Don't have an account": "Already have an account?"} 
                    <Link className="px-2 no-underline hover:underline hover:decoration-black" to={type === "signin" ?"/": "/signin"}>
                        {type=== "signin"? "Sign up": "Sign in"}
                    </Link>

                </p>

            </div>

            { type === "signup" ? <LabelInput label="Username" placeholder="Johnny" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name: e.target.value
                })

            }}>

            </LabelInput>: null}

            <LabelInput label="Email" placeholder="user@gmail.com" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    username: e.target.value
                })
                    
                }}></LabelInput>

            <LabelInput label="Password"  type={"password"} placeholder="124456" onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    password: e.target.value
                })
                    
                }}></LabelInput>

            <Buttons sendRequest={sendRequest} type={type}></Buttons>
       
        </div>
        
    )
}

interface LabelledInput {
    label:string,
    placeholder:string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

export function LabelInput({label, placeholder, onChange, type}: LabelledInput) {
    return (
        <div className="flex flex-col justify-center mx-auto">
           <label className="font-bold">{label}</label>
           <input onChange={onChange}  type={type|| "text"} placeholder={placeholder} className="mt-2 p-2 w-96 border border-2 border-gray-200
           focus:border-sky-800 hover:border-sky-800 outline-none rounded-lg bg-white text-black"></input>
           
        </div>
        
    )

}

interface ButtonInputs {
    type: string,
    sendRequest: ()=> void
}

export function Buttons(props:ButtonInputs) {
    return (
        <div className="justify-center items-center mx-auto">
            <button onClick= {props.sendRequest} className="border border-sm border-black w-96 rounded-lg p-2 bg-black text-white mt-4
            hover:bg-blue-500 hover:text-black hover:border-none">
                {props.type ==="signup"? "signup": "signin"}
            </button>
        </div>
    )
}