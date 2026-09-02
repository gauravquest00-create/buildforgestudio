import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SectionHeading } from '../../components/common/SectionHeading';
import { ProcessTimeline } from '../../components/process/ProcessTimeline';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { SEO } from '../../components/common/SEO';
import { CtaBanner } from '../../components/home/CtaBanner';
import { processApi } from '../../api/processApi';
import './Process.css';

export const Process = () => {
  const { openEnquiry } = useOutletContext();
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProcess = async () => {
      try {
        setLoading(true);
        const res = await processApi.getPublic();
        if (res.success && res.steps) {
          setSteps(res.steps);
        }
      } catch (e) {
        console.error('Error fetching process steps', e);
      } finally {
        setLoading(false);
      }
    };
    fetchProcess();
  }, []);

  return (
    <div className="bf-process-page">
      <SEO
        title="Our Engineering Process & Delivery Flow"
        description="Learn how BuildForge Studio designs, tests, and deploys high-grade digital systems from initial discovery to cloud launch."
      />

      <section className="section-py bf-process-page-hero">
        <div className="container">
          <SectionHeading
            badge="Methodology"
            title="A structured path to production."
            subtitle="No chaotic sprints or missed deadlines. Our 4-stage engineering timeline ensures full alignment on architecture, timeline, and deliverables."
          />

          {loading ? (
            <LoadingSpinner message="Loading timeline..." />
          ) : (
            <ProcessTimeline steps={steps} />
          )}
        </div>
      </section>

      <CtaBanner onOpenEnquiry={openEnquiry} />
    </div>
  );
};
