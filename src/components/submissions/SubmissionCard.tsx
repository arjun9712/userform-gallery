
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Submission } from '@/lib/store';
import { Pencil, Trash2, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubmissionCardProps {
  submission: Submission;
  onEdit: (submission: Submission) => void;
  onDelete: (id: string) => void;
  onShare: (submission: Submission) => void;
}

const SubmissionCard: React.FC<SubmissionCardProps> = ({
  submission,
  onEdit,
  onDelete,
  onShare,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "group glass-card transition-all duration-300",
        isExpanded ? "p-6" : "p-5",
        isHovered && !isExpanded && "shadow-elevation scale-[1.01]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{submission.name}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{submission.email}</p>
          </div>
          
          <div className={cn(
            "opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2",
            isExpanded && "opacity-100"
          )}>
            <button 
              onClick={() => onEdit(submission)}
              className="p-2 hover:bg-secondary rounded-md transition-colors"
              aria-label="Edit submission"
            >
              <Pencil size={16} />
            </button>
            <button 
              onClick={() => onShare(submission)}
              className="p-2 hover:bg-secondary rounded-md transition-colors"
              aria-label="Share submission"
            >
              <Share2 size={16} />
            </button>
            <button 
              onClick={() => onDelete(submission.id)}
              className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors"
              aria-label="Delete submission"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        <div className="text-sm">
          <p className="text-foreground/80">{submission.phone}</p>
        </div>
        
        <div>
          <p className={cn(
            "text-sm text-foreground/70 line-clamp-2 transition-all duration-300", 
            isExpanded && "line-clamp-none"
          )}>
            {submission.message}
          </p>
          {submission.message.length > 120 && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-primary font-medium mt-2 hover:underline"
            >
              {isExpanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
        
        <div className="mt-1">
          <p className="text-xs text-muted-foreground">
            Submitted {formatDistanceToNow(new Date(submission.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubmissionCard;
