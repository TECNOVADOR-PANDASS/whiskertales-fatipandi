import { useState } from 'react';
import Game3D from './Game3D';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGame } from '@/lib/stores/useGame';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface StoryGameIntegrationProps {
  animal: string;
  childName: string;
  theme: string;
}

export default function StoryGameIntegration({ animal, childName, theme }: StoryGameIntegrationProps) {
  const [showGame, setShowGame] = useState(false);
  const { phase, start, restart, setCurrentAnimal } = useGame();
  
  // Set the current animal in the game state
  const handleStartGame = () => {
    setCurrentAnimal(animal.toLowerCase());
    setShowGame(true);
    start();
  };
  
  // Generate game instructions based on the theme
  const getGameInstructions = () => {
    switch(theme.toLowerCase()) {
      case 'kindness':
        return `Help ${animal} collect hearts by moving around the field. Use arrow keys to move and space to jump.`;
      case 'courage':
        return `Guide ${animal} through the field, facing challenges along the way. Use arrow keys to move and space to jump.`;
      case 'friendship':
        return `${animal} is looking for friends! Move around to explore. Use arrow keys to move and space to jump.`;
      case 'adventure':
        return `Take ${animal} on an exciting adventure! Move with arrow keys and space to jump.`;
      default:
        return `Control ${animal} in this magical world! Use arrow keys to move and space to jump.`;
    }
  };
  
  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">Interactive Story Adventure</CardTitle>
        <CardDescription>
          Join {animal} in a magical 3D world inspired by your story!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="instructions" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
            <TabsTrigger value="game" disabled={!showGame}>Game</TabsTrigger>
          </TabsList>
          
          <TabsContent value="instructions" className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-bold mb-2">How to Play:</h3>
              <p className="mb-4">{getGameInstructions()}</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Arrow keys or WASD: Move {animal}</li>
                <li>Space: Jump</li>
                <li>Mouse: Look around</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Enter the world where your story takes place and explore with {animal}!
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="mt-2" 
                onClick={handleStartGame}
              >
                {showGame ? 'Continue Playing' : 'Start Adventure'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="game">
            <Game3D animal={animal.toLowerCase()} />
            
            <div className="mt-4 flex justify-between">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => restart()}
                >
                  Restart
                </Button>
                
                <Button
                  variant="secondary"
                  onClick={() => setShowGame(false)}
                >
                  Back to Instructions
                </Button>
              </div>
              
              <Button
                variant="default"
                onClick={() => {
                  window.open(`/game?animal=${encodeURIComponent(animal)}&childName=${encodeURIComponent(childName)}&theme=${encodeURIComponent(theme)}`, '_blank');
                }}
              >
                Open Fullscreen Game
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}