import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BottomNavNew from '@/components/BottomNavNew';

export const ProgressIndicator = (): JSX.Element => {
  return (
    <div className="flex flex-col w-[353px] items-end gap-[9px] relative">
      <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#888888] text-sm text-right tracking-[0.28px] leading-[19.6px]">
        Step 3 of 3
      </div>

      <div className="flex flex-col h-[7px] items-start gap-2.5 relative self-stretch w-full bg-[#292929] rounded-[30px]">
        <div className="relative w-full h-[7px] bg-[#ccd853] rounded-[30px]" />
      </div>
    </div>
  );
};

export const Frame = (): JSX.Element => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePlan = () => {
    setIsGenerating(true);
  };

  const handleNoThanks = () => {
    console.log("User declined plan generation");
  };

  return (
    <section
      className="flex flex-col w-[353px] items-center gap-[26px] relative"
      aria-labelledby="calorie-target-heading"
    >
      <div className="flex flex-col items-center gap-9 self-stretch w-full relative flex-[0_0_auto]">
        <div className="flex flex-col items-center justify-center gap-[26px] self-stretch w-full relative flex-[0_0_auto]">
          <div className="flex items-center gap-[5px] self-stretch w-full relative flex-[0_0_auto]">
            <p className="relative flex items-center justify-center flex-1 mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#888888] text-sm text-center tracking-[0.28px] leading-[19.6px]">
              Your personalized daily calorie target is
            </p>
          </div>

          <div className="flex flex-col items-center gap-[18px] self-stretch w-full relative flex-[0_0_auto]">
            <div
              className="inline-flex items-center gap-1 relative flex-[0_0_auto]"
              role="img"
              aria-label="1,599 calories per day"
            >
              <div className="relative w-[43px] h-[42px]">
                <div className="absolute top-1 left-[5px] w-[38px] h-[38px] bg-[#212121] rounded-full" />
                <div className="absolute top-0 left-0 w-[38px] h-[38px] flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
              </div>

              <div
                className="relative w-fit mt-[-2.50px] [text-shadow:8px_6px_0px_#00000040] [-webkit-text-stroke:4px_#212121] [font-family:'Roboto_Condensed-BoldItalic',Helvetica] font-bold italic text-[#ccd853] text-5xl text-center tracking-[-3.84px] leading-[37px] whitespace-nowrap"
                aria-label="1,599"
              >
                1,599
              </div>
            </div>

            <div className="relative flex items-center justify-center self-stretch [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#ebebeb] text-lg text-center tracking-[0.36px] leading-[25.2px]">
              Kcal/day
            </div>
          </div>

          <p className="relative flex items-center justify-center self-stretch [font-family:'Inter-Medium',Helvetica] font-medium text-[#888888] text-sm text-center tracking-[0.28px] leading-[19.6px]">
            Designed for steady, Healthy progress.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start gap-[33px] self-stretch w-full relative flex-[0_0_auto]">
        <button
          className="h-12 bg-[#ccd853] rounded-[30px] flex items-center justify-center gap-1 px-4 py-2 relative self-stretch w-full hover:bg-[#b8c44a] active:bg-[#a4b041] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ccd853] focus:ring-offset-2"
          onClick={handleGeneratePlan}
          disabled={isGenerating}
          aria-label="Generate my personalized plan"
        >
          <span className="relative w-fit [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#1e1e1e] text-sm tracking-[0] leading-[normal]">
            {isGenerating ? "Generating..." : "Generate my plan"}
          </span>
        </button>

        <button
          className="h-[11px] rounded flex items-center justify-center gap-1 px-4 py-2 relative self-stretch w-full hover:opacity-80 active:opacity-60 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#ccd853] focus:ring-offset-2"
          onClick={handleNoThanks}
          aria-label="Decline plan generation"
        >
          <span className="relative w-fit mt-[-12.00px] mb-[-10.00px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-[#ccd853] text-sm tracking-[0] leading-[normal]">
            No thanks
          </span>
        </button>
      </div>
    </section>
  );
};

