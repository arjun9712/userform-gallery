
import React, { useState } from 'react';
import { useConfigStore } from '@/lib/configStore';
import { Plus, Eye, RotateCcw } from 'lucide-react';
import FieldCard from './FieldCard';
import AddFieldModal from './AddFieldModal';
import PreviewModal from './PreviewModal';

const FormBuilder = () => {
  const { formFields, resetToDefault } = useConfigStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const sortedFields = [...formFields].sort((a, b) => a.order - b.order);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Form Fields</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setShowPreview(true)}
            className="btn-secondary flex items-center gap-2"
          >
            <Eye size={16} />
            Preview
          </button>
          <button
            onClick={resetToDefault}
            className="btn-ghost flex items-center gap-2"
          >
            <RotateCcw size={16} />
            Reset to Default
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={16} />
            Add Field
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {sortedFields.map((field) => (
          <FieldCard key={field.id} field={field} />
        ))}
        
        {formFields.length === 0 && (
          <div className="glass-card p-8 text-center">
            <p className="text-muted-foreground mb-4">No fields configured</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary"
            >
              Add Your First Field
            </button>
          </div>
        )}
      </div>

      <AddFieldModal 
        open={showAddModal} 
        onOpenChange={setShowAddModal} 
      />
      
      <PreviewModal 
        open={showPreview} 
        onOpenChange={setShowPreview} 
      />
    </div>
  );
};

export default FormBuilder;
