import React from 'react';
import { Check } from 'lucide-react';
import './ProcessTimeline.css';

export const ProcessTimeline = ({ steps = [] }) => {
  return (
    <div className="bf-process-timeline">
      {steps.map((step, idx) => (
        <div key={step._id || idx} className="bf-timeline-step">
          <div className="bf-timeline-step__marker">
            <span className="bf-step-number">{step.stepNumber}</span>
            {idx < steps.length - 1 && <div className="bf-timeline-line" />}
          </div>

          <div className="bf-timeline-step__card">
            <h3 className="bf-step-title">{step.title}</h3>
            <p className="bf-step-desc">{step.description}</p>
            {step.details && step.details.length > 0 && (
              <ul className="bf-step-details">
                {step.details.map((detail, dIdx) => (
                  <li key={dIdx}>
                    <Check size={14} className="bf-step-check" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
