import React, { JSX } from 'react';

export default function Component({ id, title, content, date }: { id: string, title: string, content: string, date: string }) {
    return (
        <div key={id} className="border border-gray-200 p-4 my-4">
            <h2>{title}</h2>
            <p className="text-gray-500">{date}</p>
            <p>{content}</p>
        </div>
    );
}

// import React from 'react';

// // Define an interface for the component props
// interface PostProps {
//   id: string;
//   title: string;
//   content: string;
//   date: string;
// }

// // Use React.FC for functional component type
// const Post: React.FC<PostProps> = ({ id, title, content, date }) => {
//   return (
//     <div key={id} className="border border-gray-200 p-4 my-4">
//       <h2 className="text-lg font-bold">{title}</h2> {/* Added some styling */}
//       <p className="text-gray-500 text-sm">{date}</p> {/* Adjusted date styling */}
//       <p>{content}</p>
//     </div>
//   );
// };

// export default Post;