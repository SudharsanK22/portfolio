import React, { useState, useEffect } from 'react';
import api from '../api';
import toast from 'react-hot-toast';
import { Save, Plus, Trash2, Upload, Layout, User, Zap, Briefcase, Mail } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(false);
  const initialState = {
    home: { title: '', subtitle: '', hero_image: '', welcome_text: '', view_work_label: '', about_me_label: '' },
    about: { description: '', profile_image: '', section_title: '' },
    skills: [],
    projects: [],
    contact: { email: '', phone: '', social_links: [], section_title: '', subtitle: '' },
    settings: { brand_name: '', skills_section_title: '', projects_section_title: '' }
  };
  const [content, setContent] = useState(initialState);
  const [newSkill, setNewSkill] = useState({ name: '', level: 80, category: 'Language' });
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);

  const fetchData = async () => {
    try {
        const [h, a, s, p, c, st] = await Promise.all([
            api.get('/content/home').catch(e => ({ data: initialState.home })),
            api.get('/content/about').catch(e => ({ data: initialState.about })),
            api.get('/content/skills').catch(e => ({ data: [] })),
            api.get('/content/projects').catch(e => ({ data: [] })),
            api.get('/content/contact').catch(e => ({ data: initialState.contact })),
            api.get('/content/settings').catch(e => ({ data: initialState.settings }))
        ]);
        setContent({ 
            home: { ...initialState.home, ...h.data }, 
            about: { ...initialState.about, ...a.data }, 
            skills: Array.isArray(s.data) ? s.data : [], 
            projects: Array.isArray(p.data) ? p.data : [], 
            contact: { ...initialState.contact, ...c.data },
            settings: { ...initialState.settings, ...st.data }
        });
    } catch (err) { console.error(err); toast.error('Failed to load content'); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleImageUpload = async (file, section, field) => {
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);
    try {
      const res = await api.post('/upload', formData);
      const imageUrl = res.data.url;
      const updatedSection = { ...content[section], [field]: imageUrl };
      setContent({ ...content, [section]: updatedSection });
      toast.success('Image uploaded');
    } catch (err) { toast.error('Upload failed'); }
    finally { setLoading(false); }
  };

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
          { id: 'home', label: 'Home Page', icon: <Layout size={18} /> },
          { id: 'about', label: 'About Me', icon: <User size={18} /> },
          { id: 'skills', label: 'Skills', icon: <Zap size={18} /> },
          { id: 'projects', label: 'Projects', icon: <Briefcase size={18} /> },
          { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
          { id: 'settings', label: 'Site Settings', icon: <Save size={18} /> },
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
        {activeTab === 'home' && (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Edit Hero Section</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Main Title</label>
                <input 
                  type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3"
                  value={content.home.title || ''} onChange={e => setContent({...content, home: {...content.home, title: e.target.value}})}
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Welcome Text</label>
                <input 
                  type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3"
                  value={content.home.welcome_text || ''} onChange={e => setContent({...content, home: {...content.home, welcome_text: e.target.value}})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">View Work Button Label</label>
                  <input 
                    type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3"
                    value={content.home.view_work_label || ''} onChange={e => setContent({...content, home: {...content.home, view_work_label: e.target.value}})}
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">About Me Button Label</label>
                  <input 
                    type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3"
                    value={content.home.about_me_label || ''} onChange={e => setContent({...content, home: {...content.home, about_me_label: e.target.value}})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Hero Image</label>
                 <div className="flex items-center gap-4">
                    <input type="file" onChange={e => handleImageUpload(e.target.files[0], 'home', 'hero_image')} className="hidden" id="hero_up" />
                    <label htmlFor="hero_up" className="btn-primary cursor-pointer flex items-center gap-2"><Upload size={18}/> {loading ? 'Uploading...' : 'Upload Image'}</label>
                    {content.home.hero_image && (
                      <div className="relative group">
                        <img src={`http://localhost:8008${content.home.hero_image}`} className="h-16 w-16 object-cover rounded-lg border border-slate-700" />
                        <button
                          onClick={() => { const updated = {...content.home, hero_image: ''}; setContent({...content, home: updated}); saveContent('home', updated); }}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete image"
                        ><Trash2 size={12}/></button>
                      </div>
                    )}
                 </div>
              </div>
              <button disabled={loading} onClick={() => saveContent('home', content.home)} className="btn-primary flex items-center gap-2 px-10"><Save size={18}/> Save Changes</button>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold">Edit About Section</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Section Title</label>
                <input 
                  type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3"
                  value={content.about.section_title || ''} onChange={e => setContent({...content, about: {...content.about, section_title: e.target.value}})}
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Description</label>
                <textarea 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 h-64"
                  value={content.about.description || ''} onChange={e => setContent({...content, about: {...content.about, description: e.target.value}})}
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">Profile Image</label>
                 <div className="flex items-center gap-4">
                    <input type="file" onChange={e => handleImageUpload(e.target.files[0], 'about', 'profile_image')} className="hidden" id="prof_up" />
                    <label htmlFor="prof_up" className="btn-primary cursor-pointer flex items-center gap-2"><Upload size={18}/> Upload Profile</label>
                    {content.about.profile_image && (
                      <div className="relative group">
                        <img src={`http://localhost:8008${content.about.profile_image}`} className="h-20 w-20 object-cover rounded-full border border-slate-700" />
                        <button
                          onClick={() => { const updated = {...content.about, profile_image: ''}; setContent({...content, about: updated}); saveContent('about', updated); }}
                          className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete image"
                        ><Trash2 size={12}/></button>
                      </div>
                    )}
                 </div>
              </div>
              <button disabled={loading} onClick={() => saveContent('about', content.about)} className="btn-primary flex items-center gap-2 px-10"><Save size={18}/> Save Changes</button>
            </div>
          </div>
        )}

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

                        return (
                            <div
                                key={skill._id || skill.id || idx}
                                className="group relative bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4 hover:border-slate-600 transition-all duration-200"
                            >
                                {/* Skill info */}
                                <div className="flex-1 space-y-2 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${color.badge}`}>
                                            {skill.name}
                                        </span>
                                        <span className="text-xs text-slate-500 italic">{skill.category}</span>
                                    </div>
                                    {/* Mini progress bar */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${color.bar}`} style={{ width: `${skill.level}%` }} />
                                        </div>
                                        <span className="text-xs font-mono text-slate-500 shrink-0">{skill.level}%</span>
                                    </div>
                                </div>

                                {/* Delete button */}
                                <button
                                    onClick={handleDeleteSkill}
                                    title={`Delete ${skill.name}`}
                                    className="shrink-0 p-2 rounded-xl text-slate-500 hover:bg-red-500/20 hover:text-red-400 active:scale-95 transition-all duration-200 border border-transparent hover:border-red-500/30"
                                >
                                    <Trash2 size={17} />
                                </button>
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
                    {content.projects.map(p => (
                        <div key={p._id} className="bg-slate-900 p-6 rounded-2xl flex gap-6 items-center border border-slate-800">
                            <div className="relative group w-24 h-24 bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                {p.image_url ? <img src={`http://localhost:8008${p.image_url}`} className="w-full h-full object-cover" /> : <Briefcase size={32} className="text-slate-600"/>}
                                {p.image_url && (
                                  <button
                                    onClick={async () => { if(confirm('Remove project image?')) { await api.put(`/content/projects/${p._id}`, {...p, image_url: ''}); fetchData(); toast.success('Image removed'); } }}
                                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300"
                                    title="Delete image"
                                  ><Trash2 size={20}/></button>
                                )}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg">{p.title}</h4>
                                <p className="text-slate-400 text-sm">{p.description}</p>
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
                                            
                                            // Update project with the new image URL
                                            await api.put(`/content/projects/${p._id}`, {
                                                ...p,
                                                image_url: imageUrl
                                            });
                                            
                                            toast.success('Image set for project');
                                            fetchData();
                                        } catch (err) {
                                            toast.error('Upload failed');
                                        }
                                    };
                                    file.click();
                                }} className="p-2 hover:bg-slate-800 rounded-lg text-primary-400"><Upload size={18}/></button>
                                <button onClick={async (e) => {
                                    if (e) { e.preventDefault(); e.stopPropagation(); }
                                    const projectId = p._id || p.id;
                                    if (!projectId) return toast.error('Project ID missing');
                                    
                                    if(confirm(`Delete project "${p.title}"?`)) {
                                        try {
                                            await api.delete(`/content/projects/${projectId}`);
                                            toast.success('Project deleted');
                                            fetchData();
                                        } catch (err) {
                                            console.error('Project delete error:', err);
                                            toast.error('Failed to delete project');
                                        }
                                    }
                                }} className="p-2 hover:bg-slate-800 rounded-lg text-red-400"><Trash2 size={18}/></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {activeTab === 'contact' && (
            <div className="space-y-8">
                <h3 className="text-2xl font-bold">Edit Contact Information</h3>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm text-slate-400 mb-2">Section Title</label>
                        <input 
                            type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3"
                            value={content.contact.section_title || ''} onChange={e => setContent({...content, contact: {...content.contact, section_title: e.target.value}})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-400 mb-2">Contact Subtitle</label>
                        <input 
                            type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3"
                            value={content.contact.subtitle || ''} onChange={e => setContent({...content, contact: {...content.contact, subtitle: e.target.value}})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-400 mb-2">Email Address</label>
                        <input 
                            type="email" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3"
                            value={content.contact.email || ''} onChange={e => setContent({...content, contact: {...content.contact, email: e.target.value}})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-slate-400 mb-2">Phone Number</label>
                        <input 
                            type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3"
                            value={content.contact.phone || ''} onChange={e => setContent({...content, contact: {...content.contact, phone: e.target.value}})}
                        />
                    </div>
                    <button disabled={loading} onClick={() => saveContent('contact', content.contact)} className="btn-primary flex items-center gap-2 px-10"><Save size={18}/> Save Contact Info</button>
                </div>
            </div>
        )}
        {activeTab === 'settings' && (
            <div className="space-y-8">
                <h3 className="text-2xl font-bold">Global Site Settings</h3>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm text-slate-400 mb-2">Brand Name (Navbar)</label>
                        <input 
                            type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3"
                            value={content.settings.brand_name || ''} onChange={e => setContent({...content, settings: {...content.settings, brand_name: e.target.value}})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Skills Section Title</label>
                            <input 
                                type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3"
                                value={content.settings.skills_section_title || ''} onChange={e => setContent({...content, settings: {...content.settings, skills_section_title: e.target.value}})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Projects Section Title</label>
                            <input 
                                type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3"
                                value={content.settings.projects_section_title || ''} onChange={e => setContent({...content, settings: {...content.settings, projects_section_title: e.target.value}})}
                            />
                        </div>
                    </div>
                    <button disabled={loading} onClick={() => saveContent('settings', content.settings)} className="btn-primary flex items-center gap-2 px-10"><Save size={18}/> Save Settings</button>
                </div>
            </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
