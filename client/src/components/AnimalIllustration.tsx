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
      "Dragon": "#FF4500", // Orange red
      "Unicorn": "#E6E6FA", // Lavender
      "Butterfly": "#FF69B4", // Hot pink
      "Octopus": "#9932CC", // Dark orchid
      "Dinosaur": "#228B22", // Forest green
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
      case "dragon":
        return (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill={animalColor}>
            <path d="M50,20 C60,15 70,25 75,30 C85,35 85,45 80,55 C75,65 65,75 50,75 C35,75 25,65 20,55 C15,45 15,35 25,30 C30,25 40,15 50,20" />
            <path d="M25,30 L15,10 L30,25" fill="none" stroke={animalColor} strokeWidth="2" />
            <path d="M75,30 L85,10 L70,25" fill="none" stroke={animalColor} strokeWidth="2" />
            <circle cx="40" cy="45" r="3" fill="yellow" />
            <circle cx="60" cy="45" r="3" fill="yellow" />
            <path d="M45,60 Q50,65 55,60" stroke="black" strokeWidth="2" fill="none" />
            <path d="M50,75 L60,95 L40,95 Z" />
          </svg>
        );
      case "unicorn":
        return (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill={animalColor}>
            <ellipse cx="50" cy="65" rx="30" ry="15" />
            <circle cx="30" cy="65" r="5" />
            <circle cx="70" cy="65" r="5" />
            <ellipse cx="65" cy="45" rx="20" ry="10" />
            <path d="M50,30 L50,5" stroke={animalColor} strokeWidth="4" />
            <circle cx="72" cy="42" r="3" fill="black" />
            <path d="M58,50 Q62,55 66,50" stroke="black" strokeWidth="1" fill="none" />
            <path d="M30,65 L30,80" stroke={animalColor} strokeWidth="3" />
            <path d="M70,65 L70,80" stroke={animalColor} strokeWidth="3" />
            <path d="M40,65 L40,80" stroke={animalColor} strokeWidth="3" />
            <path d="M60,65 L60,80" stroke={animalColor} strokeWidth="3" />
            <path d="M75,40 C85,30 65,20 55,30" fill="none" stroke={animalColor} strokeWidth="2" />
          </svg>
        );
      case "butterfly":
        return (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill={animalColor}>
            <path d="M50,50 C30,30 10,40 30,60 C10,80 30,90 50,70 C70,90 90,80 70,60 C90,40 70,30 50,50" />
            <path d="M50,40 L50,80" stroke="black" strokeWidth="2" />
            <circle cx="50" cy="35" r="5" />
            <circle cx="47" cy="32" r="2" fill="black" />
            <circle cx="53" cy="32" r="2" fill="black" />
            <path d="M48,38 Q50,40 52,38" stroke="black" strokeWidth="1" fill="none" />
          </svg>
        );
      case "octopus":
        return (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill={animalColor}>
            <circle cx="50" cy="40" r="20" />
            <path d="M40,55 C20,65 30,85 35,95" fill="none" stroke={animalColor} strokeWidth="4" />
            <path d="M45,58 C30,75 40,85 35,95" fill="none" stroke={animalColor} strokeWidth="4" />
            <path d="M50,60 C50,75 45,85 50,95" fill="none" stroke={animalColor} strokeWidth="4" />
            <path d="M55,58 C70,75 60,85 65,95" fill="none" stroke={animalColor} strokeWidth="4" />
            <path d="M60,55 C80,65 70,85 65,95" fill="none" stroke={animalColor} strokeWidth="4" />
            <circle cx="40" cy="35" r="5" fill="white" />
            <circle cx="60" cy="35" r="5" fill="white" />
            <circle cx="40" cy="35" r="2" fill="black" />
            <circle cx="60" cy="35" r="2" fill="black" />
          </svg>
        );
      case "dinosaur":
        return (
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill={animalColor}>
            <path d="M20,65 L40,65 L45,55 L75,55 L85,45 L80,30 L60,30 L50,40 L20,40 Z" />
            <circle cx="70" cy="35" r="3" fill="black" />
            <path d="M65,45 Q70,50 75,45" stroke="black" strokeWidth="1" fill="none" />
            <path d="M20,65 L20,85 L30,85 L30,65" fill="none" stroke={animalColor} strokeWidth="4" />
            <path d="M40,65 L40,85 L50,85 L50,65" fill="none" stroke={animalColor} strokeWidth="4" />
            <path d="M80,30 L90,20 L85,30" />
            <path d="M20,40 L10,20 L15,40" />
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
