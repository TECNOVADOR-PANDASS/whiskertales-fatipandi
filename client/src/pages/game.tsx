import { useState, useEffect } from "react";
import { useLocation, Link, useSearchParams } from "react-router-dom";
import Game3D from "@/components/game/Game3D";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useGame } from "@/lib/stores/useGame";
import { FormContainer } from "@/components/ui/form-container";

export default function GamePage() {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const { start, restart } = useGame();
  const [helpVisible, setHelpVisible] = useState(true);
  
  // Get parameters from URL search params first, then location state, or default
  const animal = searchParams.get('animal') || state?.animal || "default";
  const childName = searchParams.get('childName') || state?.childName || "Friend";
  const theme = searchParams.get('theme') || state?.theme || "Adventure";
  
  // Start game on mount
  useEffect(() => {
    start();
  }, []);
  
  const toggleHelp = () => setHelpVisible(!helpVisible);
  
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <header className="text-center mb-8 pt-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
            Dreamy Tales Adventure
          </h1>
          <p className="text-xl md:text-2xl text-secondary">
            Explore the magical world with {animal}
          </p>
        </header>
        
        <main className="max-w-4xl mx-auto">
          {helpVisible && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>How to Play</CardTitle>
                <CardDescription>
                  Control {animal} in this magical 3D world
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 mb-4">
                  <li>Arrow keys or WASD: Move {animal}</li>
                  <li>Space: Jump</li>
                  <li>Mouse: Look around</li>
                </ul>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore the world and have fun!
                </p>
                <Button onClick={toggleHelp}>Hide Instructions</Button>
              </CardContent>
            </Card>
          )}
          
          <FormContainer className="mb-8">
            <Game3D animal={animal} />
            
            <div className="flex justify-between mt-6">
              <div className="flex gap-2">
                <Button variant="outline" onClick={restart}>
                  Restart Game
                </Button>
                {!helpVisible && (
                  <Button variant="secondary" onClick={toggleHelp}>
                    Show Instructions
                  </Button>
                )}
              </div>
              
              <Link to="/">
                <Button variant="default">
                  Back to Stories
                </Button>
              </Link>
            </div>
          </FormContainer>
        </main>
      </div>
    </div>
  );
}