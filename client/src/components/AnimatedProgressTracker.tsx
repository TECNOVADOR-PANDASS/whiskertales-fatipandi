import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReadingProgress } from '@/lib/stores/useReadingProgress';
import { useGame } from '@/lib/stores/useGame';
import AnimalIllustration from './AnimalIllustration';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AnimatedProgressTrackerProps {
  animal?: string;
  onMilestoneReached?: (milestone: number) => void;
}

interface Milestone {
  id: number;
  storiesRequired: number;
  title: string;
  description: string;
  completed: boolean;
}

const AnimatedProgressTracker: React.FC<AnimatedProgressTrackerProps> = ({ 
  animal = 'default', 
  onMilestoneReached 
}) => {
  const { storiesRead } = useReadingProgress();
  const { 
    animateAnimal, 
    progressAnimation, 
    isAnimalAnimating,
    celebrate
  } = useGame();
  
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: 1, storiesRequired: 1, title: 'Aventurero Novato', description: '¡Completaste tu primera historia!', completed: false },
    { id: 2, storiesRequired: 5, title: 'Explorador de Cuentos', description: 'Estás descubriendo mundos mágicos', completed: false },
    { id: 3, storiesRequired: 10, title: 'Viajero de Sueños', description: 'Has visitado muchos reinos encantados', completed: false },
    { id: 4, storiesRequired: 20, title: 'Guardián de Historias', description: 'Eres un verdadero amante de las aventuras', completed: false },
    { id: 5, storiesRequired: 50, title: 'Maestro de Fantasía', description: '¡Has dominado el arte de la lectura!', completed: false }
  ]);
  
  // Estados para efectos visuales y animaciones
  const [showConfetti, setShowConfetti] = useState(false);
  const [recentMilestone, setRecentMilestone] = useState<Milestone | null>(null);
  
  // Mapeo entre el estado de animación y los estados visuales
  const isJumping = progressAnimation === 'jump' || progressAnimation === 'celebrate';
  const isSpinning = progressAnimation === 'spin' || progressAnimation === 'celebrate';
  
  // Calcular el progreso actual y el próximo hito
  const currentMilestoneIndex = milestones.findIndex(m => storiesRead < m.storiesRequired);
  const currentMilestone = currentMilestoneIndex > 0 
    ? milestones[currentMilestoneIndex - 1] 
    : null;
  const nextMilestone = currentMilestoneIndex !== -1 
    ? milestones[currentMilestoneIndex] 
    : milestones[milestones.length - 1];
  
  // Calcular el porcentaje de progreso hacia el próximo hito
  const prevStoriesRequired = currentMilestone ? currentMilestone.storiesRequired : 0;
  const storiesNeededForNext = nextMilestone.storiesRequired - prevStoriesRequired;
  const storiesProgress = storiesRead - prevStoriesRequired;
  const percentComplete = Math.min(100, Math.floor((storiesProgress / storiesNeededForNext) * 100));
  
  // Actualizar el estado de los hitos cuando cambia el número de historias leídas
  useEffect(() => {
    const updatedMilestones = milestones.map(milestone => ({
      ...milestone,
      completed: storiesRead >= milestone.storiesRequired
    }));
    
    // Verificar si se completó un nuevo hito
    const justCompletedMilestone = updatedMilestones.find(
      milestone => 
        milestone.storiesRequired === storiesRead && 
        !milestone.completed
    );
    
    if (justCompletedMilestone) {
      setRecentMilestone(justCompletedMilestone);
      
      // Animar el personaje usando el store de juego
      animateAnimal('celebrate');
      
      // Efectos visuales adicionales
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      
      // Celebrar en el store de juego
      celebrate();
      
      // Notificar al componente padre si es necesario
      if (onMilestoneReached) {
        onMilestoneReached(justCompletedMilestone.id);
      }
    }
    
    setMilestones(updatedMilestones);
  }, [storiesRead, onMilestoneReached, animateAnimal, celebrate]);
  
  return (
    <div className="relative bg-gradient-to-b from-purple-50 to-blue-50 p-6 rounded-xl shadow-md border border-purple-100">
      <h3 className="text-xl font-bold text-center text-primary mb-4">
        Tu progreso de lectura
      </h3>
      
      {/* Personaje animado */}
      <div className="flex justify-center mb-4">
        <motion.div
          animate={{
            y: isJumping ? [-20, 0] : 0,
            rotate: isSpinning ? [0, 360] : 0,
            scale: isJumping || isSpinning ? [1, 1.2, 1] : 1
          }}
          transition={{
            duration: isSpinning ? 1.5 : 0.5,
            type: "spring",
            stiffness: 200
          }}
          className="relative"
        >
          <div className="w-24 h-24">
            <AnimalIllustration animal={animal} />
          </div>
          
          {/* Burbujas de pensamiento con el próximo hito */}
          <AnimatePresence>
            {!isJumping && !isSpinning && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: -30 }}
                animate={{ opacity: 1, scale: 1, y: -50 }}
                exit={{ opacity: 0, scale: 0.5, y: -30 }}
                className="absolute -top-2 right-0 bg-white p-2 rounded-lg shadow-sm border border-gray-200 w-40 z-10"
                style={{
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 60% 100%, 55% 75%, 0% 75%)"
                }}
              >
                <p className="text-xs font-medium text-gray-600">
                  {nextMilestone.completed 
                    ? "¡Has alcanzado todos los hitos!" 
                    : `Próximo hito: ${nextMilestone.title} (${storiesProgress}/${storiesNeededForNext})`}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Barra de progreso */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>{storiesRead} historias</span>
          <span>{nextMilestone.storiesRequired} historias</span>
        </div>
        <Progress value={percentComplete} className="h-2" />
      </div>
      
      {/* Mapa de hitos */}
      <div className="space-y-2">
        {milestones.map((milestone) => (
          <motion.div
            key={milestone.id}
            initial={{ opacity: 0.6, x: -10 }}
            animate={{ 
              opacity: milestone.completed ? 1 : 0.6, 
              x: 0,
              scale: recentMilestone?.id === milestone.id ? [1, 1.05, 1] : 1
            }}
            transition={{ duration: 0.3 }}
            className={cn(
              "flex items-center gap-2 p-2 rounded-md transition-colors",
              milestone.completed ? "bg-green-50" : "bg-gray-50"
            )}
          >
            <div 
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                milestone.completed ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
              )}
            >
              {milestone.completed ? "✓" : milestone.id}
            </div>
            <div className="flex-1">
              <p className={cn(
                "text-sm font-medium",
                milestone.completed ? "text-green-700" : "text-gray-600"
              )}>
                {milestone.title}
              </p>
              <p className="text-xs text-gray-500">{milestone.description}</p>
            </div>
            {milestone.completed && (
              <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 text-xs">
                ¡Completado!
              </Badge>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Confeti para celebrar los hitos */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-20"
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  top: "-10%",
                  left: `${Math.random() * 100}%`,
                  scale: Math.random() * 0.5 + 0.5,
                  rotate: Math.random() * 360
                }}
                animate={{
                  top: "110%",
                  rotate: Math.random() * 720,
                  x: Math.random() * 100 - 50
                }}
                transition={{
                  duration: Math.random() * 2 + 1,
                  ease: "easeOut"
                }}
                className="absolute w-2 h-2 rounded-sm"
                style={{
                  background: `hsl(${Math.random() * 360}, 80%, 60%)`
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mensaje de celebración de hito */}
      <AnimatePresence>
        {recentMilestone && showConfetti && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 rounded-xl"
          >
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-[80%] text-center">
              <h4 className="text-xl font-bold text-primary mb-2">¡Felicidades!</h4>
              <p className="text-lg font-medium text-gray-800 mb-1">
                Has alcanzado el hito: {recentMilestone.title}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                {recentMilestone.description}
              </p>
              <div className="w-16 h-16 mx-auto mb-2">
                <AnimalIllustration animal={animal} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedProgressTracker;