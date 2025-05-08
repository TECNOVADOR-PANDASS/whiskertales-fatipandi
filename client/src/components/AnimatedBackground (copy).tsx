import { useEffect, useState } from "react";

interface Cloud {
  id: number;
  top: string;
  left: string;
  size: string;
  opacity: number;
  animation: string;
}

const AnimatedBackground = () => {
  const [clouds, setClouds] = useState<Cloud[]>([]);

  useEffect(() => {
    // Generate random clouds
    const generateClouds = () => {
      const newClouds: Cloud[] = [];

      for (let i = 0; i < 8; i++) {
        const top = `${Math.random() * 100}%`;
        const left = `${Math.random() * 100}%`;
        const size = `${50 + Math.random() * 100}px`;
        const opacity = 0.3 + Math.random() * 0.5;
        const duration = 30 + Math.random() * 40;
        const direction = Math.random() > 0.5 ? "forwards" : "backwards";

        newClouds.push({
          id: i,
          top,
          left,
          size,
          opacity,
          animation: `float ${duration}s linear infinite ${direction}`,
        });
      }

      setClouds(newClouds);
    };

    generateClouds();
  }, []);

  return (
    <div className="fixed inset-0 dream-bg overflow-hidden z-0">
      {/* Clouds */}
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className="cloud"
          style={{
            top: cloud.top,
            left: cloud.left,
            width: cloud.size,
            height: cloud.size,
            opacity: cloud.opacity,
            animation: cloud.animation,
          }}
        />
      ))}

      {/* Stars (small dots) */}
      <div className="absolute inset-0" aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.7; }
        }
        
        @keyframes float {
          from { transform: translateX(-100px); }
          to { transform: translateX(calc(100vw + 100px)); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
