import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface Collaborator {
  id: string;
  name: string;
  avatar: string;
}

export interface StorySegment {
  id: string;
  authorId: string;
  authorName: string;
  content: string;
  timestamp: Date;
}

export interface CollaborativeStory {
  id: string;
  title: string;
  prompt: string;
  animal: string;
  theme: string;
  childName?: string;
  contributionLimit: number;
  status: 'open' | 'in-progress' | 'completed';
  collaborators: Collaborator[];
  segments: StorySegment[];
  createdAt: Date;
  updatedAt: Date;
}

interface CollaborativeState {
  stories: CollaborativeStory[];
  currentStory: CollaborativeStory | null;
  
  // Actions
  createStory: (story: Omit<CollaborativeStory, 'id' | 'status' | 'segments' | 'createdAt' | 'updatedAt'>) => string;
  setCurrentStory: (storyId: string | null) => void;
  addSegment: (storyId: string, segment: Omit<StorySegment, 'id' | 'timestamp'>) => void;
  addCollaborator: (storyId: string, collaborator: Omit<Collaborator, 'id'>) => string;
  completeStory: (storyId: string) => void;
}

export const useCollaborative = create<CollaborativeState>()(
  subscribeWithSelector((set, get) => ({
    stories: [],
    currentStory: null,
    
    createStory: (storyData) => {
      const id = `story-${Date.now()}`;
      const newStory: CollaborativeStory = {
        ...storyData,
        id,
        status: 'open',
        segments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      set((state) => ({
        stories: [...state.stories, newStory],
        currentStory: newStory,
      }));
      
      return id;
    },
    
    setCurrentStory: (storyId) => {
      if (storyId === null) {
        set({ currentStory: null });
        return;
      }
      
      const story = get().stories.find(s => s.id === storyId) || null;
      set({ currentStory: story });
    },
    
    addSegment: (storyId, segmentData) => {
      const newSegment: StorySegment = {
        ...segmentData,
        id: `segment-${Date.now()}`,
        timestamp: new Date(),
      };
      
      set((state) => ({
        stories: state.stories.map(story => {
          if (story.id === storyId) {
            // Calculate new status based on segment count
            const newStatus: 'open' | 'in-progress' | 'completed' = 
              story.segments.length + 1 >= story.contributionLimit 
                ? 'completed' 
                : 'in-progress';
            
            const updatedStory = {
              ...story,
              segments: [...story.segments, newSegment],
              updatedAt: new Date(),
              status: newStatus,
            };
            
            // Also update current story if it's the one we're modifying
            if (state.currentStory?.id === storyId) {
              set({ currentStory: updatedStory });
            }
            
            return updatedStory;
          }
          return story;
        }),
      }));
    },
    
    addCollaborator: (storyId, collaboratorData) => {
      const id = `collaborator-${Date.now()}`;
      const newCollaborator: Collaborator = {
        ...collaboratorData,
        id,
      };
      
      set((state) => ({
        stories: state.stories.map(story => {
          if (story.id === storyId) {
            // Check if collaborator with same name already exists
            if (story.collaborators.some(c => c.name === newCollaborator.name)) {
              return story;
            }
            
            const updatedStory = {
              ...story,
              collaborators: [...story.collaborators, newCollaborator],
              updatedAt: new Date(),
            };
            
            // Also update current story if it's the one we're modifying
            if (state.currentStory?.id === storyId) {
              set({ currentStory: updatedStory });
            }
            
            return updatedStory;
          }
          return story;
        }),
      }));
      
      return id;
    },
    
    completeStory: (storyId) => {
      set((state) => ({
        stories: state.stories.map(story => {
          if (story.id === storyId) {
            const updatedStory = {
              ...story,
              status: 'completed' as const,
              updatedAt: new Date(),
            };
            
            // Also update current story if it's the one we're modifying
            if (state.currentStory?.id === storyId) {
              set({ currentStory: updatedStory });
            }
            
            return updatedStory;
          }
          return story;
        }),
      }));
    },
  }))
);