import React, { useState, useEffect } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Check, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorState } from '../../components/common/ErrorState';
import { SEO } from '../../components/common/SEO';
import { CtaBanner } from '../../components/home/CtaBanner';
import { projectsApi } from '../../api/projectsApi';
import './ProjectDetail.css';

export const ProjectDetail = () => {
  const { slug } = useParams();
  const { openEnquiry } = useOutletContext();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await projectsApi.getBySlug(slug);
        if (res.success && res.project) {
          setProject(res.project);
        } else {
          setError('Case study not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to load case study.');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  const handleBuildSimilar = () => {
    if (!project || !openEnquiry) return;
    const type = project.category === 'SaaS MVP' ? 'SYSTEM_SAAS' : 'WEB_PROJECT';
    openEnquiry({
      type,
      presetTitle: `Similar to ${project.title}`,
      requirement: `I want to build a system similar to "${project.title}" (${project.category}).\n\nTarget Capabilities:\n${(project.features || []).map(f => '- ' + f).join('\n')}\n\nTechnology Stack: ${(project.technologies || []).join(', ')}`,
      budget: '$2,000 - $5,000+',
      timeline: 'Within 2-4 Weeks',
    });
  };

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading case study details..." />;
  }

  if (error || !project) {
    return (
      <div className="container section-py">
        <ErrorState
          title="Case Study Not Found"
          message={error || 'The requested project could not be found or has been unpublished.'}
        />
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Button variant="secondary" to="/work" icon={ArrowLeft} iconPosition="left">
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bf-project-detail-page">
      <SEO
        title={`${project.title} | Case Study`}
        description={project.shortDescription}
      />

      {/* Top Header */}
      <section className="bf-pdetail-header">
        <div className="container">
          <Link to="/work" className="bf-pdetail-back">
            <ArrowLeft size={16} />
            <span>Back to all projects</span>
          </Link>

          <div className="bf-pdetail-meta">
            <span className="bf-pdetail-cat">{project.category}</span>
          </div>

          <h1 className="bf-pdetail-title">{project.title}</h1>
          <p className="bf-pdetail-lead">{project.shortDescription}</p>

          <div className="bf-pdetail-actions">
            {project.liveDemoUrl && (
              <Button
                variant="gold"
                size="lg"
                href={project.liveDemoUrl}
                icon={ExternalLink}
              >
                View Live Demo
              </Button>
            )}

            <Button
              variant="secondary"
              size="lg"
              onClick={handleBuildSimilar}
              icon={ArrowRight}
            >
              Build Something Similar
            </Button>
          </div>
        </div>
      </section>

      {/* Hero Visual */}
      <div className="container">
        <div className="bf-pdetail-hero-img-wrap">
          <img
            src={project.thumbnail?.imageUrl}
            alt={project.thumbnail?.caption || project.title}
            className="bf-pdetail-hero-img"
          />
        </div>
      </div>

      {/* Case Study Content Body */}
      <section className="section-py bf-pdetail-body">
        <div className="container bf-pdetail-content-grid">
          {/* Main Column */}
          <div className="bf-pdetail-main-col">
            <div className="bf-pdetail-section">
              <h2 className="bf-pdetail-section-title">Project Overview</h2>
              <p className="bf-pdetail-text">{project.fullDescription}</p>
            </div>

            {project.problem && (
              <div className="bf-pdetail-section">
                <h2 className="bf-pdetail-section-title">The Challenge</h2>
                <div className="bf-problem-box">
                  <p>{project.problem}</p>
                </div>
              </div>
            )}

            {project.solution && (
              <div className="bf-pdetail-section">
                <h2 className="bf-pdetail-section-title">The Engineered Solution</h2>
                <div className="bf-solution-box">
                  <p>{project.solution}</p>
                </div>
              </div>
            )}

            {project.features && project.features.length > 0 && (
              <div className="bf-pdetail-section">
                <h2 className="bf-pdetail-section-title">Key Capabilities & Features</h2>
                <ul className="bf-pdetail-features-list">
                  {project.features.map((feat, idx) => (
                    <li key={idx}>
                      <Check size={18} className="bf-pfeat-check" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Additional Gallery */}
            /* {project.gallery && project.gallery.length > 0 && (
              <div className="bf-pdetail-section">
                <h2 className="bf-pdetail-section-title">System Screenshots</h2>
                <div className="bf-pdetail-gallery">
                  {project.gallery.map((img, idx) => (
                    <div key={idx} className="bf-gallery-item">
                      <img src={img.imageUrl} alt={img.caption || `Screenshot ${idx + 1}`} />
                      {img.caption && <p className="bf-gallery-caption">{img.caption}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div> */

          {/* Sidebar / Specs */}
          <aside className="bf-pdetail-sidebar">
            <div className="bf-pdetail-spec-card">
              <h3 className="bf-spec-heading">Technology Architecture</h3>
              <div className="bf-spec-tech-pills">
                {project.technologies?.map((tech, idx) => (
                  <span key={idx} className="bf-spec-tech-tag">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="bf-spec-item">
                <span className="bf-spec-label">Project Type</span>
                <span className="bf-spec-val">{project.category}</span>
              </div>

              {project.liveDemoUrl && (
                <div className="bf-spec-item">
                  <span className="bf-spec-label">Live Deployment</span>
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bf-spec-link"
                  >
                    Open Live Application <ExternalLink size={12} />
                  </a>
                </div>
              )}

              <div className="bf-spec-cta">
                <Button
                  variant="primary"
                  size="md"
                  className="bf-spec-btn"
                  onClick={handleBuildSimilar}
                  icon={ArrowRight}
                >
                  Request Consultation
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <CtaBanner onOpenEnquiry={openEnquiry} />
    </div>
  );
};
