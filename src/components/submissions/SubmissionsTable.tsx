
import React from 'react';
import { Submission } from '@/lib/store';
import { formatDistanceToNow } from 'date-fns';
import { Pencil, Trash2, Share2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SubmissionsTableProps {
  submissions: Submission[];
  onEdit: (submission: Submission) => void;
  onDelete: (id: string) => void;
  onShare: (submission: Submission) => void;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  submissions,
  onEdit,
  onDelete,
  onShare,
}) => {
  // Function to truncate long text for the table view
  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-border/30">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow key={submission.id} className="hover:bg-secondary/30">
              <TableCell className="font-medium">{submission.name}</TableCell>
              <TableCell>{submission.email}</TableCell>
              <TableCell>{submission.phone}</TableCell>
              <TableCell className="max-w-[200px]">
                <div className="truncate" title={submission.message}>
                  {truncateText(submission.message)}
                </div>
              </TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(submission.createdAt), { addSuffix: true })}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(submission)}
                    className="h-8 w-8 p-0"
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onShare(submission)}
                    className="h-8 w-8 p-0"
                    title="Share"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(submission.id)}
                    className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubmissionsTable;
