import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CollaborativeStoryCreator from '@/components/collaborative/CollaborativeStoryCreator';
import CollaborativeStoriesBrowser from '@/components/collaborative/CollaborativeStoriesBrowser';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCollaborative } from '@/lib/stores/useCollaborative';

export default function CollaborativePage() {
  const [activeTab, setActiveTab] = useState('create');
  const { currentStory } = useCollaborative();
  
  // If user has a current story, switch to collaborate
  React.useEffect(() => {
    if (currentStory && activeTab === 'join') {
      setActiveTab('create');
    }
  }, [currentStory, activeTab]);
  
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-8 pt-4">
          <Link to="/" className="mb-2 inline-block">
            <Button variant="ghost" size="sm">
              ← Back to Stories
            </Button>
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
            Collaborative Stories
          </h1>
          <p className="text-xl md:text-2xl text-secondary">
            Create and collaborate on magical bedtime stories together
          </p>
        </header>
        
        <main className="max-w-5xl mx-auto">
          <Tabs 
            defaultValue="create" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="mb-8"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="create">
                {currentStory ? "Continue Story" : "Create New Story"}
              </TabsTrigger>
              <TabsTrigger value="join">Browse Stories</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create">
              <CollaborativeStoryCreator />
            </TabsContent>
            
            <TabsContent value="join">
              <CollaborativeStoriesBrowser />
            </TabsContent>
          </Tabs>
        </main>
        
        <footer className="text-center text-sm text-muted-foreground mt-12 pb-6">
          <p>© {new Date().getFullYear()} Dreamy Tales. Sweet dreams!</p>
        </footer>
      </div>
    </div>
  );
}