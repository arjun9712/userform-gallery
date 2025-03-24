
import React, { useState } from 'react';
import { Submission, useSubmissionStore } from '@/lib/store';
import SubmissionCard from './SubmissionCard';
import EditModal from './EditModal';
import ShareModal from './ShareModal';
import { Search, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminGallery = () => {
  const { toast } = useToast();
  const submissions = useSubmissionStore((state) => state.submissions);
  const updateSubmission = useSubmissionStore((state) => state.updateSubmission);
  const deleteSubmission = useSubmissionStore((state) => state.deleteSubmission);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | undefined>(undefined);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState<string | null>(null);
  
  const filteredSubmissions = submissions.filter((submission) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      submission.name.toLowerCase().includes(searchTermLower) ||
      submission.email.toLowerCase().includes(searchTermLower) ||
      submission.phone.toLowerCase().includes(searchTermLower) ||
      submission.message.toLowerCase().includes(searchTermLower)
    );
  });
  
  const handleEdit = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsEditModalOpen(true);
  };
  
  const handleShare = (submission: Submission) => {
    setSelectedSubmission(submission);
    setIsShareModalOpen(true);
  };
  
  const handleDelete = (id: string) => {
    setSubmissionToDelete(id);
    setIsConfirmDeleteOpen(true);
  };
  
  const confirmDelete = () => {
    if (submissionToDelete) {
      deleteSubmission(submissionToDelete);
      toast({
        title: "Deleted",
        description: "Submission has been deleted successfully.",
      });
      setIsConfirmDeleteOpen(false);
      setSubmissionToDelete(null);
    }
  };
  
  const cancelDelete = () => {
    setIsConfirmDeleteOpen(false);
    setSubmissionToDelete(null);
  };
  
  return (
    <>
      <div className="w-full animate-fade-in">
        <div className="glass-card p-6 mb-6">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
            <h2 className="heading text-2xl">Submissions</h2>
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                <Search size={18} />
              </div>
              <input
                type="search"
                className="form-input pl-10"
                placeholder="Search submissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground mb-4">
            {filteredSubmissions.length} {filteredSubmissions.length === 1 ? 'submission' : 'submissions'} found
          </div>
          
          {filteredSubmissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              {searchTerm ? (
                <>
                  <Search size={48} className="text-muted-foreground mb-4 opacity-30" />
                  <h3 className="text-lg font-medium mb-1">No matching submissions</h3>
                  <p className="text-muted-foreground">
                    We couldn't find any submissions matching "{searchTerm}"
                  </p>
                </>
              ) : (
                <>
                  <div className="bg-muted rounded-full p-4 mb-4">
                    <Trash2 size={32} className="text-muted-foreground opacity-50" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">No submissions yet</h3>
                  <p className="text-muted-foreground">
                    Submissions will appear here once users complete the form
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubmissions.map((submission) => (
                <SubmissionCard
                  key={submission.id}
                  submission={submission}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onShare={handleShare}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {isEditModalOpen && (
        <EditModal
          submission={selectedSubmission}
          onClose={() => setIsEditModalOpen(false)}
          onSave={updateSubmission}
        />
      )}
      
      {isShareModalOpen && (
        <ShareModal
          submission={selectedSubmission}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
      
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-background rounded-xl max-w-md w-full animate-scale-in p-6">
            <h2 className="font-display text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete this submission? This action cannot be undone.</p>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="btn-ghost"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="btn-danger"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminGallery;
