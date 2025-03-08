import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Flower2, Flower, Heart, Sparkles } from 'lucide-react';

interface FallingItemProps {
  color: string;
  size: number;
  left: number;
  delay: number;
  duration: number;
  rotation: number;
  path?: string;
  type: "petal" | "heart" | "lucide";
  lucideType?: "flower" | "flower2" | "heart" | "sparkles";
  zIndex?: number;
}

const FallingItem: React.FC<FallingItemProps> = ({
  color,
  size,
  left,
  delay,
  duration,
  rotation,
  path,
  type,
  lucideType,
  zIndex = 10,
}) => {
  
  const getPath = () => {
    if (type === "heart") {
      return "M25,10 C25,10 20,0 10,0 C0,0 0,10 0,10 C0,20 10,30 25,45 C40,30 50,20 50,10 C50,10 50,0 40,0 C30,0 25,10 25,10 Z";
    } else {
      return (
        path ||
        "M25 0C25 0 31.25 12.5 43.75 18.75C56.25 25 50 50 25 50C0 50 -6.25 25 6.25 18.75C18.75 12.5 25 0 25 0Z"
      );
    }
  };


  const getAnimation = () => {
    const baseAnimation = {
      y: ["0vh", "100vh"],
      rotate: [rotation, rotation + 360],
      opacity: [0, 0.8, 0.9, 0.8, 0.7, 0.6, 0],
    };

    if (type === "heart") {
      return {
        ...baseAnimation,
        x: [0, 20, -20, 10, -10, 0],
        scale: [0.8, 1, 1.1, 0.9, 1],
      };
    } else if (type === "lucide") {
      return {
        ...baseAnimation,
        x: [0, 15, -15, 5, -5, 0],
        rotate: [rotation, rotation + 180, rotation + 360],
        scale: [0.8, 1, 1.2, 0.8, 1],
      };
    }

    return {
      ...baseAnimation,
      x: [0, 10, -10, 5, -5, 0],
      scale: [0.9, 1, 1.05, 0.95, 1],
    };
  };

  
  const getStyle = () => {
    let style: React.CSSProperties = { 
      left: `${left}%`, 
      zIndex,
      filter: "none"
    };
    
    if (type === "petal") {
      style.filter = `drop-shadow(0 1px 2px rgba(0,0,0,0.1))`;
    } else if (type === "heart") {
      style.filter = `drop-shadow(0 1px 3px rgba(0,0,0,0.15))`;
    }
    
    return style;
  };

  
  const renderLucideIcon = () => {
    if (!lucideType) return null;
    
    switch (lucideType) {
      case "flower":
        return <Flower size={size} color={color} />;
      case "flower2":
        return <Flower2 size={size} color={color} />;
      case "heart":
        return <Heart size={size} color={color} />;
      case "sparkles":
        return <Sparkles size={size} color={color} />;
      default:
        return <Flower size={size} color={color} />;
    }
  };

  return (
    <motion.div
      className="absolute"
      style={getStyle()}
      initial={{ y: -100, rotate: rotation, opacity: 0 }}
      animate={getAnimation()}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {type === "lucide" ? (
        renderLucideIcon()
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d={getPath()}
            fill={color}
            stroke={type === "heart" ? "rgba(255,255,255,0.5)" : "none"}
            strokeWidth={type === "heart" ? 1 : 0}
          />
        </svg>
      )}
    </motion.div>
  );
};

interface FlowerPetalsProps {
  count?: number;
  colors?: string[];
  density?: "low" | "medium" | "high";
  theme?: "cherry" | "rose" | "spring" | "summer";
  backgroundGradient?: string;
  distribution?: "uniform" | "weighted-left" | "weighted-right";
}

