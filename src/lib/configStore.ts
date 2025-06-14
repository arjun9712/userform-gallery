
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FieldType = 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'radio';

export type FormField = {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: string[]; // for select, radio
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  order: number;
};

type ConfigStore = {
  formFields: FormField[];
  addField: (field: Omit<FormField, 'id' | 'order'>) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  deleteField: (id: string) => void;
  reorderFields: (fields: FormField[]) => void;
  resetToDefault: () => void;
};

const defaultFields: FormField[] = [
  {
    id: 'name',
    name: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    placeholder: 'Enter your name',
    order: 0,
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Enter your email',
    order: 1,
  },
  {
    id: 'phone',
    name: 'phone',
    label: 'Phone',
    type: 'phone',
    required: true,
    placeholder: 'Enter your phone number',
    order: 2,
  },
  {
    id: 'message',
    name: 'message',
    label: 'Message',
    type: 'textarea',
    required: true,
    placeholder: 'Enter your message',
    order: 3,
  },
];

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set, get) => ({
      formFields: defaultFields,
      addField: (field) => {
        const fields = get().formFields;
        const newField: FormField = {
          ...field,
          id: crypto.randomUUID(),
          order: fields.length,
        };
        set((state) => ({
          formFields: [...state.formFields, newField],
        }));
      },
      updateField: (id, updates) => {
        set((state) => ({
          formFields: state.formFields.map((field) =>
            field.id === id ? { ...field, ...updates } : field
          ),
        }));
      },
      deleteField: (id) => {
        set((state) => ({
          formFields: state.formFields.filter((field) => field.id !== id)
            .map((field, index) => ({ ...field, order: index })),
        }));
      },
      reorderFields: (fields) => {
        set({ formFields: fields });
      },
      resetToDefault: () => {
        set({ formFields: defaultFields });
      },
    }),
    {
      name: 'form-config-store',
    }
  )
);
