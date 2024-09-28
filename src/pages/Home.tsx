import React from 'react';
import SupportWrapper from '../components/SupportWrapper';

function Home() {
    const [showBot, setShowBot] = React.useState(false);
    const [_, setMessages] = React.useState<{ type: 'user' | 'backend', content: string, isAudio: boolean }[]>([]);

    const toggleBot = () => {
        setShowBot(!showBot);
        if (showBot) {
            setMessages([]);
        }
    };

    return (
        <div className="h-full flex relative">
            {/* Your main content here */}
            <div className="flex-grow h-full flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-center mt-10">Welcome to IremboGov Support</h1>
                <p className="text-center mt-4">How can we assist you today?</p>
                <div className="flex justify-center mt-10">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={toggleBot}> Chat with us for quick support</button>
                </div>
            </div>
        
            <SupportWrapper
                is_open={showBot}
                toggle={toggleBot}
            />
        </div>
    );
}

export default Home;