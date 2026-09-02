import { Admin } from '../models/Admin.js';
import { Setting } from '../models/Setting.js';
import { Service } from '../models/Service.js';
import { QuickTask } from '../models/QuickTask.js';
import { ProcessStep } from '../models/ProcessStep.js';
import { Project } from '../models/Project.js';
import { Testimonial } from '../models/Testimonial.js';
import {
  initialSettings,
  initialServices,
  initialQuickTasks,
  initialProcessSteps,
  initialProjects,
  initialTestimonials,
} from '../utils/seedData.js';

export const seedDatabase = async () => {
  try {
    // 1. Ensure Admin exists
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const email = process.env.ADMIN_EMAIL || 'admin@buildforgestudio.com';
      const password = process.env.ADMIN_PASSWORD || 'BuildForge@2026!Secure';
      await Admin.create({
        name: 'BuildForge Admin',
        email,
        password,
        role: 'SUPER_ADMIN',
      });
      console.log(`[Seed] Created initial Administrator: ${email}`);
    }

    // 2. Ensure Settings exist
    const settingCount = await Setting.countDocuments();
    if (settingCount === 0) {
      await Setting.create(initialSettings);
      console.log('[Seed] Seeded default Site Settings');
    }

    // 3. Ensure Services exist
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) {
      await Service.insertMany(initialServices);
      console.log('[Seed] Seeded default Services');
    }

    // 4. Ensure Quick Tasks exist
    const taskCount = await QuickTask.countDocuments();
    if (taskCount === 0) {
      await QuickTask.insertMany(initialQuickTasks);
      console.log('[Seed] Seeded default Quick Tasks');
    }

    // 5. Ensure Process Steps exist
    const processCount = await ProcessStep.countDocuments();
    if (processCount === 0) {
      await ProcessStep.insertMany(initialProcessSteps);
      console.log('[Seed] Seeded default Process Steps');
    }

    // 6. Ensure Projects exist
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(initialProjects);
      console.log('[Seed] Seeded default Projects');
    }

    // 7. Ensure Testimonials exist
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) {
      await Testimonial.insertMany(initialTestimonials);
      console.log('[Seed] Seeded default Testimonials');
    }

    console.log('[Seed] Database initialization check complete.');
  } catch (error) {
    console.error(`[Seed Error] ${error.message}`);
  }
};
