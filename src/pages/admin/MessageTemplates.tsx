import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Trash2, 
  Save, 
  Copy, 
  MessageSquare, 
  Megaphone, 
  ShieldCheck, 
  History,
  Search
} from 'lucide-react';
import { storageService, MessageTemplate } from '@/lib/storageService';
import { toast } from 'sonner';

const MessageTemplates = () => {
  const { dir } = useLanguage();
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Omit<MessageTemplate, 'id'>>({
    name: '',
    category: 'General',
    content: ''
  });

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = () => {
    setTemplates(storageService.getTemplates());
  };

  const handleAddTemplate = () => {
    if (!newTemplate.name || !newTemplate.content) {
      toast.error('Please fill in all fields');
      return;
    }
    storageService.saveTemplate(newTemplate);
    toast.success('Template saved successfully');
    setNewTemplate({ name: '', category: 'General', content: '' });
    setIsAdding(false);
    loadTemplates();
  };

  const handleDeleteTemplate = (id: string) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      storageService.deleteTemplate(id);
      toast.success('Template deleted');
      loadTemplates();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Content copied to clipboard');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Broadcast': return <Megaphone className="w-4 h-4" />;
      case 'Verification': return <ShieldCheck className="w-4 h-4" />;
      case 'Follow-up': return <History className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const filteredTemplates = templates.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="py-2" dir={dir}>
        <div className="flex items-center justify-between mb-6 bg-white/50 backdrop-blur-md p-4 rounded-xl border border-primary/10 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-black tracking-widest text-[10px]">COMMUNICATION</Badge>
              <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-100 font-bold text-[10px]">{templates.length} TEMPLATES</Badge>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Message Templates</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Standardize dispatch communications and provider coordination messages.
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsAdding(!isAdding)}
              className={`${isAdding ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-slate-900 hover:bg-slate-800 text-white'} font-bold h-9 shadow-sm transition-all px-4`}
            >
              {isAdding ? 'Cancel' : (
                <span className="flex items-center gap-2">
                  <Plus size={16} /> New Template
                </span>
              )}
            </Button>
          </div>
        </div>

        {isAdding && (
          <Card className="mb-8 border-primary/20 shadow-xl bg-white/90 backdrop-blur-md overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="h-1.5 bg-primary w-full" />
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
              <CardTitle className="text-sm font-black uppercase tracking-wider text-slate-800">Draft New Template</CardTitle>
              <CardDescription className="text-[10px]">Define a reusable message for coordination workflows.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Template Name</label>
                  <Input 
                    placeholder="e.g. Broadcast Accept" 
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                    className="bg-white border-slate-200 h-10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Category</label>
                  <select 
                    className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value as any})}
                  >
                    <option value="General">General</option>
                    <option value="Broadcast">Broadcast</option>
                    <option value="Verification">Verification</option>
                    <option value="Follow-up">Follow-up</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Message Content</label>
                <Textarea 
                  placeholder="Type your message template here..." 
                  className="min-h-[140px] bg-white border-slate-200 resize-none font-mono text-sm p-4"
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                />
                <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="p-1 bg-white rounded shadow-sm text-[9px] font-bold text-slate-400 uppercase">Variable Help</div>
                  <p className="text-[10px] text-slate-500 font-medium italic">Use placeholders like {'{name}'}, {'{service}'}, {'{area}'} for dynamic injection.</p>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button 
                  onClick={handleAddTemplate}
                  className="bg-primary hover:bg-primary/90 text-white font-bold h-10 px-8 rounded-xl shadow-lg shadow-primary/20"
                >
                  <Save size={16} className="mr-2" /> Save Template
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mb-6 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
          <Input 
            placeholder="Search templates by name, content, or category..." 
            className="pl-12 h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-2xl shadow-sm focus:shadow-md transition-all text-sm font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="border-slate-200/60 shadow-sm hover:shadow-xl transition-all bg-white/80 backdrop-blur-sm group overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-900 text-primary rounded-xl shadow-lg border border-slate-800">
                    {getCategoryIcon(template.category)}
                  </div>
                  <div>
                    <CardTitle className="text-sm font-black uppercase tracking-wider text-slate-900">
                      {template.name}
                    </CardTitle>
                    <Badge variant="outline" className="text-[9px] font-black px-2 py-0 h-4 bg-slate-50 text-slate-400 border-slate-100 uppercase tracking-widest mt-1">
                      {template.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-full transition-all"
                    onClick={() => copyToClipboard(template.content)}
                    title="Copy to clipboard"
                  >
                    <Copy size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                    onClick={() => handleDeleteTemplate(template.id)}
                    title="Delete template"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-100/50 font-mono text-[11px] leading-relaxed text-slate-600 min-h-[120px] whitespace-pre-wrap shadow-inner">
                  {template.content}
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredTemplates.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-slate-200">
              <div className="inline-flex p-6 bg-slate-100 rounded-3xl mb-4 text-slate-300">
                <MessageSquare className="opacity-40" size={40} />
              </div>
              <h3 className="text-lg font-black uppercase tracking-wider text-slate-900">No Templates Found</h3>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-2 opacity-70">
                {searchQuery ? `Your search for "${searchQuery}" returned no results.` : 'The communication catalog is currently empty.'}
              </p>
              {!isAdding && (
                <Button 
                  onClick={() => setIsAdding(true)}
                  variant="outline"
                  className="mt-6 border-primary/20 text-primary hover:bg-primary/5 font-bold"
                >
                  Create Your First Template
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default MessageTemplates;
