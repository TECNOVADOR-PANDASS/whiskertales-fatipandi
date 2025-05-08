import { useState } from 'react';
import { useCollaborative, type CollaborativeStory } from '@/lib/stores/useCollaborative';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AnimalIllustration from '../AnimalIllustration';
import { AlertCircle, Search, ChevronsRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function CollaborativeStoriesBrowser() {
  const { stories, setCurrentStory } = useCollaborative();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredStories = stories.filter(story => {
    const searchLower = searchTerm.toLowerCase();
    return (
      story.title.toLowerCase().includes(searchLower) ||
      story.animal.toLowerCase().includes(searchLower) ||
      story.theme.toLowerCase().includes(searchLower) ||
      (story.childName && story.childName.toLowerCase().includes(searchLower))
    );
  });
  
  // Status badge color mapping
  const getStatusColor = (status: 'open' | 'in-progress' | 'completed') => {
    switch (status) {
      case 'open':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'in-progress':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'completed':
        return 'bg-green-600 hover:bg-green-700';
      default:
        return '';
    }
  };
  
  // Format date to be more user-friendly
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const handleJoinStory = (storyId: string) => {
    setCurrentStory(storyId);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Browse Collaborative Stories</CardTitle>
          <CardDescription>
            Find and join existing collaborative stories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by title, animal, theme..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">
          {searchTerm ? `Search Results (${filteredStories.length})` : 'All Stories'}
        </h3>
        
        {filteredStories.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="pt-6 pb-6 text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-2" />
              <p className="text-sm text-muted-foreground">
                {searchTerm
                  ? "No stories found matching your search."
                  : "No collaborative stories have been created yet. Create the first one!"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-4 pr-4">
              {filteredStories.map((story) => (
                <StoryCard 
                  key={story.id} 
                  story={story}
                  onJoin={handleJoinStory}
                  formatDate={formatDate}
                  getStatusColor={getStatusColor}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}

interface StoryCardProps {
  story: CollaborativeStory;
  onJoin: (storyId: string) => void;
  formatDate: (date: Date) => string;
  getStatusColor: (status: 'open' | 'in-progress' | 'completed') => string;
}

function StoryCard({ story, onJoin, formatDate, getStatusColor }: StoryCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 p-4 flex items-center justify-center bg-muted/30">
          <AnimalIllustration 
            animal={story.animal} 
            className="w-24 h-24"
          />
        </div>
        
        <div className="md:w-3/4 flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">{story.title}</CardTitle>
                <CardDescription>
                  Theme: {story.theme} • Created: {formatDate(story.createdAt)}
                </CardDescription>
              </div>
              <Badge className={`${getStatusColor(story.status)}`}>
                {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="pb-2">
            <p className="text-sm line-clamp-2">{story.prompt}</p>
            <div className="flex gap-2 mt-2 text-xs text-muted-foreground">
              <span>{story.segments.length} of {story.contributionLimit} segments</span>
              <span>•</span>
              <span>{story.collaborators.length} collaborators</span>
            </div>
          </CardContent>
          
          <CardFooter className="pt-0 flex justify-end">
            <Button 
              variant="ghost" 
              size="sm"
              className="gap-1"
              onClick={() => onJoin(story.id)}
            >
              Join Story <ChevronsRight className="h-3 w-3" />
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}