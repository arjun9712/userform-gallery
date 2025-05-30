
import React from 'react';
import UserForm from '@/components/UserForm';
import Navigation from '@/components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30">
      <Navigation />
      
      <main className="container-padding pt-28 pb-16 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <div className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            User Information
          </div>
          <h1 className="heading text-3xl sm:text-4xl md:text-5xl mb-4">
            Submit your information
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Please fill out the form below with your details. All submissions will be reviewed by our team.
          </p>
        </div>
        
        <UserForm />
      </main>
    </div>
  );
};

export default Index;
