import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const Progress = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex-grow">
        <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2">
          <button 
            onClick={() => navigate('/chat')}
            className="text-black dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full bg-background-light dark:bg-background-dark shadow-sm"
          >
            <svg fill="currentColor" height="24" viewBox="0 0 256 256" width="24">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
          </button>
          <h1 className="text-lg font-bold flex-1 text-center pr-10 text-black dark:text-white">Progress</h1>
        </header>
        
        <main className="p-4 space-y-8">
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white mb-4">Weight & Calorie Tracking</h2>
            <div className="flex flex-col gap-4 rounded-xl border border-primary/20 dark:border-primary/30 p-6 bg-background-light dark:bg-background-dark shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-base font-medium text-black dark:text-white">Weight</p>
                  <p className="text-3xl font-bold text-black dark:text-white">150 lbs</p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/50 px-3 py-1">
                  <svg className="text-green-500 dark:text-green-400" fill="currentColor" height="16" viewBox="0 0 256 256" width="16">
                    <path d="M200,64V168a8,8,0,0,1-16,0V83.31L76.69,190.63a8,8,0,0,1-11.32-11.32L172.69,72H96a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
                  </svg>
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">-2%</p>
                </div>
              </div>
              <p className="text-sm font-normal text-black/60 dark:text-white/60">Last 30 Days</p>
              <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
                <svg fill="none" height="148" preserveAspectRatio="none" viewBox="-3 0 478 150" width="100%">
                  <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z" fill="url(#paint0_linear_1131_5935)"></path>
                  <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#137fec" strokeLinecap="round" strokeWidth="3"></path>
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1131_5935" x1="236" x2="236" y1="1" y2="149">
                      <stop stopColor="#137fec" stopOpacity="0.2"></stop>
                      <stop offset="1" stopColor="#137fec" stopOpacity="0"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="flex justify-around">
                  <p className="text-xs font-bold uppercase tracking-wider text-black/60 dark:text-white/60">Week 1</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-black/60 dark:text-white/60">Week 2</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-black/60 dark:text-white/60">Week 3</p>
                  <p className="text-xs font-bold uppercase tracking-wider text-black/60 dark:text-white/60">Week 4</p>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white mb-4">Progress Comparison</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-xl bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 p-4 shadow-sm">
                <div className="flex-1">
                  <p className="text-sm font-normal text-black/60 dark:text-white/60">Before</p>
                  <p className="text-base font-bold text-black dark:text-white">Week 1</p>
                  <p className="text-sm font-normal text-black/60 dark:text-white/60">Initial Assessment</p>
                </div>
                <div className="w-28 h-28 bg-gray-300 rounded-lg flex-shrink-0"></div>
              </div>
              <div className="flex items-center gap-4 rounded-xl bg-background-light dark:bg-background-dark border border-primary/20 dark:border-primary/30 p-4 shadow-sm">
                <div className="flex-1">
                  <p className="text-sm font-normal text-black/60 dark:text-white/60">After</p>
                  <p className="text-base font-bold text-black dark:text-white">Week 4</p>
                  <p className="text-sm font-normal text-black/60 dark:text-white/60">Current Progress</p>
                </div>
                <div className="w-28 h-28 bg-gray-300 rounded-lg flex-shrink-0"></div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white mb-4">Weekly Goals</h2>
            <div className="flex flex-col gap-3 p-6 rounded-xl border border-primary/20 dark:border-primary/30 bg-background-light dark:bg-background-dark shadow-sm">
              <div className="flex gap-6 justify-between items-center">
                <p className="text-base font-medium text-black dark:text-white">Weekly Goals Completion</p>
                <p className="text-sm font-medium text-black/60 dark:text-white/60">3/4</p>
              </div>
              <div className="w-full rounded-full bg-primary/20 dark:bg-primary/30 h-2.5">
                <div className="h-2.5 rounded-full bg-primary" style={{width: '75%'}}></div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white mb-4">Achievements</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <div className="w-full bg-gray-300 aspect-square rounded-xl"></div>
                <div>
                  <p className="text-base font-medium text-black dark:text-white">3-Day Streak</p>
                  <p className="text-sm font-normal text-black/60 dark:text-white/60">3 consecutive days</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="w-full bg-gray-300 aspect-square rounded-xl"></div>
                <div>
                  <p className="text-base font-medium text-black dark:text-white">Goal Setter</p>
                  <p className="text-sm font-normal text-black/60 dark:text-white/60">Set your first goal</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 col-span-2">
                <div className="w-full bg-gray-300 aspect-video rounded-xl"></div>
                <div>
                  <p className="text-base font-medium text-black dark:text-white">First Workout</p>
                  <p className="text-sm font-normal text-black/60 dark:text-white/60">Completed your first session</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      
      <Navigation currentPage="progress" />
    </div>
  );
};

export default Progress;