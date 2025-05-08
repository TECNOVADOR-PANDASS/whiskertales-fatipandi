import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FormContainer } from "@/components/ui/form-container";
import AnimalIllustration from "./AnimalIllustration";
import PrintStory from "./PrintStory";
import { motion } from "framer-motion";
import { useReadingProgress } from "@/lib/stores/useReadingProgress";
import StoryGameIntegration from "./game/StoryGameIntegration";

interface Story {
  title: string;
  content: string;
  childName: string;
  animal: string;
  theme: string;
}

interface StoryDisplayProps {
  story: Story;
  onNewStory: () => void;
}

const StoryDisplay = ({ story, onNewStory }: StoryDisplayProps) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [showGameSection, setShowGameSection] = useState(false);
  const storyRef = useRef<HTMLDivElement>(null);
  const { incrementStoriesRead } = useReadingProgress();

  // Update reading progress when a new story is displayed
  useEffect(() => {
    // Increment the stories read counter
    incrementStoriesRead(story.title);
  }, [story.title, incrementStoriesRead]);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  // Toggle game section visibility
  const toggleGameSection = () => {
    setShowGameSection(prev => !prev);
  };

  // Parse story content into paragraphs
  const paragraphs = story.content.split('\n').filter(p => p.trim() !== '');
  
  return (
    <div id="story-display">
      <FormContainer className="mb-8 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            {story.title}
          </h2>
          <div className="no-print">
            <AnimalIllustration 
              animal={story.animal} 
              className="w-20 h-20 md:w-24 md:h-24 animal-float" 
            />
          </div>
        </div>
        
        <div ref={storyRef} className="story-text prose prose-lg max-w-none">
          {paragraphs.map((paragraph, index) => (
            <motion.p 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="mb-4"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-4 mt-8 justify-between no-print">
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="lg"
              onClick={onNewStory}
            >
              Create New Story
            </Button>
            
            <Button 
              variant="secondary" 
              size="lg"
              onClick={toggleGameSection}
            >
              {showGameSection ? "Hide Interactive Game" : "Play Interactive Game"}
            </Button>
          </div>
          
          <Button 
            variant="default" 
            size="lg"
            onClick={handlePrint}
            disabled={isPrinting}
          >
            {isPrinting ? "Preparing..." : "Print Story"}
          </Button>
        </div>
      </FormContainer>
      
      {/* Game section */}
      {showGameSection && (
        <div className="no-print">
          <StoryGameIntegration 
            animal={story.animal}
            childName={story.childName}
            theme={story.theme}
          />
        </div>
      )}
      
      {/* Hidden component for printing */}
      {isPrinting && <PrintStory story={story} />}
    </div>
  );
};

export default StoryDisplay;
