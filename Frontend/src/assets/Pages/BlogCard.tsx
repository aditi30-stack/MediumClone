import { Link } from "react-router-dom";
import { MouseEventHandler, useState } from "react";

interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  onEdit?: () => void; 
  onDelete?: () => void;
  opacity?: number; 
}

export function BlogCard({
  id,
  authorName,
  title,
  content,
  publishedDate,
  opacity = 100, 
  onEdit,
  onDelete,
}: BlogCardProps) {

  const [countLikes, setCountLikes] = useState(0);

  const handleAddCount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCountLikes(countLikes + 1);
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    if (onEdit) {
      onEdit();
    }
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); 
    if (onDelete) {
      onDelete();
    }
  };

  const opacityClass = opacity === 0 ? 'opacity-0' : 'opacity-100';

  return (
    <div className="p-4 border-b-2 border-slate-200 pb-2 mt-1 w-screen max-w-screen-md cursor-pointer">
      <div className="flex">
        <div className="flex flex-col justify-center">
          <Avatar name={authorName} />
        </div>
        <div className="pl-1 text-md">{authorName}</div>
        <div className="flex justify-center flex-col pl-1">
          <Circle />
        </div>
        <div className="text-slate-500 ml-2">{publishedDate}</div>
      </div>
      <Link to={`/blog/${id}`} className="block">
        <div className="font-bold text-3xl p-2">{title}</div>
        <div className="text-lg font-serif p-2">
          {content.length > 99 ? content.slice(0, 100) + "..." : content}
        </div>
        <div className="text-gray-500 font-serif font-thin p-2">
          {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
      </Link>
      <div className="flex mt-2">
        <button onClick={handleAddCount} className="mr-2">👍</button>
        <div className="font-semibold">{countLikes}</div>
        <div className="space-x-4">
         
          {onEdit && (
            <button onClick={handleEditClick} className={`ml-4 font-semibold ${opacityClass}`}>Edit</button>
          )}
          {onDelete && (
            <button onClick={handleDeleteClick} className={`font-semibold ${opacityClass}`}>Delete</button>
          )}
        </div>
      </div>
    </div>
  );
}

function Circle() {
  return <div className="rounded bg-slate-500 h-1 w-1"></div>;
}

export function Avatar({
  name,
  size = "small",
  onClick,
}: {
  name: string;
  size?: "small" | "big";
  onClick?: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600
${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}
    >
      <span className={`${size === "small" ? "text-sm" : "text-lg"} text-white dark:text-white`}>{name[0]}</span>
    </div>
  );
}
