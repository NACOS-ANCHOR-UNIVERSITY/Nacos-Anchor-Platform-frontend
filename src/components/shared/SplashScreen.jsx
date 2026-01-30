import React from "react";

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 bg-brand-secondary flex flex-col items-center justify-center z-9999">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scale-pulse {
          0%, 100% { 
            transform: scale(1); 
            filter: drop-shadow(0 0 0px rgba(18, 132, 1, 0));
          }
          50% { 
            transform: scale(1.05); 
            filter: drop-shadow(0 0 20px rgba(18, 132, 1, 0.2));
          }
        }
        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-scale-pulse {
          animation: scale-pulse 3s ease-in-out infinite;
        }
        .loader {
          width: 64px;
          height: 64px;
          border: 4px solid;
          border-color: #128401 transparent; /* Brand Primary */
          border-radius: 50%;
          display: inline-block;
          box-sizing: border-box;
          animation: rotation 1s linear infinite;
        }
      `,
        }}
      />

      <div className="flex flex-col items-center gap-32">
        {/* The Spinner */}
        <div className="flex flex-col items-center gap-3">
          <span className="loader" />
          {/* <p className="text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase">
            Loading Portal
          </p> */}
        </div>

        {/* hidden for now... */}
        <div className="relative flex flex-col items-center">
          {/* Logo and Text pulsing together */}
          <div className="flex flex-col items-center gap-3">
            <img
              src="/nacos.svg"
              alt="NACOS Logo"
              className="animate-scale-pulse object-contain size-full"
            />
            <p className="text-[10px] text-brand-primary font-black tracking-[0.5em] uppercase text-center w-full">
              Anchor University
            </p>
          </div>

          {/* The Ambient Glow */}
          <div className="absolute inset-0 bg-brand-primary/50 blur-[85px] rounded-full opacity-15 -z-10 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

