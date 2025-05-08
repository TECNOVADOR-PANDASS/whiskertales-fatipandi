import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface Milestone {
  id: number;
  title: string;
  description: string;
  storiesRequired: number;
  icon: string;
  completed: boolean;
}

interface ReadingProgressProps {
  storiesRead: number;
}

const ReadingProgress: React.FC<ReadingProgressProps> = ({ storiesRead }) => {
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 1,
      title: 'Aventurero Novato',
      description: '¡Has comenzado tu viaje de lectura!',
      storiesRequired: 1,
      icon: '🐣',
      completed: false
    },
    {
      id: 2,
      title: 'Explorador de Cuentos',
      description: 'Estás descubriendo el mundo de las historias',
      storiesRequired: 5,
      icon: '🦊',
      completed: false
    },
    {
      id: 3,
      title: 'Viajero de Sueños',
      description: 'Has visitado muchos mundos mágicos',
      storiesRequired: 10,
      icon: '🦉',
      completed: false
    },
    {
      id: 4,
      title: 'Guardián de Historias',
      description: 'Eres un verdadero amante de los cuentos',
      storiesRequired: 20,
      icon: '🐘',
      completed: false
    },
    {
      id: 5,
      title: 'Maestro de Aventuras',
      description: '¡Te has convertido en un experto de la lectura!',
      storiesRequired: 50,
      icon: '🦁',
      completed: false
    }
  ]);

  const [nextMilestone, setNextMilestone] = useState<Milestone | null>(null);
  const [percentToNextMilestone, setPercentToNextMilestone] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [recentlyCompletedMilestone, setRecentlyCompletedMilestone] = useState<Milestone | null>(null);

  // Actualizar el estado de los hitos basado en el número de historias leídas
  useEffect(() => {
    const updatedMilestones = milestones.map(milestone => ({
      ...milestone,
      completed: storiesRead >= milestone.storiesRequired
    }));
    
    setMilestones(updatedMilestones);
    
    // Encontrar el próximo hito no completado
    const nextIncomplete = updatedMilestones.find(m => !m.completed);
    setNextMilestone(nextIncomplete || null);
    
    // Calcular el porcentaje hasta el próximo hito
    if (nextIncomplete) {
      const prevMilestone = updatedMilestones.filter(m => m.completed).pop();
      const prevCount = prevMilestone ? prevMilestone.storiesRequired : 0;
      const range = nextIncomplete.storiesRequired - prevCount;
      const progress = storiesRead - prevCount;
      const percent = Math.min(100, Math.round((progress / range) * 100));
      setPercentToNextMilestone(percent);
    } else {
      setPercentToNextMilestone(100);
    }
    
    // Verificar si se completó un nuevo hito
    const justCompletedMilestone = updatedMilestones.find(
      milestone => milestone.storiesRequired === storiesRead
    );
    
    if (justCompletedMilestone) {
      setRecentlyCompletedMilestone(justCompletedMilestone);
      setShowCelebration(true);
      
      // Ocultar la celebración después de 5 segundos
      setTimeout(() => {
        setShowCelebration(false);
        setRecentlyCompletedMilestone(null);
      }, 5000);
    }
  }, [storiesRead]);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl shadow-sm border border-purple-100">
      <h2 className="text-xl font-bold text-primary mb-4">Tu Aventura de Lectura</h2>
      
      {/* Barra de progreso principal */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            {storiesRead} {storiesRead === 1 ? 'historia' : 'historias'} leídas
          </span>
          {nextMilestone && (
            <span className="text-sm font-medium text-primary">
              Próximo: {nextMilestone.title}
            </span>
          )}
        </div>
        <Progress value={percentToNextMilestone} className="h-3" />
      </div>
      
      {/* Mapa de hitos */}
      <div className="relative py-2">
        {/* Línea de conexión */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-primary/20 z-0"></div>
        
        {/* Hitos */}
        <div className="space-y-6 relative z-10">
          {milestones.map((milestone) => (
            <motion.div 
              key={milestone.id}
              className={`flex items-start gap-4 ${
                milestone.completed ? 'opacity-100' : 'opacity-60'
              }`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: milestone.completed ? 1 : 0.6 }}
              transition={{ duration: 0.3, delay: milestone.id * 0.1 }}
            >
              <div 
                className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full text-xl ${
                  milestone.completed 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {milestone.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold">{milestone.title}</h3>
                  {milestone.completed && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                      ¡Completado!
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{milestone.description}</p>
                <p className="text-xs mt-1">
                  {milestone.storiesRequired} {milestone.storiesRequired === 1 ? 'historia' : 'historias'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Celebración de hito completado */}
      {showCelebration && recentlyCompletedMilestone && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowCelebration(false)}
        >
          <motion.div 
            className="bg-white rounded-xl p-8 max-w-md text-center"
            initial={{ scale: 0.5, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 12 }}
          >
            <div className="text-6xl mb-4">{recentlyCompletedMilestone.icon}</div>
            <h2 className="text-2xl font-bold text-primary mb-2">¡Felicidades!</h2>
            <h3 className="text-xl font-semibold mb-4">{recentlyCompletedMilestone.title}</h3>
            <p className="mb-6">{recentlyCompletedMilestone.description}</p>
            <button 
              className="bg-primary text-white px-6 py-2 rounded-full font-medium"
              onClick={() => setShowCelebration(false)}
            >
              ¡Seguir leyendo!
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ReadingProgress;