export default function Calories() {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Trigger animation on component mount
    setIsMounted(true);
  }, []);

  const handleGeneratePlan = () => {
    // Navigate to schedule or next step
    navigate('/schedule');
  };

  const handleNoThanks = () => {
    console.log("User declined plan generation");
    navigate('/schedule');
  };

  return (
    <div className="relative min-h-screen w-full bg-black bg-opacity-80">
      {/* Glow Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[100%] opacity-90 blur-[250px] bg-primary/20" />
      </div>

      {/* Header with Back Button */}
      <div className="relative z-10 border-b border-[#454545] bg-[#212121] bg-opacity-90 px-4 py-4">
        <div className="flex items-center gap-4">
          <Link
            to="/ai-coach/preferences"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary flex-shrink-0"
          >
            <ArrowLeft className="h-6 w-6 text-black" />
          </Link>
          <div className="flex items-center gap-3 min-w-0">
            <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M19.5 13.5C19.5019 13.8058 19.409 14.1047 19.2341 14.3555C19.0591 14.6063 18.8108 14.7968 18.5232 14.9006L13.6875 16.6875L11.9063 21.5269C11.8008 21.8134 11.6099 22.0608 11.3595 22.2355C11.109 22.4101 10.811 22.5038 10.5057 22.5038C10.2003 22.5038 9.90227 22.4101 9.65181 22.2355C9.40136 22.0608 9.21051 21.8134 9.10503 21.5269L7.31253 16.6875L2.47315 14.9062C2.18659 14.8008 1.93927 14.6099 1.76458 14.3595C1.58988 14.109 1.49622 13.811 1.49622 13.5056C1.49622 13.2003 1.58988 12.9022 1.76458 12.6518C1.93927 12.4013 2.18659 12.2105 2.47315 12.105L7.31253 10.3125L9.09378 5.47313C9.19926 5.18656 9.39011 4.93924 9.64056 4.76455C9.89102 4.58985 10.189 4.49619 10.4944 4.49619C10.7998 4.49619 11.0978 4.58985 11.3482 4.76455C11.5987 4.93924 11.7895 5.18656 11.895 5.47313L13.6875 10.3125L18.5269 12.0938C18.8147 12.1986 19.0629 12.3901 19.2372 12.642C19.4116 12.8939 19.5034 13.1937 19.5 13.5Z" fill="#E1E1E1" />
              <path d="M14.25 4.5H15.75V6C15.75 6.19891 15.829 6.38968 15.9697 6.53033C16.1103 6.67098 16.3011 6.75 16.5 6.75C16.6989 6.75 16.8897 6.67098 17.0304 6.53033C17.171 6.38968 17.25 6.19891 17.25 6V4.5H18.75C18.9489 4.5 19.1397 4.42098 19.2804 4.28033C19.421 4.13968 19.5 3.94891 19.5 3.75C19.5 3.55109 19.421 3.36032 19.2804 3.21967C19.1397 3.07902 18.9489 3 18.75 3H17.25V1.5C17.25 1.30109 17.171 1.11032 17.0304 0.96967C16.8897 0.829018 16.6989 0.75 16.5 0.75C16.3011 0.75 16.1103 0.829018 15.9697 0.96967C15.829 1.11032 15.75 1.30109 15.75 1.5V3H14.25C14.0511 3 13.8603 3.07902 13.7197 3.21967C13.579 3.36032 13.5 3.55109 13.5 3.75C13.5 3.94891 13.579 4.13968 13.7197 4.28033C13.8603 4.42098 14.0511 4.5 14.25 4.5Z" fill="#E1E1E1" />
            </svg>
            <h2 className="text-lg font-bold text-[#E1E1E1] truncate">AI Coach</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-154px)] items-start justify-center px-4 pt-8 pb-24">
        <div className={`flex flex-col items-center gap-[25px] relative transition-all duration-500 ease-out md:transition-none ${isMounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 md:translate-y-0 md:opacity-100'}`}>
          <ProgressIndicator />
          <Frame />
        </div>
      </div>

      <BottomNavNew />
    </div>
  );
}
