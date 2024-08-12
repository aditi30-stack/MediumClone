import { useState } from "react";
import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/UserLoginSlice";
import { useDispatch } from "react-redux";

export function Appbar () {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    
    const handleLogout = () =>{
        setOpen(!open)

    }

    const UserLogout = async() =>{
        console.log("Logged out!")
        dispatch(logout())
        console.log("Navigating")
         navigate('/signin')
        

    }

    return (
        
        <div className="border-b flex justify-between px-10 py-4">
            <Link to={'/blogs'} className="flex items-center cursor-pointer">
                Medium
            </Link>

            <div className="flex justify-between items-between space-x-4 cursor-pointer">
                <Link to={'/publish'}>
                <button className="border-hidden border-black rounded-xl px-5 py-1 bg-green-500 text-center text-white text-bold
                hover:bg-green-800 focus:ring-4 hover:focus-ring-green-300 mt-1.5 w-[100px]">Post</button>
               </Link>
                <Avatar  onClick={handleLogout} size={"big"} name="User"
                   
                ></Avatar>
                
            </div>
            

               {open && (
                    <div className="w-40 absolute top-14 right-16 bg-gray-100 p-4 rounded-md">
                        <div className="p-1 border border-gray-100 rounded-sm text-gray-800 w-full">
                            <button className="hover:bg-green-500 w-full" onClick={UserLogout}>Logout</button>
                            <div>
                                <button onClick={()=>{
                                    navigate('/MyBlogs')
                                }} className="hover:bg-green-500 mt-4 w-full">My Blogs</button>
                            </div>
                            
                        </div>

                    </div>
                )}
                

        </div>
    )
}