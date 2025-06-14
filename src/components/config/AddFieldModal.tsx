
import React, { useState } from 'react';
import { useConfigStore, FieldType } from '@/lib/configStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface AddFieldModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const fieldTypes: { value: FieldType; label: string }[] = [
  { value: 'text', label: 'Text Input' },
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'select', label: 'Select Dropdown' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'radio', label: 'Radio Buttons' },
];

const AddFieldModal: React.FC<AddFieldModalProps> = ({ open, onOpenChange }) => {
  const { addField } = useConfigStore();
  const [formData, setFormData] = useState({
    name: '',
    label: '',
    type: 'text' as FieldType,
    required: false,
    placeholder: '',
    options: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const fieldData = {
      name: formData.name || formData.label.toLowerCase().replace(/\s+/g, '_'),
      label: formData.label,
      type: formData.type,
      required: formData.required,
      placeholder: formData.placeholder || undefined,
      options: formData.options ? formData.options.split('\n').filter(Boolean) : undefined,
    };

    addField(fieldData);
    onOpenChange(false);
    setFormData({
      name: '',
      label: '',
      type: 'text',
      required: false,
      placeholder: '',
      options: '',
    });
  };

  const requiresOptions = ['select', 'radio'].includes(formData.type);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Field</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="label">Field Label</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
              placeholder="Enter field label"
              required
            />
          </div>

          <div>
            <Label htmlFor="name">Field Name (optional)</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Auto-generated from label"
            />
          </div>

          <div>
            <Label htmlFor="type">Field Type</Label>
            <Select value={formData.type} onValueChange={(value: FieldType) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fieldTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="placeholder">Placeholder</Label>
            <Input
              id="placeholder"
              value={formData.placeholder}
              onChange={(e) => setFormData({ ...formData, placeholder: e.target.value })}
              placeholder="Enter placeholder text"
            />
          </div>

          {requiresOptions && (
            <div>
              <Label htmlFor="options">Options (one per line)</Label>
              <Textarea
                id="options"
                value={formData.options}
                onChange={(e) => setFormData({ ...formData, options: e.target.value })}
                placeholder="Option 1&#10;Option 2&#10;Option 3"
                required
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="required"
              checked={formData.required}
              onCheckedChange={(checked) => setFormData({ ...formData, required: !!checked })}
            />
            <Label htmlFor="required">Required field</Label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Field</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddFieldModal;
