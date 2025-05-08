import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface StoryCompletionProgressProps {
  segmentsCount: number;
  totalSegments: number;
}

export default function StoryCompletionProgress({
  segmentsCount,
  totalSegments
}: StoryCompletionProgressProps) {
  const progressPercentage = (segmentsCount / totalSegments) * 100;
  const isComplete = segmentsCount >= totalSegments;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium">Story Completion</p>
        <Badge variant={isComplete ? "default" : "outline"} className={isComplete ? "bg-green-600" : ""}>
          {isComplete ? "Complete" : `${segmentsCount}/${totalSegments} segments`}
        </Badge>
      </div>
      
      <Progress 
        value={progressPercentage} 
        className="h-2" 
        indicatorClassName={isComplete ? "bg-green-600" : undefined}
      />
      
      {isComplete && (
        <p className="text-xs text-green-600 font-medium text-center animate-pulse">
          Story complete! You can now view the full story.
        </p>
      )}
    </div>
  );
}