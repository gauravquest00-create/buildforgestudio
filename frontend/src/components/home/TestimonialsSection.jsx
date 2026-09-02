import React, { useState, useEffect } from 'react';
import { Star, Quote as QuoteIcon } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { testimonialsApi } from '../../api/testimonialsApi';
import './TestimonialsSection.css';

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await testimonialsApi.getPublic();
        if (res.success && res.testimonials) {
          setTestimonials(res.testimonials);
        }
      } catch (e) {
        console.error('Error fetching testimonials', e);
      }
    };
    fetchTestimonials();
  }, []);

  if (!testimonials.length) return null;

  return (
    <section className="section-py bf-testimonials-section">
      <div className="container">
        <SectionHeading
          badge="Client Feedback"
          title="Trusted by founders and product teams."
          subtitle="Hear what founders and business operators say about collaborating with BuildForge Studio."
        />

        <div className="bf-testimonials-grid">
          {testimonials.map((t) => (
            <div key={t._id} className="bf-testimonial-card">
              <div className="bf-testimonial-stars">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>

              <p className="bf-testimonial-quote">"{t.quote}"</p>

              <div className="bf-testimonial-author">
                {t.avatar?.imageUrl && (
                  <img
                    src={t.avatar.imageUrl}
                    alt={t.clientName}
                    className="bf-author-avatar"
                  />
                )}
                <div>
                  <h4 className="bf-author-name">{t.clientName}</h4>
                  <span className="bf-author-role">
                    {t.role}{t.company ? ` • ${t.company}` : ''}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
