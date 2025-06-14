
import React from 'react';
import Navigation from '@/components/Navigation';
import FormBuilder from '@/components/config/FormBuilder';

const Config = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30">
      <Navigation />
      
      <main className="container-padding pt-28 pb-16 mx-auto max-w-7xl">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <div className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            Configuration
          </div>
          <h1 className="heading text-3xl sm:text-4xl md:text-5xl mb-4">
            Form Builder
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Customize the user submission form by adding, editing, or removing fields.
          </p>
        </div>
        
        <FormBuilder />
      </main>
    </div>
  );
};

export default Config;
