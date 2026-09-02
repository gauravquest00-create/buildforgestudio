import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { SectionHeading } from '../../components/common/SectionHeading';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { SEO } from '../../components/common/SEO';
import { CtaBanner } from '../../components/home/CtaBanner';
import { projectsApi } from '../../api/projectsApi';
import './Work.css';

export const Work = () => {
  const { openEnquiry } = useOutletContext();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = [
    'ALL',
    'SaaS MVP',
    'Business System',
    'Web Application',
    'Dashboard',
    'Internal Tool',
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const params = selectedCategory !== 'ALL' ? { category: selectedCategory } : {};
        const res = await projectsApi.getPublic(params);
        if (res.success && res.projects) {
          setProjects(res.projects);
        }
      } catch (error) {
        console.error('Error loading projects', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [selectedCategory]);

  return (
    <div className="bf-work-page">
      <SEO
        title="Our Work & Case Studies"
        description="Explore custom web applications, SaaS MVPs, and business management systems engineered by BuildForge Studio."
      />

      <section className="section-py bf-work-hero">
        <div className="container">
          <SectionHeading
            badge="Studio Portfolio"
            title="Digital systems engineered to perform."
            subtitle="Explore our portfolio of bespoke web applications, SaaS products, and business management platforms built for real clients."
          />

          {/* Filter Categories */}
          <div className="bf-work-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`bf-filter-pill ${selectedCategory === cat ? 'is-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'ALL' ? 'All Projects' : cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {loading ? (
            <LoadingSpinner message="Fetching case studies..." />
          ) : projects.length > 0 ? (
            <div className="bf-work-grid">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No projects in this category yet"
              description="We regularly publish new case studies. Choose another category or get in touch for custom references."
              actionText="View All Projects"
              onAction={() => setSelectedCategory('ALL')}
            />
          )}
        </div>
      </section>

      <CtaBanner onOpenEnquiry={openEnquiry} />
    </div>
  );
};
