import { useState } from 'react';
import { type StorySegment } from '@/lib/stores/useCollaborative';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import StoryCompletionProgress from './StoryCompletionProgress';

interface StorySegmentsListProps {
  segments: StorySegment[];
  onAddSegment: (content: string) => void;
  storyLimit: number;
}

export default function StorySegmentsList({ 
  segments, 
  onAddSegment, 
  storyLimit 
}: StorySegmentsListProps) {
  const [newSegment, setNewSegment] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const isComplete = segments.length >= storyLimit;
  
  const handleAddSegment = () => {
    if (!newSegment.trim()) {
      setError('Please enter some content for your story segment.');
      return;
    }
    
    if (newSegment.length < 10) {
      setError('Your story segment should be at least 10 characters long.');
      return;
    }
    
    onAddSegment(newSegment);
    setNewSegment('');
    setError(null);
  };
  
  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Story Segments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {segments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center italic">
              No segments yet. Be the first to contribute!
            </p>
          ) : (
            <ul className="space-y-4 mb-6">
              {segments.map((segment, index) => (
                <li key={segment.id} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback>
                        {segment.authorName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{segment.authorName}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {new Date(segment.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{segment.content}</p>
                </li>
              ))}
            </ul>
          )}
          
          {!isComplete ? (
            <div className="space-y-4">
              <Textarea
                value={newSegment}
                onChange={(e) => setNewSegment(e.target.value)}
                placeholder="Add your contribution to the story..."
                className="min-h-[100px]"
              />
              
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {segments.length} of {storyLimit} segments completed
                  </p>
                  <Button onClick={handleAddSegment}>
                    Add Segment
                  </Button>
                </div>
                
                <StoryCompletionProgress 
                  segmentsCount={segments.length} 
                  totalSegments={storyLimit} 
                />
              </div>
            </div>
          ) : (
            <Alert>
              <AlertDescription>
                This story is complete! The maximum number of segments has been reached.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}