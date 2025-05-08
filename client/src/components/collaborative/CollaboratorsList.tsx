import { type Collaborator } from '@/lib/stores/useCollaborative';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CollaboratorsListProps {
  collaborators: Collaborator[];
}

export default function CollaboratorsList({ collaborators }: CollaboratorsListProps) {
  return (
    <Card className="h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Collaborators</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {collaborators.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center">
              No collaborators yet
            </p>
          ) : (
            <ul className="space-y-3">
              {collaborators.map((collaborator) => (
                <li key={collaborator.id} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                    <AvatarFallback>
                      {collaborator.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{collaborator.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}