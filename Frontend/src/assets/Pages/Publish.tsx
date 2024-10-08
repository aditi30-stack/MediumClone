import axios from "axios";
import { Appbar } from "./AppBar";
import { BACKEND_URL } from "../../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Publish() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    
    const isFormValid = title.trim() !== '' && content.trim() !== '';

    const handlePublish = async () => {
        if (!isFormValid) {
            alert("Title and content cannot be empty");
            return; 
        }
        if(loading) return

        setLoading(true)

        try {
            
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title: title,
                content: content
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            
            console.error("Error publishing the post:", error);
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <div>
            <Appbar />

            <div className="flex flex-col justify-center max-w-3xl">
                <input
                    className="border-black p-10 mt-14 text-slate-800 text-5xl ml-8 focus:outline-none"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <TextBox
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                />

                <div className="flex justify-between">
                    <button disabled ={!isFormValid || loading}
                        onClick={handlePublish}
                        className="rounded-lg bg-blue-800 px-6 py-2 text-white text-semibold ml-14 mt-5"
                    >
                        Publish Post
                    </button>
                </div>
            </div>
        </div>
    );
}

export function TextBox({ onChange, value }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void, value: string }) {
    return (
        <form>
            <div className="ml-12 space-y-4 w-full text-gray-400">
                <textarea
                    onChange={onChange}
                    id="message"
                    rows={8}
                    className="block p-2.5 w-full text-lg text-gray-900 bg-white rounded-lg focus:outline-none focus:ring focus:border-gray-800 ml-1"
                    placeholder="Tell your story..."
                    value={value}
                />
            </div>
        </form>
    );
}