const FlowerPetals: React.FC<FlowerPetalsProps> = ({
  count = 80,
  colors,
  density = "medium",
  theme = "cherry",
  backgroundGradient,
  distribution = "uniform",
}) => {
  
  const actualCount = useMemo(() => {
    switch (density) {
      case "low": return Math.floor(count * 0.6);
      case "high": return Math.floor(count * 1.6);
      default: return count;
    }
  }, [count, density]);

  
  const colorThemes = useMemo(() => {
    const themes = {
      cherry: {
        petals: ["#FFD6E0", "#FFACC7", "#FF8DC7", "#FDCEDF", "#F8BBD0", "#F48FB1", "#F06292"],
        hearts: ["#FF6B6B", "#FF8E8E", "#FF4081", "#F50057", "#FF1744"],
        flowers: ["#FFD6E0", "#FFACC7", "#FF8DC7", "#FDCEDF", "#F8BBD0", "#F48FB1"],
        background: "from-pink-50 to-purple-50",
      },
      rose: {
        petals: ["#FFF0F0", "#FFD6D6", "#FFC2C2", "#FFADAD", "#FF9B9B", "#FF8080"],
        hearts: ["#FF6666", "#FF5252", "#FF4D4D", "#FF3333", "#FF1A1A"],
        flowers: ["#FFF0F0", "#FFE6E6", "#FFCCCC", "#FFB3B3", "#FF9999"],
        background: "from-red-50 to-pink-50",
      },
      spring: {
        petals: ["#E0F7FA", "#B2EBF2", "#80DEEA", "#4DD0E1", "#26C6DA", "#00BCD4"],
        hearts: ["#00ACC1", "#0097A7", "#00838F", "#006064", "#00796B"],
        flowers: ["#E0F2F1", "#B2DFDB", "#80CBC4", "#4DB6AC", "#26A69A"],
        background: "from-cyan-50 to-teal-50",
      },
      summer: {
        petals: ["#FFF9C4", "#FFF59D", "#FFF176", "#FFEE58", "#FFEB3B", "#FDD835"],
        hearts: ["#FBC02D", "#F9A825", "#F57F17", "#FF8F00", "#FF6F00"],
        flowers: ["#FFFDE7", "#FFF9C4", "#FFF59D", "#FFF176", "#FFEE58"],
        background: "from-yellow-50 to-amber-50",
      }
    };
    
    return themes[theme] || themes.cherry;
  }, [theme]);

  
  const themeColors = useMemo(() => {
    return colors || colorThemes.petals;
  }, [colors, colorThemes]);

 
  const petalPaths = useMemo(() => [
    "M25 0C25 0 31.25 12.5 43.75 18.75C56.25 25 50 50 25 50C0 50 -6.25 25 6.25 18.75C18.75 12.5 25 0 25 0Z",
    "M25 0C30 15 45 15 50 25C45 35 30 35 25 50C20 35 5 35 0 25C5 15 20 15 25 0Z",
    "M25 0C35 10 50 10 50 25C50 40 35 50 25 50C15 50 0 40 0 25C0 10 15 10 25 0Z",
    "M25 0C28 10 35 15 45 15C35 25 45 40 25 45C5 40 15 25 5 15C15 15 22 10 25 0Z",
    "M25 5C30 10 40 10 45 20C40 30 35 40 25 45C15 40 10 30 5 20C10 10 20 10 25 5Z",
  ], []);

  const [items, setItems] = useState<FallingItemProps[]>([]);


  const getPositionBasedOnDistribution = (index: number, total: number) => {
    if (distribution === "uniform") {
      const segmentSize = 100 / (total * 0.6); 
      const segmentIndex = index % Math.ceil(100 / segmentSize);
      const position = segmentIndex * segmentSize + (Math.random() * segmentSize * 0.8);
      
    
      return Math.min(Math.max(position + (Math.random() * 10 - 5), 0), 100);
    } else if (distribution === "weighted-left") {
     
      return Math.pow(Math.random(), 1.2) * 100;
    } else if (distribution === "weighted-right") {

      return (1 - Math.pow(Math.random(), 1.2)) * 100;
    }
    
  
    return Math.random() * 100;
  };

  
  const generateBalancedItems = (totalCount: number) => {
    const items: FallingItemProps[] = [];
    
  
    const petalRatio = 0.35;
    const heartRatio = 0.2;
    const lucideRatio = 0.25;
    const specialRatio = 0.2;
    
    
    const sections = 5;
    const itemsPerSection = Math.ceil(totalCount / sections);
    
  
    const petalCount = Math.floor(totalCount * petalRatio);
    for (let i = 0; i < petalCount; i++) {
     
      const section = i % sections;
      const sectionStart = section * (100 / sections);
      const sectionEnd = (section + 1) * (100 / sections);
      
    
      const left = sectionStart + (Math.random() * 0.8 + 0.1) * (sectionEnd - sectionStart);
      
      items.push({
        color: themeColors[Math.floor(Math.random() * themeColors.length)],
        size: Math.random() * 20 + 15,
        left: left,
        delay: Math.random() * 15,
        duration: Math.random() * 8 + 12,
        rotation: Math.random() * 360,
        path: petalPaths[Math.floor(Math.random() * petalPaths.length)],
        type: "petal",
        zIndex: Math.floor(Math.random() * 20) + 5,
      });
    }

    const heartCount = Math.floor(totalCount * heartRatio);
    for (let i = 0; i < heartCount; i++) {
      const section = i % sections;
      const sectionStart = section * (100 / sections);
      const sectionEnd = (section + 1) * (100 / sections);
      const left = sectionStart + (Math.random() * 0.8 + 0.1) * (sectionEnd - sectionStart);
      
      items.push({
        color: colorThemes.hearts[Math.floor(Math.random() * colorThemes.hearts.length)],
        size: Math.random() * 15 + 10,
        left: left,
        delay: Math.random() * 15,
        duration: Math.random() * 6 + 10,
        rotation: Math.random() * 360,
        type: "heart",
        zIndex: Math.floor(Math.random() * 20) + 5,
      });
    }

    
    const lucideCount = Math.floor(totalCount * lucideRatio);
    for (let i = 0; i < lucideCount; i++) {
      const section = i % sections;
      const sectionStart = section * (100 / sections);
      const sectionEnd = (section + 1) * (100 / sections);
      const left = sectionStart + (Math.random() * 0.8 + 0.1) * (sectionEnd - sectionStart);
      
      items.push({
        color: colorThemes.flowers[Math.floor(Math.random() * colorThemes.flowers.length)],
        size: Math.random() * 20 + 15,
        left: left,
        delay: Math.random() * 15,
        duration: Math.random() * 7 + 11,
        rotation: Math.random() * 360,
        type: "lucide",
        lucideType: Math.random() > 0.5 ? "flower" : "flower2",
        zIndex: Math.floor(Math.random() * 20) + 5,
      });
    }

   
    const specialCount = Math.floor(totalCount * specialRatio);
    for (let i = 0; i < specialCount; i++) {
      const section = i % sections;
      const sectionStart = section * (100 / sections);
      const sectionEnd = (section + 1) * (100 / sections);
      const left = sectionStart + (Math.random() * 0.8 + 0.1) * (sectionEnd - sectionStart);
      
      items.push({
        color: colorThemes.hearts[Math.floor(Math.random() * colorThemes.hearts.length)],
        size: Math.random() * 18 + 12,
        left: left,
        delay: Math.random() * 15,
        duration: Math.random() * 7 + 9,
        rotation: Math.random() * 360,
        type: "lucide",
        lucideType: Math.random() > 0.5 ? "heart" : "sparkles",
        zIndex: Math.floor(Math.random() * 20) + 5,
      });
    }
    
    
    for (let i = 0; i < Math.ceil(totalCount * 0.05); i++) {
      const left = Math.random() * 10; 
      items.push(createRandomElement(left, colorThemes, themeColors, petalPaths));
    }
    
   
    for (let i = 0; i < Math.ceil(totalCount * 0.05); i++) {
      const left = 90 + Math.random() * 10; 
      items.push(createRandomElement(left, colorThemes, themeColors, petalPaths));
    }
    
    return items;
  };
  

  const createRandomElement = (left: number, colorThemes: any, themeColors: string[], petalPaths: string[]) => {
    const type = Math.random();
    
    if (type < 0.35) {
      return {
        color: themeColors[Math.floor(Math.random() * themeColors.length)],
        size: Math.random() * 20 + 15,
        left: left,
        delay: Math.random() * 15,
        duration: Math.random() * 8 + 12,
        rotation: Math.random() * 360,
        path: petalPaths[Math.floor(Math.random() * petalPaths.length)],
        type: "petal" as const,
        zIndex: Math.floor(Math.random() * 20) + 5,
      };
    } else if (type < 0.6) {
      return {
        color: colorThemes.flowers[Math.floor(Math.random() * colorThemes.flowers.length)],
        size: Math.random() * 20 + 15,
        left: left,
        delay: Math.random() * 15,
        duration: Math.random() * 7 + 11,
        rotation: Math.random() * 360,
        type: "lucide" as const,
        lucideType: ["flower", "flower2", "sparkles", "heart"][Math.floor(Math.random() * 4)] as "flower" | "flower2" | "heart" | "sparkles",
        zIndex: Math.floor(Math.random() * 20) + 5,
      };
    } else {
      return {
        color: colorThemes.hearts[Math.floor(Math.random() * colorThemes.hearts.length)],
        size: Math.random() * 15 + 10,
        left: left,
        delay: Math.random() * 15,
        duration: Math.random() * 6 + 10,
        rotation: Math.random() * 360,
        type: "heart" as const,
        zIndex: Math.floor(Math.random() * 20) + 5,
      };
    }
  };

  useEffect(() => {

    const totalCount = Math.floor(actualCount * 1.5);
    

    const newItems = generateBalancedItems(totalCount);
    
    setItems(newItems);
  }, [actualCount, themeColors, petalPaths, colorThemes, distribution]);


  const bgGradient = backgroundGradient || colorThemes.background;

  return (
    <div className={`fixed inset-0 w-full h-full overflow-hidden pointer-events-none bg-gradient-to-b ${bgGradient}`}>
      {items.map((item, index) => (
        <FallingItem key={index} {...item} />
      ))}
    </div>
  );
};

export default FlowerPetals;