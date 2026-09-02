import React from 'react';
import { ArrowRight, Zap, Code, Server, Database, Plug, ShieldCheck, CloudUpload, PlusCircle } from 'lucide-react';
import { Button } from '../common/Button';
import './TaskCard.css';

export const TaskCard = ({ task, onSelect }) => {
  const { title, description, startingPrice, technology, icon } = task;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Server': return <Server size={20} />;
      case 'Database': return <Database size={20} />;
      case 'Plug': return <Plug size={20} />;
      case 'ShieldCheck': return <ShieldCheck size={20} />;
      case 'CloudUpload': return <CloudUpload size={20} />;
      case 'PlusCircle': return <PlusCircle size={20} />;
      case 'Code': return <Code size={20} />;
      default: return <Zap size={20} />;
    }
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect({
        type: 'QUICK_TASK',
        presetTitle: title,
        requirement: `Task: ${title}\n\nDetails: ${description}\n\nTechnology: ${technology}`,
        budget: startingPrice ? `From ${startingPrice}` : '$35',
        timeline: 'Immediate (24-48 Hours)',
      });
    }
  };

  return (
    <div className="bf-task-card">
      <div className="bf-task-card__top">
        <div className="bf-task-card__icon">{getIcon(icon)}</div>
        <span className="bf-task-card__price">From {startingPrice}</span>
      </div>

      <h3 className="bf-task-card__title">{title}</h3>
      <p className="bf-task-card__desc">{description}</p>

      <div className="bf-task-card__tech">
        <span>Stack:</span> {technology}
      </div>

      <Button
        variant="secondary"
        size="sm"
        className="bf-task-card__btn"
        onClick={handleClick}
        icon={ArrowRight}
      >
        Request Fix
      </Button>
    </div>
  );
};
