
import React from 'react';
import { useConfigStore } from '@/lib/configStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DynamicForm from './DynamicForm';

interface PreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PreviewModal: React.FC<PreviewModalProps> = ({ open, onOpenChange }) => {
  const { formFields } = useConfigStore();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Form Preview</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <DynamicForm fields={formFields} isPreview />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewModal;
