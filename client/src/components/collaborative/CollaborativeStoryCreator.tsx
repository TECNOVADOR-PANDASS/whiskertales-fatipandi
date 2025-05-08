import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormContainer } from '@/components/ui/form-container';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import AnimalIllustration from '../AnimalIllustration';
import CollaboratorsList from './CollaboratorsList';
import StorySegmentsList from './StorySegmentsList';
import CollaborativeStoryPreview from './CollaborativeStoryPreview';
import { useCollaborative, type Collaborator, type StorySegment, type CollaborativeStory } from '@/lib/stores/useCollaborative';

// Form validation schema
const collaborativeStorySchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  prompt: z.string().min(10, { message: 'Prompt must be at least 10 characters.' }),
  animal: z.string().min(1, { message: 'Please select an animal.' }),
  theme: z.string().min(1, { message: 'Please select a theme.' }),
  childName: z.string().optional(),
  contributionLimit: z.string().min(1, { message: 'Please set a contribution limit.' }),
});

// Available animals and themes (same as in StoryGenerator)
const animals = [
  "Rabbit", "Fox", "Bear", "Owl", "Elephant", "Lion", 
  "Turtle", "Wolf", "Giraffe", "Koala", "Tiger", "Penguin",
  "Squirrel", "Hedgehog", "Panda", "Dolphin", "Monkey",
  "Dragon", "Unicorn", "Butterfly", "Octopus", "Dinosaur"
];

const themes = [
  "Kindness", "Courage", "Friendship", "Sharing", "Patience",
  "Honesty", "Perseverance", "Teamwork", "Curiosity", "Respect",
  "Creativity", "Gratitude", "Adventure", "Nature", "Dreams",
  "Discovery", "Imagination", "Empathy", "Wisdom", "Joy"
];

export default function CollaborativeStoryCreator() {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('create');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Use the collaborative store
  const { 
    createStory, 
    currentStory, 
    addSegment, 
    addCollaborator 
  } = useCollaborative();
  
  // Initialize form
  const form = useForm<z.infer<typeof collaborativeStorySchema>>({
    resolver: zodResolver(collaborativeStorySchema),
    defaultValues: {
      title: '',
      prompt: '',
      animal: '',
      theme: '',
      childName: '',
      contributionLimit: '5',
    },
  });
  
  // Initialize with a default user (for demo purposes)
  useEffect(() => {
    if (currentStory && currentStory.collaborators.length === 0) {
      addCollaborator(currentStory.id, {
        name: 'You',
        avatar: '/avatars/user.png'
      });
    }
  }, [currentStory, addCollaborator]);
  
  // Handle animal selection
  const handleAnimalChange = (value: string) => {
    setSelectedAnimal(value);
    form.setValue('animal', value);
  };
  
  // Handle form submission
  const onSubmit = (data: z.infer<typeof collaborativeStorySchema>) => {
    // Create a new collaborative story
    createStory({
      title: data.title,
      prompt: data.prompt,
      animal: data.animal,
      theme: data.theme,
      childName: data.childName || undefined,
      contributionLimit: parseInt(data.contributionLimit),
      collaborators: [{ id: '1', name: 'You', avatar: '/avatars/user.png' }],
    });
    
    setShowSuccessMessage(true);
    setActiveTab('collaborate');
    
    // Hide success message after a delay
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
    
    // Reset form
    form.reset();
  };
  
  // Add a new story segment
  const handleAddStorySegment = (content: string) => {
    if (!currentStory) return;
    
    addSegment(currentStory.id, {
      authorId: '1', // Current user id
      authorName: 'You',
      content,
    });
  };
  
  return (
    <div className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
        Collaborative Story Creation
      </h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="create">Create Story</TabsTrigger>
          <TabsTrigger value="collaborate" disabled={!currentStory}>Collaborate</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create">
          <FormContainer>
            {showSuccessMessage && (
              <Alert className="mb-6 bg-green-50 border-green-200">
                <AlertTitle className="text-green-800">Story Created!</AlertTitle>
                <AlertDescription className="text-green-700">
                  Your collaborative story has been created. Switch to the Collaborate tab to start adding segments.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 flex justify-center items-start">
                <AnimalIllustration animal={selectedAnimal || "default"} />
              </div>
              
              <div className="md:w-2/3">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Story Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter a title for your collaborative story" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="prompt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Story Prompt</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide a starting prompt or idea for your collaborative story" 
                              {...field} 
                              className="min-h-[100px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="animal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Main Animal Character</FormLabel>
                            <Select
                              onValueChange={(value) => handleAnimalChange(value)}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an animal" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {animals.map((animal) => (
                                  <SelectItem key={animal} value={animal}>
                                    {animal}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="theme"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Story Theme</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a theme" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {themes.map((theme) => (
                                  <SelectItem key={theme} value={theme}>
                                    {theme}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="childName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Child's Name (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter a child's name if desired" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contributionLimit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contribution Limit</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Set a limit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="3">3 contributions</SelectItem>
                                <SelectItem value="5">5 contributions</SelectItem>
                                <SelectItem value="10">10 contributions</SelectItem>
                                <SelectItem value="15">15 contributions</SelectItem>
                                <SelectItem value="20">20 contributions</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Create Collaborative Story
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </FormContainer>
        </TabsContent>
        
        <TabsContent value="collaborate">
          {currentStory && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{currentStory.title}</CardTitle>
                  <CardDescription>
                    Theme: {currentStory.theme} • Animal: {currentStory.animal}
                    {currentStory.childName && ` • Child: ${currentStory.childName}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-2">Story Prompt:</h3>
                  <p className="text-muted-foreground mb-4">{currentStory.prompt}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <StorySegmentsList
                        segments={currentStory.segments}
                        onAddSegment={handleAddStorySegment}
                        storyLimit={currentStory.contributionLimit}
                      />
                      
                      <div className="mt-6">
                        <CollaborativeStoryPreview
                          title={currentStory.title}
                          prompt={currentStory.prompt}
                          animal={currentStory.animal}
                          childName={currentStory.childName}
                          theme={currentStory.theme}
                          segments={currentStory.segments}
                          isComplete={currentStory.segments.length >= currentStory.contributionLimit}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <CollaboratorsList collaborators={currentStory.collaborators} />
                      <div className="mt-6 flex justify-center">
                        <AnimalIllustration 
                          animal={currentStory.animal.toLowerCase()} 
                          className="w-40 h-40 animal-float" 
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}