import React from 'react';

export default function Page() {
    return (
        <main className="flex-col min-h-screen items-center justify-center">
            <div className="flex-grow">
                <h1 className="text-4XL text-purple-700 justify-left mt-6 mb-4">Contact</h1>
                <p className=''>Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                It has survived not only five centuries, but also the leap into electronic typesetting, 
                remaining essentially unchanged. It was popularised in the 1960s with the release 
                of Letraset sheets containing Lorem Ipsum passages, and more recently with 
                desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <h1 className="text-4XL text-purple-700 justify-left mt-6 mb-4">Get in Touch</h1>
                    <ul className="" style={{ listStyleType: "square" }}>
                        <li>
                            <span>Email: <a href="mailto:contact@example.com">contact@example.com</a></span>
                        </li>
                        <li>
                            <span>Website: <a href="https://www.example.com">www.example.com</a></span>
                        </li>
                    </ul>
            </div>
        </main>
    );
}