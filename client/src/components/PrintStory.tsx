import { useEffect, useRef } from "react";
import AnimalIllustration from "./AnimalIllustration";

interface Story {
  title: string;
  content: string;
  childName: string;
  animal: string;
  theme: string;
}

interface PrintStoryProps {
  story: Story;
}

const PrintStory = ({ story }: PrintStoryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Focus for screen readers
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);
  
  // Parse story content into paragraphs
  const paragraphs = story.content.split('\n').filter(p => p.trim() !== '');
  
  return (
    <div 
      ref={containerRef}
      className="hidden print-only"
      tabIndex={-1}
    >
      <div className="py-8 px-6">
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <AnimalIllustration 
              animal={story.animal} 
              className="w-16 h-16" 
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {story.title}
          </h1>
          <p className="text-sm">
            A personalized bedtime story for {story.childName}
          </p>
        </header>
        
        <div className="prose max-w-none">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
        
        <footer className="mt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Dreamy Tales</p>
          <p className="mt-1">Sweet dreams, {story.childName}!</p>
        </footer>
      </div>
    </div>
  );
};

export default PrintStory;
