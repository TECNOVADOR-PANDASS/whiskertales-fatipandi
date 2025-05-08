import React, { useState } from 'react';
import { useReadingProgress } from '@/lib/stores/useReadingProgress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedProgressTracker from './AnimatedProgressTracker';
import ReadingProgress from './ReadingProgress';
import AnimalIllustration from './AnimalIllustration';
import { motion, AnimatePresence } from 'framer-motion';

const ReadingProgressSection: React.FC = () => {
  const { storiesRead, storyHistory, resetProgress } = useReadingProgress();
  const [activeTab, setActiveTab] = useState<string>('animated');
  const [selectedAnimal, setSelectedAnimal] = useState<string>('default');
  
  const handleMilestoneReached = (milestoneId: number) => {
    console.log('Milestone reached:', milestoneId);
    // Si tuviéramos un sistema de notificaciones, mostraríamos un mensaje aquí
  };
  
  // Función para generar una lista de animales disponibles para elegir
  const getAvailableAnimals = () => {
    // Si no hay historias leídas, mostrar solo animales básicos
    if (storiesRead < 5) {
      return ['Rabbit', 'Bear', 'Fox', 'default'];
    }
    // A medida que lee más historias, desbloquear más animales
    else if (storiesRead < 10) {
      return ['Rabbit', 'Bear', 'Fox', 'Owl', 'Lion', 'default'];
    }
    else if (storiesRead < 20) {
      return ['Rabbit', 'Bear', 'Fox', 'Owl', 'Lion', 'Elephant', 'Penguin', 'Dolphin', 'default'];
    }
    // Desbloquear todos los animales disponibles
    else {
      return [
        'Rabbit', 'Bear', 'Fox', 'Owl', 'Lion', 'Elephant', 'Penguin', 'Dolphin',
        'Dragon', 'Unicorn', 'Butterfly', 'Dinosaur', 'default'
      ];
    }
  };
  
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-primary mb-4 text-center">
        Tu Progreso de Lectura
      </h2>
      
      <Tabs defaultValue="animated" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="animated">Rastreador Animado</TabsTrigger>
          <TabsTrigger value="detailed">Detalles de Progreso</TabsTrigger>
        </TabsList>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <TabsContent value="animated" className="mt-0">
              <AnimatedProgressTracker 
                animal={selectedAnimal} 
                onMilestoneReached={handleMilestoneReached}
              />
              
              {/* Selector de personaje animado */}
              {storiesRead > 0 && (
                <div className="mt-4 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Elige tu compañero de lectura:</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {getAvailableAnimals().map((animal) => (
                      <button
                        key={animal}
                        onClick={() => setSelectedAnimal(animal)}
                        className={`relative w-12 h-12 p-1 rounded-full transition-all ${
                          selectedAnimal === animal 
                            ? 'ring-2 ring-primary bg-primary/10' 
                            : 'hover:bg-gray-100'
                        }`}
                        title={animal}
                      >
                        <div className="w-full h-full">
                          <AnimalIllustration animal={animal} className="w-10 h-10 mx-auto" />
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-center text-gray-500 mt-2">
                    {storiesRead < 20 
                      ? `¡Lee más historias para desbloquear más compañeros! (${storiesRead}/20)`
                      : '¡Has desbloqueado todos los compañeros de lectura!'}
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="detailed" className="mt-0">
              <ReadingProgress storiesRead={storiesRead} />
              
              {storiesRead > 0 && (
                <div className="mt-4 bg-white p-4 rounded-lg border border-gray-100">
                  <h3 className="text-lg font-medium text-primary mb-2">Historias leídas:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 max-h-60 overflow-y-auto">
                    {storyHistory.map((title, index) => (
                      <motion.li 
                        key={index} 
                        className="p-2 rounded hover:bg-gray-50"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <span className="inline-block w-6 h-6 bg-primary/10 text-primary rounded-full text-xs text-center leading-6 mr-2">
                          {index + 1}
                        </span>
                        {title}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
      
      {storiesRead > 0 && (
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={resetProgress}
            className="text-xs"
          >
            Reiniciar Progreso
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReadingProgressSection;