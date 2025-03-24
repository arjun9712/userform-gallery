
import React, { useState } from 'react';
import { Submission } from '@/lib/store';
import { X, Copy, Check, Mail, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareModalProps {
  submission?: Submission;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ submission, onClose }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  if (!submission) return null;
  
  const shareText = `
Name: ${submission.name}
Email: ${submission.email}
Phone: ${submission.phone}
Message: ${submission.message}
  `.trim();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    toast({
      title: "Copied",
      description: "Text copied to clipboard",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Submission from ${submission.name}`);
    const body = encodeURIComponent(shareText);
    window.open(`mailto:?subject=${subject}&body=${body}`);
    
    toast({
      title: "Email App Opened",
      description: "Compose your email with the submission data",
    });
  };
  
  const handleSMSShare = () => {
    const body = encodeURIComponent(shareText);
    window.open(`sms:?body=${body}`);
    
    toast({
      title: "SMS App Opened",
      description: "Compose your message with the submission data",
    });
  };
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-background rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between bg-background px-6 py-4 border-b">
          <h2 className="font-display text-xl font-semibold">Share Submission</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Submission Details</h3>
            <div className="bg-secondary/50 p-4 rounded-lg text-sm">
              <p><span className="font-medium">Name:</span> {submission.name}</p>
              <p><span className="font-medium">Email:</span> {submission.email}</p>
              <p><span className="font-medium">Phone:</span> {submission.phone}</p>
              <p className="mt-2"><span className="font-medium">Message:</span></p>
              <p className="mt-1 whitespace-pre-wrap">{submission.message}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Share Options</h3>
            
            <button 
              onClick={handleCopy}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-sm font-medium"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
              <span>{copied ? "Copied to clipboard" : "Copy text"}</span>
            </button>
            
            <button 
              onClick={handleEmailShare}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-sm font-medium"
            >
              <Mail size={18} />
              <span>Share via email</span>
            </button>
            
            <button 
              onClick={handleSMSShare}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-sm font-medium"
            >
              <MessageSquare size={18} />
              <span>Share via SMS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
