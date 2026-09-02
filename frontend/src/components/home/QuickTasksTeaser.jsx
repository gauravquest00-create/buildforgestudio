import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { TaskCard } from '../tasks/TaskCard';
import { Button } from '../common/Button';
import { quickTasksApi } from '../../api/quickTasksApi';
import { LoadingSpinner } from '../common/LoadingSpinner';
import './QuickTasksTeaser.css';

export const QuickTasksTeaser = ({ onOpenEnquiry }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await quickTasksApi.getPublic();
        if (res.success && res.quickTasks) {
          setTasks(res.quickTasks.slice(0, 4));
        }
      } catch (e) {
        console.error('Error fetching quick tasks', e);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <section className="section-py bf-quick-tasks-teaser">
      <div className="container">
        <SectionHeading
          badge="Rapid Dev Work"
          title="Need something fixed or connected today?"
          subtitle="Don't hire a full agency for small React bugs, Node API errors, or deployment fixes. We execute quick tasks starting from $25 with 24-48h turnaround."
        />

        {loading ? (
          <LoadingSpinner message="Loading quick task categories..." />
        ) : (
          <div className="bf-tasks-teaser-grid">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onSelect={() => onOpenEnquiry && onOpenEnquiry('QUICK_TASK')}
              />
            ))}
          </div>
        )}

        <div className="bf-tasks-teaser-cta">
          <Button variant="gold" size="lg" to="/quick-tasks" icon={ArrowRight}>
            View All Quick Task Options
          </Button>
        </div>
      </div>
    </section>
  );
};
