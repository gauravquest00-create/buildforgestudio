import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { ProjectCard } from '../projects/ProjectCard';
import { Button } from '../common/Button';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { projectsApi } from '../../api/projectsApi';
import './FeaturedProjects.css';

export const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await projectsApi.getPublic({ featured: 'true' });
        if (res.success && res.projects) {
          setProjects(res.projects.slice(0, 3));
        }
      } catch (error) {
        console.error('Error loading featured projects', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="section-py bf-featured-section">
      <div className="container">
        <SectionHeading
          badge="Featured Systems"
          title="Engineered for real-world impact."
          subtitle="Explore some of the web applications, internal tools, and SaaS MVPs we have architected for our clients."
        />

        {loading ? (
          <LoadingSpinner message="Loading featured systems..." />
        ) : projects.length > 0 ? (
          <div className="bf-featured-grid">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="bf-no-featured">
            <p>New case studies being published soon.</p>
          </div>
        )}

        <div className="bf-featured-cta">
          <Button variant="secondary" size="lg" to="/work" icon={ArrowRight}>
            View All Work & Case Studies
          </Button>
        </div>
      </div>
    </section>
  );
};
