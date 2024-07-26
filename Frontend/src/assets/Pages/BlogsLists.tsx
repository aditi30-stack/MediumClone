import { useBlogs } from "../../hooks";
import { Appbar } from "./AppBar";
import { BlogCard } from "./BlogCard";


export function Blogs () {
    const {loading, blogs} = useBlogs();

    if (loading) {
        return (
            <div>
                <Appbar></Appbar>
            
<div role="status" className="max-w-sm animate-pulse">
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    <span className="sr-only">Loading...</span>
</div>
</div>


        )
    }



    return (
        <div>
            <Appbar></Appbar>
        <div className="flex justify-center">
        <div>
            {blogs.map(b=> <BlogCard
            id={b.id}
            authorName={b.author.name || "Anonymous"}
            title={b.title}
            content={b.content}
            publishedDate={"20 dec 2023"}
            
            >

            </BlogCard>
            )}
                
            
        </div>
        </div>
        </div>
    )
}