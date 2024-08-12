import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

interface MyBlog { 
    id: number;
    title: string;
    content: string;
    author: {
        name: string;
    };
    date: string;
    published?: boolean; 
}

interface EditBlogProps {
    blog: MyBlog;
    onClose: () => void;
    onUpdate: () => void;
}

export const EditBlog = ({ blog, onClose, onUpdate }: EditBlogProps) => {
    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);
    const [published, setPublished] = useState(blog.published || false); 

    const handleSave = async () => {
        try {
            await axios.put(`${BACKEND_URL}/api/v1/blog`, {
                id: blog.id,
                title,
                content,
                published 
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
             onUpdate();
            onClose();
        } catch (error) {
            console.log("Error updating blog:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="title">Title</label>
                    <input 
                        id="title"
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="content">Content</label>
                    <textarea 
                        id="content"
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        rows={6}
                    />
                </div>
                <div className="mb-6">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={published}
                            onChange={(e) => setPublished(e.target.checked)}
                            className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700 font-semibold">Published</span>
                    </label>
                </div>
                <div className="flex justify-end space-x-4">
                    <button 
                        onClick={handleSave} 
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Save
                    </button>
                    <button 
                        onClick={onClose} 
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
