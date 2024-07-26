import { Blog } from "../hooks"
import { Appbar } from "./Pages/AppBar"
import { Avatar } from "./Pages/BlogCard"
export function FullBlog ({blog}:{blog:Blog}) {
    return (
        <div>
            <Appbar/>
            <div className="flex justify-center">
        <div className="grid grid-cols-12 px-12 w-full pt-12 max-w-screen-xl">
            <div className="col-span-8">
                <div className="text-5xl font-extrabold">
                    {blog.title}
                    <div className="text-slate-500">

                    </div>


                </div>
                <div className="pt-6">
                    {blog.content}
                </div>

            </div>
            <div className="col-span-4" >
                <div className="text-slate-600 text-lg ml-11 mb-1">
                Author
                </div>
                <div className="flex w-full">
                <div className="flex pr-4 mb-2">
                    <Avatar size="big" name={blog.author.name || "Anonymous"}></Avatar>
                    <div>
                <div className="text-xl font-bold ml-1 mt-1">
                {blog.author.name|| "Anonymous"} 
            </div>
            <div className="pt-2 text-slate-500 ml-1">
                Information about the author
                </div>
                </div>


                </div>
                </div>
                
                

            </div>
        

        </div>
        </div>
        </div>
    )
}