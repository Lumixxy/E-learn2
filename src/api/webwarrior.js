const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000/api';

async function http(method, path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await res.text());
  const ct = res.headers.get('Content-Type') || '';
  if (ct.includes('application/pdf')) return res;
  if (ct.includes('application/json')) return res.json();
  return res.text();
}

export const WebWarriorAPI = {
  // Adventure Path (quests list with lock + progress)
  getQuests: () => http('GET', '/quests/adventure_path/'),
  // Modules
  getModules: (questId) => http('GET', `/quests/${questId}/modules/`),
  completeModule: (questId, index) => http('POST', `/quests/${questId}/complete_module/`, { index }),
  // Course assessment
  getAssessment: (questId) => http('GET', `/quests/${questId}/assessment/`),
  submitAssessment: (questId, answers) => http('POST', `/quests/${questId}/submit_assessment/`, { answers }),
  // Final assessment
  getFinal: () => http('GET', '/final/'),
  submitFinal: (answers) => http('POST', '/final/', { answers }),
  getCertificate: () => http('GET', '/final/certificate/'),
};

export default WebWarriorAPI;

 

