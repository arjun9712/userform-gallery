
import React, { useState } from 'react';
import { Submission, useSubmissionStore } from '@/lib/store';
import SubmissionCard from './SubmissionCard';
import SubmissionsTable from './SubmissionsTable';
import EditModal from './EditModal';
import ShareModal from './ShareModal';
import { useToast } from '@/hooks/use-toast';

// Import the new components
import SearchBar from './admin/SearchBar';
import ViewToggle from './admin/ViewToggle';
import EmptyState from './admin/EmptyState';
import DeleteConfirmationModal from './admin/DeleteConfirmationModal';
import ExportButton from './admin/ExportButton';

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
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
            <div className="flex items-center gap-4">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
              <ViewToggle value={viewMode} onChange={setViewMode} />
              <ExportButton submissions={submissions} />
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground mb-4">
            {filteredSubmissions.length} {filteredSubmissions.length === 1 ? 'submission' : 'submissions'} found
          </div>
          
          {filteredSubmissions.length === 0 ? (
            <EmptyState searchTerm={searchTerm} />
          ) : viewMode === 'grid' ? (
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
          ) : (
            <SubmissionsTable 
              submissions={filteredSubmissions}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onShare={handleShare}
            />
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
      
      <DeleteConfirmationModal 
        isOpen={isConfirmDeleteOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default AdminGallery;
