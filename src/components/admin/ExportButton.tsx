
import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Submission } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

interface ExportButtonProps {
  submissions: Submission[];
}

const ExportButton = ({ submissions }: ExportButtonProps) => {
  const { toast } = useToast();

  const handleExport = () => {
    if (submissions.length === 0) {
      toast({
        title: "No data to export",
        description: "There are no submissions to export.",
        variant: "destructive"
      });
      return;
    }
    
    // Create CSV header
    const headers = ["Name", "Email", "Phone", "Message", "Date"].join(",");
    
    // Create CSV rows
    const rows = submissions.map(submission => {
      const name = `"${submission.name.replace(/"/g, '""')}"`;
      const email = `"${submission.email.replace(/"/g, '""')}"`;
      const phone = `"${submission.phone.replace(/"/g, '""')}"`;
      const message = `"${submission.message.replace(/"/g, '""')}"`;
      const date = `"${new Date(submission.createdAt).toLocaleString()}"`;
      
      return [name, email, phone, message, date].join(",");
    });
    
    // Combine header and rows
    const csvContent = [headers, ...rows].join("\n");
    
    // Create a blob with the CSV content
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    
    // Create a download link
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `submissions-${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = "hidden";
    
    // Add the link to the DOM and trigger the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    
    toast({
      title: "Export successful",
      description: "Your submissions have been exported to CSV.",
    });
  };

  return (
    <Button 
      onClick={handleExport} 
      variant="outline" 
      className="flex items-center gap-2"
    >
      <FileText className="h-4 w-4" />
      <span>Export</span>
    </Button>
  );
};

export default ExportButton;
