// Auto-tagging utility for mapping courses to skill tree leaf nodes
// Based on E-Learn project specification and React best practices

// Define the skill tree structure for mapping
export const skillTreeMap = {
  // Frontend Technologies
  'html': {
    keywords: ['html', 'html5', 'markup', 'semantic html', 'dom', 'web markup', 'hypertext'],
    patterns: [/\bhtml\b/i, /\bhtml5\b/i, /\bmarkup\b/i, /\bdom\b/i]
  },
  'css': {
    keywords: ['css', 'css3', 'sass', 'scss', 'less', 'flexbox', 'grid', 'styling', 'bootstrap', 'tailwind'],
    patterns: [/\bcss\b/i, /\bcss3\b/i, /\bsass\b/i, /\bscss\b/i, /\bflexbox\b/i, /\bgrid\b/i, /\bbootstrap\b/i, /\btailwind\b/i]
  },
  'javascript': {
    keywords: ['javascript', 'js', 'es6', 'es2015', 'vanilla js', 'typescript', 'ts', 'dom manipulation'],
    patterns: [/\bjavascript\b/i, /\bjs\b/i, /\bes6\b/i, /\bes2015\b/i, /\btypescript\b/i, /\bts\b/i]
  },
  'react': {
    keywords: ['react', 'reactjs', 'react.js', 'jsx', 'react hooks', 'redux', 'react router', 'next.js', 'nextjs'],
    patterns: [/\breact\b/i, /\breactjs\b/i, /\breact\.js\b/i, /\bjsx\b/i, /\bredux\b/i, /\bnext\.?js\b/i]
  },

  // Backend Technologies
  'java': {
    keywords: ['java', 'spring', 'spring boot', 'hibernate', 'maven', 'gradle', 'jvm', 'jsp', 'servlet'],
    patterns: [/\bjava\b/i, /\bspring\b/i, /\bhibernate\b/i, /\bmaven\b/i, /\bgradle\b/i, /\bjvm\b/i]
  },
  'python': {
    keywords: ['python', 'django', 'flask', 'fastapi', 'pandas', 'numpy', 'scipy', 'python3', 'pip'],
    patterns: [/\bpython\b/i, /\bdjango\b/i, /\bflask\b/i, /\bfastapi\b/i, /\bpandas\b/i, /\bnumpy\b/i]
  },
  'nodejs': {
    keywords: ['node.js', 'nodejs', 'node', 'express', 'npm', 'yarn', 'nestjs', 'koa'],
    patterns: [/\bnode\.?js\b/i, /\bnode\b/i, /\bexpress\b/i, /\bnpm\b/i, /\byarn\b/i, /\bnestjs\b/i]
  },
  'database': {
    keywords: ['database', 'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'nosql', 'sqlite', 'orm', 'prisma'],
    patterns: [/\bdatabase\b/i, /\bsql\b/i, /\bmysql\b/i, /\bpostgresql\b/i, /\bmongodb\b/i, /\bredis\b/i, /\bnosql\b/i]
  },

  // AI Engineering
  'machine-learning': {
    keywords: ['machine learning', 'ml', 'scikit-learn', 'sklearn', 'regression', 'classification', 'clustering', 'supervised learning'],
    patterns: [/\bmachine\s+learning\b/i, /\bml\b/i, /\bscikit-learn\b/i, /\bsklearn\b/i, /\bregression\b/i, /\bclassification\b/i]
  },
  'deep-learning': {
    keywords: ['deep learning', 'neural networks', 'tensorflow', 'pytorch', 'keras', 'cnn', 'rnn', 'lstm', 'transformer'],
    patterns: [/\bdeep\s+learning\b/i, /\bneural\s+networks?\b/i, /\btensorflow\b/i, /\bpytorch\b/i, /\bkeras\b/i, /\bcnn\b/i, /\brnn\b/i]
  },

  // DevOps
  'docker': {
    keywords: ['docker', 'containerization', 'dockerfile', 'docker-compose', 'containers'],
    patterns: [/\bdocker\b/i, /\bcontainer\b/i, /\bdockerfile\b/i, /\bcontainerization\b/i]
  },
  'kubernetes': {
    keywords: ['kubernetes', 'k8s', 'kubectl', 'pods', 'orchestration', 'helm'],
    patterns: [/\bkubernetes\b/i, /\bk8s\b/i, /\bkubectl\b/i, /\bpods\b/i, /\borchestration\b/i, /\bhelm\b/i]
  },

  // Mobile Development
  'flutter': {
    keywords: ['flutter', 'dart', 'flutter app', 'cross-platform mobile'],
    patterns: [/\bflutter\b/i, /\bdart\b/i, /\bflutter\s+app\b/i]
  },
  'react-native': {
    keywords: ['react native', 'react-native', 'expo', 'mobile development react'],
    patterns: [/\breact\s+native\b/i, /\breact-native\b/i, /\bexpo\b/i]
  }
};

/**
 * Analyzes a course and returns the most appropriate skill tree leaf node
 * @param {Object} course - Course object with title, description, tags, etc.
 * @returns {string|null} - The skill node ID or null if no match found
 */
export function autoTagCourse(course) {
  if (!course || (!course.title && !course.description && !course.tags)) {
    return null;
  }

  // Combine all text content for analysis
  const textContent = [
    course.title || '',
    course.description || '',
    ...(course.tags || []),
    course.language || '',
    course.category || ''
  ].join(' ').toLowerCase();

  const scores = {};

  // Calculate relevance scores for each skill
  Object.entries(skillTreeMap).forEach(([skillId, skillData]) => {
    let score = 0;

    // Check keyword matches
    skillData.keywords.forEach(keyword => {
      if (textContent.includes(keyword.toLowerCase())) {
        // Give higher weight to exact matches in title
        if (course.title && course.title.toLowerCase().includes(keyword.toLowerCase())) {
          score += 3;
        } else {
          score += 1;
        }
      }
    });

    // Check pattern matches
    skillData.patterns.forEach(pattern => {
      const matches = textContent.match(pattern);
      if (matches) {
        score += matches.length * 2;
      }
    });

    if (score > 0) {
      scores[skillId] = score;
    }
  });

  // Return the skill with the highest score
  if (Object.keys(scores).length === 0) {
    return null;
  }

  const bestMatch = Object.entries(scores).reduce((a, b) => 
    scores[a[0]] > scores[b[0]] ? a : b
  );

  return bestMatch[0];
}

/**
 * Batch processes multiple courses for auto-tagging
 * @param {Array} courses - Array of course objects
 * @returns {Array} - Array of courses with skillTag property added
 */
export function batchAutoTagCourses(courses) {
  if (!Array.isArray(courses)) {
    return [];
  }

  return courses.map(course => ({
    ...course,
    skillTag: course.skillTag || autoTagCourse(course)
  }));
}

/**
 * Filters courses by skill tag (strict leaf node filtering)
 * @param {Array} courses - Array of course objects
 * @param {string} skillTag - The skill tag to filter by
 * @returns {Array} - Filtered array of courses
 */
export function filterCoursesBySkill(courses, skillTag) {
  if (!Array.isArray(courses) || !skillTag) {
    return [];
  }

  return courses.filter(course => course.skillTag === skillTag);
}

/**
 * Gets all available skill tags from courses
 * @param {Array} courses - Array of course objects
 * @returns {Array} - Array of unique skill tags
 */
export function getAvailableSkillTags(courses) {
  if (!Array.isArray(courses)) {
    return [];
  }

  const tags = courses
    .map(course => course.skillTag)
    .filter(tag => tag && Object.keys(skillTreeMap).includes(tag));

  return [...new Set(tags)];
}

/**
 * Gets display name for a skill tag
 * @param {string} skillTag - The skill tag
 * @returns {string} - Display name for the skill
 */
export function getSkillDisplayName(skillTag) {
  const displayNames = {
    'html': 'HTML',
    'css': 'CSS',
    'javascript': 'JavaScript',
    'react': 'React',
    'java': 'Java',
    'python': 'Python',
    'nodejs': 'Node.js',
    'database': 'Database',
    'machine-learning': 'Machine Learning',
    'deep-learning': 'Deep Learning',
    'docker': 'Docker',
    'kubernetes': 'Kubernetes',
    'flutter': 'Flutter',
    'react-native': 'React Native'
  };

  return displayNames[skillTag] || skillTag;
}

export default {
  autoTagCourse,
  batchAutoTagCourses,
  filterCoursesBySkill,
  getAvailableSkillTags,
  getSkillDisplayName,
  skillTreeMap
};