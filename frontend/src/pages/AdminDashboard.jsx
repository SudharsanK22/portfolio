import React, { useState, useEffect } from 'react';
import api, { API_BASE_URL } from '../api';
import toast from 'react-hot-toast';
import { Save, Plus, Trash2, Upload, Layout, User, Zap, Briefcase, Mail } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('skills');
  const [loading, setLoading] = useState(false);
  const initialState = {
    skills: [],
    projects: []
  };
  const [content, setContent] = useState(initialState);
  const [newSkill, setNewSkill] = useState({ name: '', level: 80, category: 'Language' });
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  
  // Buffers for editing
  const [editingSkillId, setEditingSkillId] = useState(null);
  const [editSkillBuffer, setEditSkillBuffer] = useState({ name: '', level: 80, category: 'Language' });
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editProjectBuffer, setEditProjectBuffer] = useState({ title: '', description: '', link: '' });

  const fetchData = async () => {
    try {
        const [s, p] = await Promise.all([
            api.get('/content/skills').catch(e => ({ data: [] })),
            api.get('/content/projects').catch(e => ({ data: [] }))
        ]);
        setContent({ 
            skills: Array.isArray(s.data) ? s.data : [], 
            projects: Array.isArray(p.data) ? p.data : []
        });
    } catch (err) { console.error(err); toast.error('Failed to load content'); }
  };

  useEffect(() => { fetchData(); }, []);

  const saveContent = async (endpoint, data) => {
    setLoading(true);
    try {
      await api.put(`/content/${endpoint}`, data);
      toast.success('Changes saved!');
      fetchData();
    } catch (err) { toast.error('Save failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-12">
      {/* Sidebar Tabs */}
      <div className="lg:w-64 space-y-2">
        {[
          { id: 'skills', label: 'Skills', icon: <Zap size={18} /> },
          { id: 'projects', label: 'Projects', icon: <Briefcase size={18} /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-xl transition-all ${activeTab === tab.id ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/20' : 'hover:bg-white/5 text-slate-400'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Editor Panel */}
      <div className="flex-1 glass p-8 rounded-3xl min-h-[600px]">

        {activeTab === 'skills' && (
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold">Manage Skills</h3>
                    <button 
                        onClick={() => setShowAddSkill(!showAddSkill)} 
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus size={18}/> {showAddSkill ? 'Cancel' : 'Add New Skill'}
                    </button>
                </div>

                {showAddSkill && (
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-primary-500/30 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input 
                                type="text" placeholder="Skill Name" className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2"
                                value={newSkill.name} onChange={e => setNewSkill({...newSkill, name: e.target.value})}
                            />
                            <select 
                                className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-slate-300"
                                value={newSkill.category} 
                                onChange={e => setNewSkill({...newSkill, category: e.target.value})}
                            >
                                <option value="Language">Language</option>
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="Database">Database</option>
                                <option value="Tools">Tools</option>
                            </select>
                            <div className="flex items-center gap-4">
                                <input 
                                    type="range" min="0" max="100" className="flex-1"
                                    value={newSkill.level} onChange={e => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
                                />
                                <span className="text-sm w-12">{newSkill.level}%</span>
                            </div>
                        </div>
                        <button 
                            onClick={async () => {
                                if(!newSkill.name) return toast.error('Name is required');
                                try {
                                    await api.post('/content/skills', newSkill);
                                    toast.success('Skill added');
                                    setNewSkill({ name: '', level: 80, category: 'Language' });
                                    setShowAddSkill(false);
                                    fetchData();
                                } catch (err) { toast.error('Failed to add skill'); }
                            }}
                            className="btn-primary w-full py-2"
                        >
                            Confirm Add Skill
                        </button>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.skills.map((skill, idx) => {
                        const colorPalette = [
                            { badge: 'bg-indigo-900/60 text-indigo-300 border-indigo-500/40', bar: 'bg-indigo-400' },
                            { badge: 'bg-teal-900/60 text-teal-300 border-teal-500/40',       bar: 'bg-teal-400' },
                            { badge: 'bg-amber-900/60 text-amber-300 border-amber-500/40',    bar: 'bg-amber-400' },
                            { badge: 'bg-pink-900/60 text-pink-300 border-pink-500/40',       bar: 'bg-pink-400' },
                            { badge: 'bg-purple-900/60 text-purple-300 border-purple-500/40', bar: 'bg-purple-400' },
                            { badge: 'bg-green-900/60 text-green-300 border-green-500/40',    bar: 'bg-green-400' },
                            { badge: 'bg-rose-900/60 text-rose-300 border-rose-500/40',       bar: 'bg-rose-400' },
                            { badge: 'bg-cyan-900/60 text-cyan-300 border-cyan-500/40',       bar: 'bg-cyan-400' },
                            { badge: 'bg-orange-900/60 text-orange-300 border-orange-500/40', bar: 'bg-orange-400' },
                            { badge: 'bg-violet-900/60 text-violet-300 border-violet-500/40', bar: 'bg-violet-400' },
                        ];
                        const color = colorPalette[idx % colorPalette.length];

                        const isEditing = editingSkillId === (skill._id || skill.id);

                        const handleDeleteSkill = async (e) => {
                            if (e) {
                                e.preventDefault();
                                e.stopPropagation();
                            }
                            
                            const skillId = skill._id || skill.id;
                            console.log('Attempting to delete skill:', { name: skill.name, id: skillId });
                            
                            if (!skillId) {
                                console.error('No skill ID found for deletion:', skill);
                                return toast.error('Could not identify skill to delete');
                            }

                            if (!window.confirm(`Permanently delete "${skill.name}"?`)) return;
                            
                            // Optimistic update — remove from state immediately
                            setContent(prev => ({
                                ...prev,
                                skills: prev.skills.filter(s => (s._id || s.id) !== skillId)
                            }));
                            
                            try {
                                const response = await api.delete(`/content/skills/${skillId}`);
                                console.log('Delete response:', response.data);
                                toast.success(`"${skill.name}" removed`);
                            } catch (err) {
                                console.error('Delete error:', err);
                                toast.error('Delete failed — restoring skill');
                                fetchData(); // Rollback on error
                            }
                        };

                        const handleStartEdit = () => {
                            setEditingSkillId(skill._id || skill.id);
                            setEditSkillBuffer({ name: skill.name, level: skill.level, category: skill.category });
                        };

                        const handleSaveEdit = async () => {
                            const skillId = skill._id || skill.id;
                            try {
                                await api.put(`/content/skills/${skillId}`, editSkillBuffer);
                                toast.success('Skill updated');
                                setEditingSkillId(null);
                                fetchData();
                            } catch (err) {
                                toast.error('Update failed');
                            }
                        };

                        return (
                            <div
                                key={skill._id || skill.id || idx}
                                className={`group relative bg-slate-900/80 border ${isEditing ? 'border-primary-500/50' : 'border-slate-800'} rounded-2xl p-5 flex items-center gap-4 hover:border-slate-600 transition-all duration-200`}
                            >
                                {isEditing ? (
                                    <div className="flex-1 space-y-3">
                                        <div className="grid grid-cols-2 gap-3">
                                            <input 
                                                type="text" className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1 text-sm"
                                                value={editSkillBuffer.name} onChange={e => setEditSkillBuffer({...editSkillBuffer, name: e.target.value})}
                                            />
                                            <select 
                                                className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1 text-xs text-slate-300"
                                                value={editSkillBuffer.category} 
                                                onChange={e => setEditSkillBuffer({...editSkillBuffer, category: e.target.value})}
                                            >
                                                <option value="Language">Language</option>
                                                <option value="Frontend">Frontend</option>
                                                <option value="Backend">Backend</option>
                                                <option value="Database">Database</option>
                                                <option value="Tools">Tools</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <input 
                                                type="range" min="0" max="100" className="flex-1 h-1.5"
                                                value={editSkillBuffer.level} onChange={e => setEditSkillBuffer({...editSkillBuffer, level: parseInt(e.target.value)})}
                                            />
                                            <span className="text-xs font-mono w-8">{editSkillBuffer.level}%</span>
                                        </div>
                                        <div className="flex gap-2 justify-end">
                                            <button onClick={() => setEditingSkillId(null)} className="text-xs text-slate-400 hover:text-white">Cancel</button>
                                            <button onClick={handleSaveEdit} className="text-xs text-primary-400 font-bold hover:text-primary-300">Save</button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex-1 space-y-2 min-w-0" onClick={handleStartEdit}>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${color.badge}`}>
                                                    {skill.name}
                                                </span>
                                                <span className="text-xs text-slate-500 italic">{skill.category}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                    <div className={`h-full rounded-full ${color.bar}`} style={{ width: `${skill.level}%` }} />
                                                </div>
                                                <span className="text-xs font-mono text-slate-500 shrink-0">{skill.level}%</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleDeleteSkill}
                                            title={`Delete ${skill.name}`}
                                            className="shrink-0 p-2 rounded-xl text-slate-500 hover:bg-red-500/20 hover:text-red-400 active:scale-95 transition-all duration-200 border border-transparent hover:border-red-500/30"
                                        >
                                            <Trash2 size={17} />
                                        </button>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        )}


        {activeTab === 'projects' && (
            <div className="space-y-8">
                 <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold">Manage Projects</h3>
                    <button 
                        onClick={() => setShowAddProject(!showAddProject)} 
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus size={18}/> {showAddProject ? 'Cancel' : 'Add Project'}
                    </button>
                </div>

                {showAddProject && (
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-primary-500/30 space-y-4">
                        <input 
                            type="text" placeholder="Project Title" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2"
                            value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})}
                        />
                        <textarea 
                            placeholder="Description" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 h-24"
                            value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})}
                        />
                        <button 
                            onClick={async () => {
                                if(!newProject.title) return toast.error('Title is required');
                                try {
                                    await api.post('/content/projects', newProject);
                                    toast.success('Project added');
                                    setNewProject({ title: '', description: '' });
                                    setShowAddProject(false);
                                    fetchData();
                                } catch (err) { toast.error('Failed to add project'); }
                            }}
                            className="btn-primary w-full py-2"
                        >
                            Confirm Add Project
                        </button>
                    </div>
                )}
                <div className="space-y-4">
                    {content.projects.map(p => {
                        const isEditingP = editingProjectId === p._id;

                        const handleSaveProjectEdit = async () => {
                            try {
                                await api.put(`/content/projects/${p._id}`, editProjectBuffer);
                                toast.success('Project updated');
                                setEditingProjectId(null);
                                fetchData();
                            } catch (err) {
                                toast.error('Update failed');
                            }
                        };

                        return (
                            <div key={p._id} className={`bg-slate-900 p-6 rounded-2xl border ${isEditingP ? 'border-primary-500/50' : 'border-slate-800'}`}>
                                {isEditingP ? (
                                    <div className="space-y-4">
                                        <div className="flex gap-4">
                                            <div className="w-24 h-24 bg-slate-800 rounded-lg flex-shrink-0">
                                                {p.image_url && <img src={`${API_BASE_URL}${p.image_url}`} className="w-full h-full object-cover rounded-lg" />}
                                            </div>
                                            <div className="flex-1 space-y-3">
                                                <input 
                                                    type="text" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2"
                                                    value={editProjectBuffer.title} onChange={e => setEditProjectBuffer({...editProjectBuffer, title: e.target.value})}
                                                />
                                                <input 
                                                    type="text" placeholder="Project Link" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm"
                                                    value={editProjectBuffer.link || ''} onChange={e => setEditProjectBuffer({...editProjectBuffer, link: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        <textarea 
                                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 h-24"
                                            value={editProjectBuffer.description} onChange={e => setEditProjectBuffer({...editProjectBuffer, description: e.target.value})}
                                        />
                                        <div className="flex justify-end gap-3">
                                            <button onClick={() => setEditingProjectId(null)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                                            <button onClick={handleSaveProjectEdit} className="btn-primary px-6 py-2">Save Changes</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex gap-6 items-center">
                                        <div className="relative group w-24 h-24 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                            {p.image_url ? <img src={`${API_BASE_URL}${p.image_url}`} className="w-full h-full object-cover" /> : <Briefcase size={32} className="text-slate-600"/>}
                                            {p.image_url && (
                                              <button
                                                onClick={async () => { if(confirm('Remove project image?')) { await api.put(`/content/projects/${p._id}`, {...p, image_url: ''}); fetchData(); toast.success('Image removed'); } }}
                                                className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300"
                                                title="Delete image"
                                              ><Trash2 size={20}/></button>
                                            )}
                                        </div>
                                        <div className="flex-1 cursor-pointer" onClick={() => { setEditingProjectId(p._id); setEditProjectBuffer({ title: p.title, description: p.description, link: p.link }); }}>
                                            <h4 className="font-bold text-lg">{p.title}</h4>
                                            <p className="text-slate-400 text-sm line-clamp-2">{p.description}</p>
                                            {p.link && <p className="text-primary-400/60 text-xs mt-1 truncate max-w-xs">{p.link}</p>}
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <button onClick={async () => {
                                                const file = document.createElement('input');
                                                file.type = 'file';
                                                file.onchange = async (e) => {
                                                    const formData = new FormData();
                                                    formData.append('file', e.target.files[0]);
                                                    try {
                                                        const res = await api.post('/upload', formData);
                                                        const imageUrl = res.data.url;
                                                        await api.put(`/content/projects/${p._id}`, { ...p, image_url: imageUrl });
                                                        toast.success('Image set');
                                                        fetchData();
                                                    } catch (err) { toast.error('Upload failed'); }
                                                };
                                                file.click();
                                            }} className="p-2 hover:bg-slate-800 rounded-lg text-primary-400"><Upload size={18}/></button>
                                            <button onClick={async (e) => {
                                                if (e) { e.preventDefault(); e.stopPropagation(); }
                                                const projectId = p._id || p.id;
                                                if(confirm(`Delete project "${p.title}"?`)) {
                                                    try {
                                                        await api.delete(`/content/projects/${projectId}`);
                                                        toast.success('Project deleted');
                                                        fetchData();
                                                    } catch (err) { toast.error('Failed to delete project'); }
                                                }
                                            }} className="p-2 hover:bg-slate-800 rounded-lg text-red-400"><Trash2 size={18}/></button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        )}


      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
