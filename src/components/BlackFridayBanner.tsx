import { useState, useEffect } from "react";
import { Clock, Flame } from "lucide-react";

const BlackFridayBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    // Set end of day as target
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      const difference = endOfDay.getTime() - now.getTime();
      
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-semibold">
          <Flame className="h-4 w-4 text-[hsl(45,100%,50%)] animate-pulse" />
          <span className="text-[hsl(45,100%,50%)] font-bold">ÚLTIMO DIA</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">BLACK FRIDAY</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span className="font-mono">
              {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackFridayBanner;
