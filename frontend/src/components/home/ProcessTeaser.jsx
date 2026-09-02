import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { ProcessTimeline } from '../process/ProcessTimeline';
import { Button } from '../common/Button';
import { processApi } from '../../api/processApi';
import { LoadingSpinner } from '../common/LoadingSpinner';
import './ProcessTeaser.css';

export const ProcessTeaser = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProcess = async () => {
      try {
        const res = await processApi.getPublic();
        if (res.success && res.steps) {
          setSteps(res.steps);
        }
      } catch (e) {
        console.error('Error fetching process', e);
      } finally {
        setLoading(false);
      }
    };
    fetchProcess();
  }, []);

  return (
    <section className="section-py bf-process-teaser">
      <div className="container">
        <SectionHeading
          badge="Engineering Flow"
          title="How we bring ideas to production."
          subtitle="Our 4-step delivery pipeline guarantees transparency, robust code architecture, and on-time deployment."
        />

        {loading ? (
          <LoadingSpinner message="Loading delivery process..." />
        ) : (
          <ProcessTimeline steps={steps} />
        )}

        <div className="bf-process-teaser-cta">
          <Button variant="secondary" size="lg" to="/process" icon={ArrowRight}>
            Learn More About Our Process
          </Button>
        </div>
      </div>
    </section>
  );
};
