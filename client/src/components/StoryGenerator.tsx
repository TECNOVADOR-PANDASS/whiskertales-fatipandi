import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormContainer } from "@/components/ui/form-container";
import { generateStory } from "@/lib/storyGenerator";
import AnimalIllustration from "./AnimalIllustration";

// Define form schema with validation
const storyFormSchema = z.object({
  childName: z.string().min(2, { message: "Name must be at least 2 characters." }).max(30, { message: "Name can't be longer than 30 characters." }),
  animal: z.string({ required_error: "Please select an animal." }),
  theme: z.string({ required_error: "Please select a theme." }),
});

type StoryFormValues = z.infer<typeof storyFormSchema>;

// Available animals and themes
const animals = [
  "Rabbit", "Fox", "Bear", "Owl", "Elephant", "Lion", 
  "Turtle", "Wolf", "Giraffe", "Koala", "Tiger", "Penguin",
  "Squirrel", "Hedgehog", "Panda", "Dolphin", "Monkey"
];

const themes = [
  "Kindness", "Courage", "Friendship", "Sharing", "Patience",
  "Honesty", "Perseverance", "Teamwork", "Curiosity", "Respect",
  "Creativity", "Gratitude", "Adventure", "Nature", "Dreams"
];

interface StoryGeneratorProps {
  onStoryGenerated: (story: any) => void;
}

const StoryGenerator = ({ onStoryGenerated }: StoryGeneratorProps) => {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Initialize form
  const form = useForm<StoryFormValues>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      childName: "",
      animal: "",
      theme: "",
    },
  });
  
  // Submit handler
  const onSubmit = (data: StoryFormValues) => {
    setIsGenerating(true);
    
    // Generate story with slight delay to show loading state
    setTimeout(() => {
      const story = generateStory(data.childName, data.animal, data.theme);
      onStoryGenerated(story);
      setIsGenerating(false);
    }, 1500);
  };
  
  return (
    <FormContainer className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
        Create a Magical Bedtime Story
      </h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 flex justify-center items-start">
          <AnimalIllustration animal={selectedAnimal || "default"} />
        </div>
        
        <div className="md:w-2/3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="childName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Child's Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter child's name" 
                        className="text-lg p-6" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="animal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Favorite Animal</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedAnimal(value);
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-lg p-6">
                          <SelectValue placeholder="Select an animal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {animals.map((animal) => (
                          <SelectItem key={animal} value={animal} className="text-lg">
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
                    <FormLabel className="text-lg">Story Theme</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-lg p-6">
                          <SelectValue placeholder="Select a theme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {themes.map((theme) => (
                          <SelectItem key={theme} value={theme} className="text-lg">
                            {theme}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                size="lg" 
                className="w-full text-lg p-6"
                disabled={isGenerating}
              >
                {isGenerating ? "Creating Story..." : "Generate Bedtime Story"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </FormContainer>
  );
};

export default StoryGenerator;
