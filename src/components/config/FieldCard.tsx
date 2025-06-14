
import React, { useState } from 'react';
import { FormField, useConfigStore } from '@/lib/configStore';
import { Pencil, Trash2, GripVertical } from 'lucide-react';
import EditFieldModal from './EditFieldModal';

interface FieldCardProps {
  field: FormField;
}

const FieldCard: React.FC<FieldCardProps> = ({ field }) => {
  const { deleteField } = useConfigStore();
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this field?')) {
      deleteField(field.id);
    }
  };

  return (
    <>
      <div className="glass-card p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GripVertical size={16} className="text-muted-foreground cursor-grab" />
          <div>
            <h3 className="font-medium">{field.label}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="capitalize">{field.type}</span>
              {field.required && (
                <span className="bg-red-100 text-red-800 px-1.5 py-0.5 rounded text-xs">
                  Required
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEditModal(true)}
            className="p-2 hover:bg-secondary rounded-md transition-colors"
            aria-label="Edit field"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors"
            aria-label="Delete field"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <EditFieldModal
        field={field}
        open={showEditModal}
        onOpenChange={setShowEditModal}
      />
    </>
  );
};

export default FieldCard;
