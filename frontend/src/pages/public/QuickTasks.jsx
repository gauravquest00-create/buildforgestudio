import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Zap, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../../components/common/SectionHeading';
import { TaskCard } from '../../components/tasks/TaskCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { SEO } from '../../components/common/SEO';
import { CtaBanner } from '../../components/home/CtaBanner';
import { quickTasksApi } from '../../api/quickTasksApi';
import './QuickTasks.css';

export const QuickTasks = () => {
  const { openEnquiry } = useOutletContext();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await quickTasksApi.getPublic();
        if (res.success && res.quickTasks) {
          setTasks(res.quickTasks);
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
    <div className="bf-quick-tasks-page">
      <SEO
        title="Quick Development Tasks & Bug Fixes ($25+)"
        description="Fast turnaround React bug fixes, Node.js API adjustments, MongoDB schema repairs, and third-party integrations with same-day response."
      />

      <section className="section-py bf-qtasks-hero">
        <div className="container">
          <SectionHeading
            badge="Rapid Turnaround"
            title="Need something fixed, connected or built?"
            subtitle="BuildForge accepts smaller development tasks without requiring a huge project commitment. Submit your issue and get it resolved in 24-48 hours."
          />

          {/* Key Advantages */}
          <div className="bf-qtasks-perks">
            <div className="bf-perk-card">
              <Clock size={20} className="bf-perk-icon" />
              <div>
                <strong>24-48h Delivery</strong>
                <p>Urgent fixes prioritized immediately</p>
              </div>
            </div>
            <div className="bf-perk-card">
              <Zap size={20} className="bf-perk-icon" />
              <div>
                <strong>From $25</strong>
                <p>Transparent upfront quoting</p>
              </div>
            </div>
            <div className="bf-perk-card">
              <ShieldCheck size={20} className="bf-perk-icon" />
              <div>
                <strong>Tested & Guaranteed</strong>
                <p>Clean code with zero regressions</p>
              </div>
            </div>
          </div>

          {loading ? (
            <LoadingSpinner message="Fetching quick task categories..." />
          ) : (
            <div className="bf-qtasks-grid">
              {tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onSelect={() => openEnquiry && openEnquiry('QUICK_TASK')}
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
