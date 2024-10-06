import React, { JSX } from 'react';

export default function Post({ id, title, content, date }: { 
    id: string, 
    title: string, 
    content: string, 
    date: string }) {
    return (
        <div key={id} className="border border-gray-200 p-4 my-4">
            <h2 className="px-1 text-emerald-500">{title}</h2>
            <p className="text-gray-500 p-1">ID# {date}</p>
            <p className="p-1">{content}</p>
        </div>
    );
}
