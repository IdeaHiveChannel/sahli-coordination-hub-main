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

      <section className="pt-32 pb-16 bg-secondary/5">
        <div className="container-sahli text-center">
          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6">SAHLI Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expert advice and practical guides for maintaining your home in Qatar.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-spacing bg-background">
        <div className="container-sahli">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 0.1}>
                <article className="group bg-card border border-border rounded-3xl overflow-hidden hover:border-primary/30 transition-all flex flex-col h-full">
                  <div className="aspect-video bg-secondary/20 relative overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-bold text-primary">
                      {post.category}
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        {post.author}
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground font-medium mb-8 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                      Read full article <ArrowRight size={18} />
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
