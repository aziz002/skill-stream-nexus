
import React from 'react';
import { Search, Handshake, CheckCircle } from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md">
      <div className="p-4 bg-primary/10 rounded-full mb-4">
        <div className="text-primary w-12 h-12 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How Freeness Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Getting started is easy. Find talent, collaborate, and grow your business with our simple process.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Step 
            icon={<Search size={32} />} 
            title="Search for Talent" 
            description="Browse our extensive network of skilled freelancers to find the perfect match for your project needs."
          />
          
          <Step 
            icon={<Handshake size={32} />} 
            title="Connect & Collaborate" 
            description="Communicate directly with freelancers, discuss project details, and establish a working relationship."
          />
          
          <Step 
            icon={<CheckCircle size={32} />} 
            title="Complete Projects" 
            description="Work together to achieve your goals, with secure payments and support throughout the process."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
