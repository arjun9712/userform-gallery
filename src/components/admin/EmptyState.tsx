
import React from 'react';
import { Search, Trash2 } from 'lucide-react';

interface EmptyStateProps {
  searchTerm: string;
}

const EmptyState = ({ searchTerm }: EmptyStateProps) => {
  if (searchTerm) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Search size={48} className="text-muted-foreground mb-4 opacity-30" />
        <h3 className="text-lg font-medium mb-1">No matching submissions</h3>
        <p className="text-muted-foreground">
          We couldn't find any submissions matching "{searchTerm}"
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted rounded-full p-4 mb-4">
        <Trash2 size={32} className="text-muted-foreground opacity-50" />
      </div>
      <h3 className="text-lg font-medium mb-1">No submissions yet</h3>
      <p className="text-muted-foreground">
        Submissions will appear here once users complete the form
      </p>
    </div>
  );
};

export default EmptyState;
