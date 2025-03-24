
import React from 'react';
import AdminGallery from '@/components/AdminGallery';
import Navigation from '@/components/Navigation';

const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30">
      <Navigation />
      
      <main className="container-padding pt-28 pb-16 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <div className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            Admin Panel
          </div>
          <h1 className="heading text-3xl sm:text-4xl md:text-5xl mb-4">
            Manage Submissions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            View, edit, delete and share submissions from users.
          </p>
        </div>
        
        <AdminGallery />
      </main>
    </div>
  );
};

export default Admin;
