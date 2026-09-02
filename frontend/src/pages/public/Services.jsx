import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SectionHeading } from '../../components/common/SectionHeading';
import { ServiceCard } from '../../components/services/ServiceCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { SEO } from '../../components/common/SEO';
import { CtaBanner } from '../../components/home/CtaBanner';
import { servicesApi } from '../../api/servicesApi';
import './Services.css';

export const Services = () => {
  const { openEnquiry } = useOutletContext();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await servicesApi.getPublic();
        if (res.success && res.services) {
          setServices(res.services);
        }
      } catch (e) {
        console.error('Error loading services', e);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="bf-services-page">
      <SEO
        title="Studio Services & Engineering Solutions"
        description="Comprehensive web application development, SaaS MVP engineering, custom internal tools, and API integrations by BuildForge Studio."
      />

      <section className="section-py bf-services-hero">
        <div className="container">
          <SectionHeading
            badge="Studio Capabilities"
            title="Custom engineering tailored to your business."
            subtitle="We don't sell rigid one-size-fits-all packages. Every system is architected around your exact data flows, user personas, and scaling goals."
          />

          {loading ? (
            <LoadingSpinner message="Fetching studio services..." />
          ) : (
            <div className="bf-services-grid">
              {services.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  onSelect={() => openEnquiry && openEnquiry('WEB_PROJECT')}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBanner onOpenEnquiry={openEnquiry} />
    </div>
  );
};
