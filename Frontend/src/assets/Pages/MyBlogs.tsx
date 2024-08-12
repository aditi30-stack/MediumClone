import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { BlogCard } from "./BlogCard";
import { EditBlog } from "./EditForm";
import { Appbar } from "./AppBar";

interface MyBlog { 
    id: number;
    title: string;
    content: string;
    author: {
        name: string;
    };
    date: string;
}

export const MyBlogs = () => {
    const [myBlogs, setMyBlogs] = useState<MyBlog[]>([]);
    const [loading, setLoading] = useState(false);
    const [editingBlog, setEditingBlog] = useState<MyBlog | null>(null);

    useEffect(() => {
        setLoading(true);

        axios.get(`${BACKEND_URL}/api/v1/blog/myPosts`, {
            headers: {
                Authorization: localStorage.getItem("token") 
            }
        }).then(response => {
            setMyBlogs(response.data);
            setLoading(false);
        }).catch(e => {
            console.log("Error is", e);
            setLoading(false);
        });
    }, []);

    const handleEdit = (blog: MyBlog) => {
        setEditingBlog(blog);
    };

    const handleDelete = async (id: number) => {
        console.log("delete")
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: { 
                    Authorization: localStorage.getItem('token'), // Ensure correct token format
                }
            });
            setMyBlogs(myBlogs.filter(blog => blog.id !== id));
        } catch (error) {
            console.log("Error deleting blog:", error);
        }
    };

    const handleUpdate = () => {
        setLoading(true);
        axios.get(`${BACKEND_URL}/api/v1/blog/myPosts`, {
            headers: {
                Authorization:  localStorage.getItem("token")
            }
        }).then(response => {
            setMyBlogs(response.data);
            setLoading(false);
        }).catch(e => {
            console.log("Error is", e);
            setLoading(false);
        });
    };

    if (loading) {
        return (
            <div>
                <Appbar />
                <div role="status" className="max-w-sm animate-pulse">
                    {/* Loading spinner */}
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Appbar />
            <div className="flex justify-center">
                <div>
                    {myBlogs.length === 0 ? (
                        <div className="text-center mt-4">
                            <h2 className="text-lg font-semibold">No blogs found</h2>
                            <p className="text-gray-500">It looks like you haven't written any blogs yet.</p>
                        </div>
                    ) : (
                        myBlogs.map(blog => (
                            <BlogCard 
                                key={blog.id}
                                id={blog.id}
                                authorName={blog.author.name}
                                title={blog.title}
                                content={blog.content}
                                publishedDate={blog.date}
                                onEdit={() => handleEdit(blog)}
                                onDelete={() => handleDelete(blog.id)}  
                            />
                        ))
                    )}
                </div>
            </div>
            {editingBlog && (
                <EditBlog 
                    blog={editingBlog}
                    onClose={() => setEditingBlog(null)}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};
