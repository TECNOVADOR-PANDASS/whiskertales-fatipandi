import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface AnimalIllustrationProps {
  animal: string;
  className?: string;
}

const AnimalIllustration = ({ animal, className }: AnimalIllustrationProps) => {
  const animalColor = useMemo(() => {
    // Get consistent color based on animal name
    const colorMap: Record<string, string> = {
      "Rabbit": "#FFB6C1", // Light pink
      "Fox": "#FF7F50", // Coral
      "Bear": "#8B4513", // Brown
      "Owl": "#DEB887", // Burlywood
      "Elephant": "#B0C4DE", // Light steel blue
      "Lion": "#DAA520", // Goldenrod
      "Turtle": "#32CD32", // Lime green
      "Wolf": "#708090", // Slate gray
      "Giraffe": "#F4A460", // Sandy brown
      "Koala": "#A9A9A9", // Dark gray
      "Tiger": "#FF8C00", // Dark orange
      "Penguin": "#4682B4", // Steel blue
      "Squirrel": "#CD853F", // Peru
      "Hedgehog": "#BDB76B", // Dark khaki
      "Panda": "#000000", // Black
      "Dolphin": "#87CEEB", // Sky blue
      "Monkey": "#A0522D", // Sienna
      "default": "#9370DB" // Medium purple
    };
    
    return colorMap[animal] || colorMap.default;
  }, [animal]);
  
  // Determine which SVG to display based on animal
  const renderAnimalSvg = () => {
    switch(animal.toLowerCase()) {
      case "rabbit":
        return (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill={animalColor}>
            <ellipse cx="50" cy="65" rx="25" ry="30" />
            <ellipse cx="35" cy="30" rx="10" ry="25" transform="rotate(-20, 35, 30)" />
            <ellipse cx="65" cy="30" rx="10" ry="25" transform="rotate(20, 65, 30)" />
            <circle cx="40" cy="60" r="3" fill="black" />
            <circle cx="60" cy="60" r="3" fill="black" />
            <ellipse cx="50" cy="68" rx="6" ry="4" fill="pink" />
            <circle cx="50" cy="85" r="5" fill="white" />
          </svg>
        );
      case "fox":
        return (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill={animalColor}>
            <path d="M50,20 L30,50 L20,90 L50,75 L80,90 L70,50 Z" />
            <polygon points="30,50 20,20 40,40" />
            <polygon points="70,50 80,20 60,40" />
            <circle cx="40" cy="60" r="3" fill="black" />
            <circle cx="60" cy="60" r="3" fill="black" />
            <path d="M45,70 Q50,75 55,70" stroke="black" strokeWidth="2" fill="none" />
          </svg>
        );
      case "bear":
        return (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill={animalColor}>
            <circle cx="50" cy="60" r="30" />
            <circle cx="25" cy="35" r="12" />
            <circle cx="75" cy="35" r="12" />
            <circle cx="40" cy="55" r="3" fill="black" />
            <circle cx="60" cy="55" r="3" fill="black" />
            <ellipse cx="50" cy="65" rx="8" ry="5" />
            <ellipse cx="50" cy="77" rx="5" ry="3" fill="black" />
          </svg>
        );
      case "owl":
        return (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill={animalColor}>
            <circle cx="50" cy="50" r="30" />
            <circle cx="35" cy="40" r="10" fill="white" />
            <circle cx="65" cy="40" r="10" fill="white" />
            <circle cx="35" cy="40" r="5" fill="black" />
            <circle cx="65" cy="40" r="5" fill="black" />
            <path d="M40,60 Q50,70 60,60" fill="orange" />
            <path d="M30,25 L40,35" stroke="black" strokeWidth="2" />
            <path d="M70,25 L60,35" stroke="black" strokeWidth="2" />
          </svg>
        );
      // Default animal illustration for other animals
      default:
        return (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill={animalColor}>
            <circle cx="50" cy="50" r="35" />
            <circle cx="35" cy="40" r="5" fill="black" />
            <circle cx="65" cy="40" r="5" fill="black" />
            <path d="M40,65 Q50,75 60,65" stroke="black" strokeWidth="2" fill="none" />
          </svg>
        );
    }
  };
  
  return (
    <div className={cn("w-36 h-36", className)}>
      {renderAnimalSvg()}
    </div>
  );
};

export default AnimalIllustration;
