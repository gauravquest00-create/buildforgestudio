import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { ServiceCard } from '../services/ServiceCard';
import { Button } from '../common/Button';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { servicesApi } from '../../api/servicesApi';
import './ServicesOverview.css';

export const ServicesOverview = ({ onOpenEnquiry }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await servicesApi.getPublic();
        if (res.success && res.services) {
          setServices(res.services.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching services', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="section-py bf-services-overview">
      <div className="container">
        <SectionHeading
          badge="Specialized Services"
          title="Full-stack engineering without the overhead."
          subtitle="From zero-to-one SaaS products to custom business internal tools, we design, code, and deploy production systems."
        />

        {loading ? (
          <LoadingSpinner message="Loading services..." />
        ) : (
          <div className="bf-services-overview-grid">
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                onSelect={() => onOpenEnquiry && onOpenEnquiry('WEB_PROJECT')}
              />
            ))}
          </div>
        )}

        <div className="bf-services-overview-cta">
          <Button variant="secondary" size="lg" to="/services" icon={ArrowRight}>
            Explore All Studio Services
          </Button>
        </div>
      </div>
    </section>
  );
};
