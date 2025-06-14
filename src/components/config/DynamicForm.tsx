
import React, { useState } from 'react';
import { FormField } from '@/lib/configStore';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

interface DynamicFormProps {
  fields: FormField[];
  isPreview?: boolean;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, isPreview = false }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const sortedFields = [...fields].sort((a, b) => a.order - b.order);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPreview) return;
    
    console.log('Form submitted:', formData);
    // Here you would handle the actual form submission
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name] || '';
    
    const updateValue = (newValue: any) => {
      setFormData(prev => ({ ...prev, [field.name]: newValue }));
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => updateValue(e.target.value)}
            required={field.required}
            disabled={isPreview}
          />
        );

      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => updateValue(e.target.value)}
            required={field.required}
            disabled={isPreview}
            rows={4}
          />
        );

      case 'select':
        return (
          <Select value={value} onValueChange={updateValue} disabled={isPreview}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={field.id}
              checked={value}
              onCheckedChange={updateValue}
              disabled={isPreview}
            />
            <Label htmlFor={field.id}>{field.placeholder || field.label}</Label>
          </div>
        );

      case 'radio':
        return (
          <RadioGroup value={value} onValueChange={updateValue} disabled={isPreview}>
            {field.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}-${option}`} />
                <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {sortedFields.map((field) => (
          <div key={field.id} className="space-y-2">
            {field.type !== 'checkbox' && (
              <Label htmlFor={field.id}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
            )}
            {renderField(field)}
          </div>
        ))}

        {!isPreview && (
          <Button type="submit" className="w-full">
            Submit
          </Button>
        )}
        
        {isPreview && (
          <div className="text-center text-sm text-muted-foreground">
            This is a preview - form is not functional
          </div>
        )}
      </form>
    </div>
  );
};

export default DynamicForm;
