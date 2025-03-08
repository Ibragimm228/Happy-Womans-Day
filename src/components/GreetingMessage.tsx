import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../components/ui/card";
import { Heart, Sparkles } from "lucide-react";

interface GreetingMessageProps {
  message?: string;
  subMessage?: string;
  isExpanded?: boolean;
  onInteraction?: () => void;
}

const GreetingMessage = ({
  message = "Happy Women's Day!",
  subMessage = "С 8 Марта! Пусть весна подарит вам море улыбок, тепла, радости, любви и исполнения самых заветных желаний!",
  isExpanded = false,
  onInteraction = () => {},
}: GreetingMessageProps) => {
  const [showHearts, setShowHearts] = useState(false);
  const [hearts, setHearts] = useState<
    { id: number; x: number; y: number; size: number; rotation: number }[]
  >([]);


  useEffect(() => {
    setTimeout(() => {
      createHeartsAnimation();
    }, 1500);


    const interval = setInterval(() => {
      createHeartsAnimation();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const createHeartsAnimation = () => {
    setShowHearts(true);

    const newHearts = [];
    for (let i = 0; i < 20; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: Math.random() * 150 - 75, 
        y: Math.random() * 150 - 75,
        size: Math.random() * 20 + 10,
        rotation: Math.random() * 360,
      });
    }
    setHearts(newHearts);

    
    setTimeout(() => setShowHearts(false), 2000);
  };

  const handleInteraction = () => {
   
    createHeartsAnimation();
    onInteraction();
  };

  return (
    <motion.div
      className="relative w-full max-w-[500px] h-auto min-h-[300px] flex items-center justify-center bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        height: "auto",
        width: "500px",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,240,245,0.9))",
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      onClick={handleInteraction}
      whileHover={{
        boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
        scale: 1.02,
      }}
    >
     
      <AnimatePresence>
        <>
          <motion.div
            className="absolute top-4 left-4 text-pink-400 z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: [0, 15, 0, -15, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Sparkles size={24} />
          </motion.div>
          <motion.div
            className="absolute bottom-4 right-4 text-pink-400 z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: [0, -15, 0, 15, 0] }}
            transition={{
              duration: 1.5,
              delay: 0.3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Sparkles size={24} />
          </motion.div>
        </>
      </AnimatePresence>


      <AnimatePresence>
        {showHearts &&
          hearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute z-20 text-pink-500"
              initial={{
                x: 0,
                y: 0,
                scale: 0,
                rotate: heart.rotation,
                opacity: 0.8,
              }}
              animate={{
                x: heart.x,
                y: heart.y,
                scale: 1,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Heart
                size={heart.size}
                fill="currentColor"
                className="drop-shadow-md"
              />
            </motion.div>
          ))}
      </AnimatePresence>

      <Card className="w-full h-full p-8 flex flex-col items-center justify-center bg-transparent border-none">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h1
            className="text-3xl md:text-4xl font-serif font-bold mb-4 text-pink-600"
            animate={{
              fontSize: "2.5rem",
              color: "#db2777",
              textShadow: "0 0 10px rgba(219,39,119,0.3)",
            }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </motion.h1>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <p className="text-lg text-purple-700 font-light leading-relaxed mt-4">
              {subMessage}
            </p>

            <motion.div
              className="mt-8 flex flex-col gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-gray-600 italic">
                "Пусть этот день подарит радость, тепло, улыбки, весеннее настроение, любовь, гармонию, удачу и исполнение желаний!"
              </p>
              <div className="w-full flex justify-center mt-2">
                <motion.div
                  className="h-1 w-24 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full"
                  animate={{
                    width: ["6rem", "10rem", "6rem"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default GreetingMessage;
