import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import './ProjectCard.css';

export const ProjectCard = ({ project }) => {
  const {
    title,
    slug,
    shortDescription,
    category,
    thumbnail,
    technologies = [],
    liveDemoUrl,
    featured,
  } = project;

  return (
    <article className="bf-project-card">
      <div className="bf-project-card__visual">
        <Link to={`/work/${slug}`} className="bf-project-card__img-link">
          <img
            src={thumbnail?.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'}
            alt={thumbnail?.caption || title}
            className="bf-project-card__img"
            loading="lazy"
          />
        </Link>
        <div className="bf-project-card__badges">
          <span className="bf-project-card__cat">{category}</span>
          {featured && (
            <span className="bf-project-card__featured">
              <Sparkles size={12} /> Featured
            </span>
          )}
        </div>
      </div>

      <div className="bf-project-card__body">
        <div className="bf-project-card__tech">
          {technologies.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="bf-tech-pill">
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="bf-tech-pill bf-tech-pill--more">
              +{technologies.length - 4}
            </span>
          )}
        </div>

        <h3 className="bf-project-card__title">
          <Link to={`/work/${slug}`}>{title}</Link>
        </h3>

        <p className="bf-project-card__desc">{shortDescription}</p>

        <div className="bf-project-card__footer">
          <Link to={`/work/${slug}`} className="bf-project-card__view-btn">
            <span>Case Study</span>
            <ArrowUpRight size={16} />
          </Link>

          {liveDemoUrl && (
            <a
              href={liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bf-project-card__demo-link"
              title="Open Live Demonstration in a new tab"
            >
              <ExternalLink size={14} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
