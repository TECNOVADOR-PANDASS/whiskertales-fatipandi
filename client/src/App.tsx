import { useState, useEffect } from "react";
import StoryGenerator from "./components/StoryGenerator";
import StoryDisplay from "./components/StoryDisplay";
import AnimatedBackground from "./components/AnimatedBackground";
import ReadingProgressSection from "./components/ReadingProgressSection";
import { useAudio } from "./lib/stores/useAudio";
import { useGame } from "./lib/stores/useGame";
import { cn } from "./lib/utils";

interface Story {
  title: string;
  content: string;
  childName: string;
  animal: string;
  theme: string;
}

function App() {
  const [story, setStory] = useState<Story | null>(null);
  
  const handleStoryGenerated = (generatedStory: Story) => {
    setStory(generatedStory);
    // Scroll to story content
    setTimeout(() => {
      const storyElement = document.getElementById("story-display");
      if (storyElement) {
        storyElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };
  
  const handleNewStory = () => {
    setStory(null);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className={cn(
          "text-center mb-8",
          story ? "pt-4" : "pt-12 md:pt-20"
        )}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
            Dreamy Tales
          </h1>
          <p className="text-xl md:text-2xl text-secondary">
            Personalized Animal Bedtime Stories
          </p>
        </header>
        
        <main className="max-w-4xl mx-auto">
          {!story ? (
            <>
              <StoryGenerator onStoryGenerated={handleStoryGenerated} />
              <div className="mt-8">
                <ReadingProgressSection />
              </div>
            </>
          ) : (
            <StoryDisplay 
              story={story} 
              onNewStory={handleNewStory} 
            />
          )}
        </main>
        
        <footer className="text-center text-sm text-muted-foreground mt-12 pb-6">
          <p>© {new Date().getFullYear()} Dreamy Tales. Sweet dreams!</p>
          <p className="mt-2">
            <a 
              href="/admin" 
              className="text-primary hover:underline text-xs"
            >
              Administración
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
