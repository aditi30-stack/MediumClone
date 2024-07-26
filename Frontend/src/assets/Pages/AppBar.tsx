import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export function Appbar () {
    return (
        
        <div className="border-b flex justify-between px-10 py-4">
            <Link to={'/blogs'} className="flex items-center cursor-pointer">
                Medium
            </Link>

                <Link to={'/publish'}>
            <div className="flex justify-between space-x-4">
                <button className="border-hidden border-black rounded-xl px-5 py-1 bg-green-500 text-center text-white text-bold
                hover:bg-green-800 focus:ring-4 hover:focus-ring-green-300">Post</button>
                <Avatar size={"big"} name="User"></Avatar>
            </div>
                </Link>

        </div>
    )
}