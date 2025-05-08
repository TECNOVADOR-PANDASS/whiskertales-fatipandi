import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { type StorySegment } from '@/lib/stores/useCollaborative';
import AnimalIllustration from '@/components/AnimalIllustration';
import { Share, Printer, Download } from 'lucide-react';

interface CollaborativeStoryPreviewProps {
  title: string;
  prompt: string;
  animal: string;
  childName?: string;
  theme: string;
  segments: StorySegment[];
  isComplete: boolean;
}

export default function CollaborativeStoryPreview({
  title,
  prompt,
  animal,
  childName,
  theme,
  segments,
  isComplete
}: CollaborativeStoryPreviewProps) {
  const [open, setOpen] = useState(false);
  
  // Function to generate the full story text
  const generateFullStory = () => {
    // Start with the prompt
    let fullStory = prompt;
    
    // Add all segments, separated by line breaks
    segments.forEach((segment, index) => {
      // Add a line break between segments
      fullStory += "\n\n";
      
      // Add the segment content
      fullStory += segment.content;
    });
    
    return fullStory;
  };
  
  // Handle print functionality
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const storyContent = generateFullStory();
    
    printWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #1a1a1a; text-align: center; }
            .story-meta { text-align: center; color: #666; margin-bottom: 30px; }
            .story-content { line-height: 1.8; white-space: pre-wrap; }
            .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <div class="story-meta">
            <p>Animal: ${animal} | Theme: ${theme}${childName ? ` | Child: ${childName}` : ''}</p>
          </div>
          <div class="story-content">${storyContent}</div>
          <div class="footer">Created collaboratively on WhiskerTales</div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };
  
  // Handle download as text file
  const handleDownload = () => {
    const storyContent = generateFullStory();
    const blob = new Blob([`${title}\n\nAnimal: ${animal} | Theme: ${theme}${childName ? ` | Child: ${childName}` : ''}\n\n${storyContent}\n\nCreated collaboratively on WhiskerTales`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="mt-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="default" 
            className="w-full" 
            disabled={!isComplete}
          >
            {isComplete ? "View Complete Story" : "Story Preview (Complete the story first)"}
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-4xl h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">{title}</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col md:flex-row gap-6 h-full">
            <div className="md:w-2/3 h-full flex flex-col">
              <Card className="flex-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Story</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[50vh]">
                    <div className="space-y-4">
                      <div className="italic text-muted-foreground">{prompt}</div>
                      
                      {segments.map((segment, index) => (
                        <p key={segment.id} className="whitespace-pre-wrap">
                          {segment.content}
                        </p>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrint}>
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="md:w-1/3 text-center">
              <div className="sticky top-4">
                <div className="mb-4">
                  <AnimalIllustration 
                    animal={animal} 
                    className="w-48 h-48 mx-auto animal-float" 
                  />
                </div>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-1">Story Details</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Theme:</strong> {theme}</p>
                      <p><strong>Animal:</strong> {animal}</p>
                      {childName && <p><strong>Child:</strong> {childName}</p>}
                      <p><strong>Contributors:</strong> {segments.length}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}