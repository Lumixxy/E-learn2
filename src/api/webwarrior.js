const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000/api';

async function http(method, path, body) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'omit', // Don't send cookies for cross-origin requests
      body: body ? JSON.stringify(body) : undefined,
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Error ${res.status}: ${errorText}`);
      throw new Error(`API Error ${res.status}: ${errorText}`);
    }
    
    const ct = res.headers.get('Content-Type') || '';
    if (ct.includes('application/pdf')) return res;
    if (ct.includes('application/json')) return res.json();
    return res.text();
  } catch (error) {
    console.error(`HTTP request failed for ${method} ${API_BASE}${path}:`, error);
    throw error;
  }
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

  // Roadmap API (integrated from roadmap_api)
  getAllRoadmaps: () => http('GET', '/roadmap/'),
  getRoadmapByTitle: (title) => http('GET', `/roadmap/${encodeURIComponent(title)}/`),
  getNodeResources: (nodeId) => http('GET', `/roadmap/node/${encodeURIComponent(nodeId)}/resources/`),
};

export default WebWarriorAPI;

 

