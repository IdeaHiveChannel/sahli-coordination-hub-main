import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { MetaTags } from '@/components/seo/MetaTags';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'How much does AC repair cost in Doha?',
    excerpt: 'Understanding the factors that influence AC repair pricing in Qatar, from gas refills to motor replacements.',
    date: 'February 25, 2026',
    author: 'SAHLI Editorial',
    category: 'AC Maintenance'
  },
  {
    id: 2,
    title: 'Signs of bed bugs in apartments',
    excerpt: 'How to identify early signs of a bed bug infestation and the best municipality-approved treatment methods.',
    date: 'February 20, 2026',
    author: 'SAHLI Editorial',
    category: 'Pest Control'
  },
  {
    id: 3,
    title: 'Moving checklist for Qatar residents',
    excerpt: 'A comprehensive guide to planning your local move in Doha, including packing tips and utility transfers.',
    date: 'February 15, 2026',
    author: 'SAHLI Editorial',
    category: 'Moving'
  }
];

export default function Blog() {
  return (
    <Layout>
      <MetaTags 
        title="Home Maintenance Blog | Expert Tips & Guides | SAHLI"
        description="Read the latest insights on AC repair, pest control, and home cleaning in Qatar. Expert guides for Doha residents."
      />

      <section className="pt-40 pb-20 bg-[#0a0a0b] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(241,41,89,0.1),transparent_50%)] z-0" />
        <div className="container-sahli text-center relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-[10px] font-black tracking-[0.2em] uppercase text-primary mb-10 shadow-2xl mx-auto">
              <Clock size={16} />
              Insights & Guides
            </div>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]">SAHLI Blog</h1>
            <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed italic">
              Expert advice and practical guides for maintaining your home in Qatar.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-spacing bg-[#0a0a0b] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="container-sahli relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {blogPosts.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 0.1}>
                <article className="group bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden hover:border-primary/40 transition-all duration-700 flex flex-col h-full shadow-2xl hover:-translate-y-3 hover:bg-white/[0.08]">
                  <div className="aspect-[16/10] bg-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-6 left-6 px-4 py-2 bg-[#0a0a0b]/80 backdrop-blur-xl rounded-full text-[10px] font-black uppercase tracking-widest text-primary border border-white/10">
                      {post.category}
                    </div>
                  </div>
                  
                  <div className="p-10 flex flex-col flex-grow">
                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-primary" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-primary" />
                        {post.author}
                      </div>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-black text-white mb-6 group-hover:text-primary transition-colors tracking-tight leading-tight">
                      {post.title}
                    </h2>
                    
                    <p className="text-slate-400 font-medium mb-10 line-clamp-3 leading-relaxed text-base md:text-lg italic">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto inline-flex items-center gap-4 text-primary font-black uppercase tracking-[0.2em] text-xs group/link">
                      <span>Read full article</span>
                      <ArrowRight size={18} className="group-hover/link:translate-x-3 transition-transform duration-500" />
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="container-sahli py-24 md:py-32 border-t border-white/5 bg-[#0a0a0b]">
        <div className="flex items-center justify-center gap-4 opacity-40">
          <img src="/logos/SahlLogo5.png" alt="" className="w-5 h-5 object-contain scale-[2.5]" />
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white/60">
            End of Insights
          </span>
        </div>
      </div>
    </Layout>
  );
}
