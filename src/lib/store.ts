
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
};

type SubmissionStore = {
  submissions: Submission[];
  addSubmission: (submission: Omit<Submission, 'id' | 'createdAt'>) => void;
  updateSubmission: (id: string, data: Partial<Omit<Submission, 'id' | 'createdAt'>>) => void;
  deleteSubmission: (id: string) => void;
  getSubmission: (id: string) => Submission | undefined;
};

export const useSubmissionStore = create<SubmissionStore>()(
  persist(
    (set, get) => ({
      submissions: [],
      addSubmission: (submission) => {
        const newSubmission: Submission = {
          ...submission,
          id: crypto.randomUUID(),
          createdAt: new Date(),
        };
        set((state) => ({
          submissions: [newSubmission, ...state.submissions],
        }));
      },
      updateSubmission: (id, data) => {
        set((state) => ({
          submissions: state.submissions.map((submission) =>
            submission.id === id
              ? { ...submission, ...data }
              : submission
          ),
        }));
      },
      deleteSubmission: (id) => {
        set((state) => ({
          submissions: state.submissions.filter((submission) => submission.id !== id),
        }));
      },
      getSubmission: (id) => {
        return get().submissions.find((submission) => submission.id === id);
      },
    }),
    {
      name: 'submission-store',
    }
  )
);
