import validator from 'validator';

export const validateEnquiry = (req, res, next) => {
  const { name, email, requirement, type } = req.body;
  const errors = [];

  if (!name || validator.isEmpty(name.trim())) {
    errors.push('Name is required');
  }

  if (!email || !validator.isEmail(email)) {
    errors.push('A valid email address is required');
  }

  if (!requirement || validator.isEmpty(requirement.trim())) {
    errors.push('Requirement details are required');
  }

  if (type && !['QUICK_TASK', 'WEB_PROJECT', 'SYSTEM_SAAS', 'NOT_SURE'].includes(type)) {
    errors.push('Invalid enquiry category selected');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};

export const validateProject = (req, res, next) => {
  const { title, slug, shortDescription, fullDescription } = req.body;
  const errors = [];

  if (!title || validator.isEmpty(title.trim())) errors.push('Project title is required');
  if (!slug || validator.isEmpty(slug.trim())) errors.push('Project slug is required');
  if (!shortDescription || validator.isEmpty(shortDescription.trim())) errors.push('Short description is required');
  if (!fullDescription || validator.isEmpty(fullDescription.trim())) errors.push('Full description is required');

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};
