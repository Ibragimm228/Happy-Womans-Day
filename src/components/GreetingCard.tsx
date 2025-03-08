import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FlowerPetals from "./FlowerPetals";
import GreetingMessage from "./GreetingMessage";
import { Sparkles, Heart } from "lucide-react";

interface GreetingCardProps {
  title?: string;
  message?: string;
  subMessage?: string;
  petalCount?: number;
  petalColors?: string[];
}

const GreetingCard: React.FC<GreetingCardProps> = ({
  title = "Happy Women's Day",
  message = "Happy Women's Day!",
  subMessage = "С 8 Марта! Пусть весна подарит вам море улыбок, тепла, радости, любви и исполнения самых заветных желаний!",
  petalCount = 120, 
  petalColors = [
    "#FFD6E0",
    "#FFACC7",
    "#FF8DC7",
    "#FDCEDF",
    "#F8BBD0",
    "#F06292",
    "#EC407A",
    "#D81B60",
  ],
}) => {
  const [expanded, setExpanded] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [sparkles, setSparkles] = useState<
    { id: number; x: number; y: number; size: number }[]
  >([]);
  const [hearts, setHearts] = useState<
    { id: number; x: number; y: number; size: number; delay: number }[]
  >([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
   
    audioRef.current = new Audio(
      "https://assets.mixkit.co/music/preview/mixkit-gentle-piano-lullaby-554.mp3",
    );
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

  
    setTimeout(() => {
      createSparkleEffect();
    }, 800);

    
    setTimeout(() => {
      createHeartsEffect();
    }, 1500);

    
    const sparkleInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        createMiniSparkleEffect();
      }
    }, 3000);

    return () => {
    
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      clearInterval(sparkleInterval);
    };
  }, []);

  const createSparkleEffect = () => {
    setShowSparkles(true);
    const newSparkles = [];
    for (let i = 0; i < 15; i++) {
      newSparkles.push({
        id: Date.now() + i,
        x: Math.random() * 350 - 175,
        y: Math.random() * 120 - 60,
        size: Math.random() * 18 + 8,
      });
    }
    setSparkles(newSparkles);

    setTimeout(() => setShowSparkles(false), 2200);
  };

  const createMiniSparkleEffect = () => {
    setShowSparkles(true);
    const newSparkles = [];
    for (let i = 0; i < 6; i++) {
      newSparkles.push({
        id: Date.now() + i,
        x: Math.random() * 280 - 140,
        y: Math.random() * 80 - 40,
        size: Math.random() * 12 + 6,
      });
    }
    setSparkles(newSparkles);

    setTimeout(() => setShowSparkles(false), 1500);
  };

  const createHeartsEffect = () => {
    setShowHearts(true);
    const newHearts = [];
    for (let i = 0; i < 8; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: Math.random() * 400 - 200,
        y: Math.random() * 300 - 150,
        size: Math.random() * 20 + 10,
        delay: Math.random() * 0.8,
      });
    }
    setHearts(newHearts);

    setTimeout(() => setShowHearts(false), 3000);
  };

  const handleAudioToggle = (isPlaying: boolean) => {
    setAudioPlaying(isPlaying);
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
        setAudioPlaying(false);
      });
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleCardInteraction = () => {
    createSparkleEffect();
    createHeartsEffect();

  
    if (!audioPlaying) {
      handleAudioToggle(true);
    }

   
    if (cardRef.current) {
      cardRef.current.classList.add("shake-effect");
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.classList.remove("shake-effect");
        }
      }, 500);
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-pink-50 via-purple-50 to-pink-100">
  
      <motion.div
        className="absolute inset-0 w-full h-full opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(236,64,122,0.2) 0%, rgba(255,255,255,0) 70%)",
            "radial-gradient(circle at 60% 40%, rgba(186,104,200,0.25) 0%, rgba(255,255,255,0) 70%)",
            "radial-gradient(circle at 40% 60%, rgba(236,64,122,0.2) 0%, rgba(255,255,255,0) 70%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
      />

   
      <FlowerPetals count={petalCount} colors={petalColors} />

      
      <motion.div
        ref={cardRef}
        className="relative z-10 p-6 flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        onClick={handleCardInteraction}
      >
       
        <motion.div className="relative mb-4">
          <motion.h1
            className="text-4xl md:text-6xl font-serif font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              textShadow: "0 0 15px rgba(219,39,119,0.4)",
            }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {title}
          </motion.h1>

         
          <AnimatePresence>
            {showSparkles &&
              sparkles.map((sparkle) => (
                <motion.div
                  key={sparkle.id}
                  className="absolute z-10"
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 0.9,
                  }}
                  animate={{
                    x: sparkle.x,
                    y: sparkle.y,
                    scale: 1,
                    opacity: 0,
                    rotate: [0, 90, 180, 270, 360],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1.8,
                    ease: "easeOut",
                  }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Sparkles 
                    size={sparkle.size} 
                    className="text-yellow-300 drop-shadow-lg" 
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>

      
        <AnimatePresence>
          {showHearts &&
            hearts.map((heart) => (
              <motion.div
                key={heart.id}
                className="absolute text-pink-500 z-10"
                initial={{
                  x: 0,
                  y: 100,
                  scale: 0,
                  opacity: 0,
                }}
                animate={{
                  x: heart.x,
                  y: heart.y - 200,
                  scale: 1,
                  opacity: [0, 0.8, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 2.5,
                  delay: heart.delay,
                  ease: "easeOut",
                }}
              >
                <Heart size={heart.size} fill="#EC407A" className="drop-shadow-md" />
              </motion.div>
            ))}
        </AnimatePresence>

     
        <GreetingMessage
          message={message}
          subMessage={subMessage}
          isExpanded={true}
          onInteraction={handleCardInteraction}
        />

      
        <motion.div
          className="absolute -z-1 w-full h-full max-w-[850px] max-h-[650px] rounded-full opacity-20 bg-gradient-radial from-pink-300 to-transparent"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
            background: [
              "radial-gradient(circle, rgba(236,64,122,0.3) 0%, rgba(255,255,255,0) 70%)",
              "radial-gradient(circle, rgba(186,104,200,0.3) 0%, rgba(255,255,255,0) 70%)",
              "radial-gradient(circle, rgba(236,64,122,0.3) 0%, rgba(255,255,255,0) 70%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>



     
      <style jsx global>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
        .shake-effect {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default GreetingCard;