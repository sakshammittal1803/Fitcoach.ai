import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Loading = () => {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        navigate('/welcome');
                    }, 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [navigate]);

    const FitnessIcon = () => (
        <div className="mb-8 flex justify-center">
            <div className="relative">
                <img
                    src="/treadmill.gif"
                    alt="Treadmill Animation"
                    className="w-32 h-32 object-contain"
                />
            </div>
        </div>
    );

    return (
        <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-[#111811] overflow-x-hidden font-display">
            <div className="flex h-full flex-col items-center justify-center px-8">
                <div className="flex flex-col items-center max-w-md w-full">
                    <FitnessIcon />

                    <h1 className="text-background-dark dark:text-white tracking-tight text-3xl font-bold leading-tight text-center pb-6">
                        Loading your fitness journey...
                    </h1>

                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex justify-between items-center">
                            <p className="text-background-dark dark:text-white text-base font-medium">
                                {progress < 30 ? 'Initializing...' :
                                    progress < 60 ? 'Syncing data...' :
                                        progress < 90 ? 'Setting up your profile...' :
                                            'Almost there!'}
                            </p>
                            <p className="text-background-dark dark:text-white text-sm font-medium">{progress}%</p>
                        </div>

                        <div className="w-full bg-background-dark/20 dark:bg-[#3c533c] rounded-full h-2">
                            <div
                                className="h-2 rounded-full bg-gradient-to-r from-primary to-primary/80 dark:to-white transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                        <p className="text-background-dark/60 dark:text-[#9db89d] text-sm font-normal text-center mt-2">
                            Preparing your personalized fitness experience
                        </p>
                    </div>

                    {/* Animated dots */}
                    <div className="flex space-x-1 mt-6">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;