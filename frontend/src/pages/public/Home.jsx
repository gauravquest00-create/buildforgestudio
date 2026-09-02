import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Hero } from '../../components/home/Hero';
import { WhatWeDo } from '../../components/home/WhatWeDo';
import { FeaturedProjects } from '../../components/home/FeaturedProjects';
import { ServicesOverview } from '../../components/home/ServicesOverview';
import { QuickTasksTeaser } from '../../components/home/QuickTasksTeaser';
import { ProcessTeaser } from '../../components/home/ProcessTeaser';
import { TestimonialsSection } from '../../components/home/TestimonialsSection';
import { CtaBanner } from '../../components/home/CtaBanner';
import { SEO } from '../../components/common/SEO';
import './Home.css';

export const Home = () => {
  const { openEnquiry } = useOutletContext();

  return (
    <div className="bf-home-page">
      <SEO
        title="Custom Web Systems, SaaS MVPs & Quick Dev Tasks"
        description="BuildForge Studio is an independent online development studio delivering custom web applications, SaaS MVPs, and rapid development bug fixes."
      />
      <Hero onOpenEnquiry={openEnquiry} />
      <WhatWeDo onOpenEnquiry={openEnquiry} />
      <FeaturedProjects />
      <ServicesOverview onOpenEnquiry={openEnquiry} />
      <QuickTasksTeaser onOpenEnquiry={openEnquiry} />
      <ProcessTeaser />
      <TestimonialsSection />
      <CtaBanner onOpenEnquiry={openEnquiry} />
    </div>
  );
};
