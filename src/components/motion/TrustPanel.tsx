import { motion } from 'framer-motion';
import React, { ReactNode, useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TrustPanelProps {
  title: string;
  items: { title: string; description: string }[];
  index: number;
  imageUrl?: string;
  videoUrl?: string;
  icon?: ReactNode;
}

export function TrustPanel({ title, items, index, imageUrl, videoUrl }: TrustPanelProps) {
  const { t, dir } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const floatingBlobs = (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[250px] h-[250px] md:w-[600px] md:h-[600px] bg-primary/10 rounded-full blur-[100px] md:blur-[160px] animate-pulse-slow z-0`} />
      <div className={`absolute bottom-0 ${dir === 'rtl' ? 'right-0' : 'left-0'} w-[300px] h-[300px] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow delay-1000 z-0`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,hsla(var(--primary),0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-slate-950/5" />
    </div>
  );

  return (
    <div className="relative border-b border-border bg-background last:border-0 overflow-hidden">
      {floatingBlobs}
      <div className="container-sahli relative z-10 py-6 md:py-12">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : (dir === 'rtl' ? 30 : -30), y: isMobile ? 15 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <span className="text-primary font-bold tracking-[0.2em] text-[11px] uppercase mb-3 md:mb-5 block">
              {index + 1 < 10 ? `0${index + 1}` : index + 1} / {t('trust.standard')}
            </span>
            <h3 className="text-xl md:text-3xl font-black tracking-tighter text-balance leading-[1.1] md:leading-[1] mb-6 md:mb-8 text-foreground">
              {title}
            </h3>

            {(imageUrl || videoUrl) && (
              <motion.div 
                className="relative aspect-[16/9] rounded-[1.25rem] md:rounded-[1.5rem] overflow-hidden shadow-xl group border border-border btn-shine"
                initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {videoUrl ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
                  >
                    <source src={videoUrl} type="video/mp4" />
                    {imageUrl && (
                      <img 
                        src={imageUrl} 
                        alt={title}
                        loading="lazy"
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </video>
                ) : (
                  <motion.img 
                    src={imageUrl} 
                    alt={title}
                    loading="lazy"
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            )}
          </motion.div>

          <div className="grid gap-4 md:gap-6">
            {items.map((item: { title: string; description: string }, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.98 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="group flex gap-4 md:gap-6 p-5 md:p-6 rounded-[1.5rem] transition-all duration-500 hover:bg-foreground/[0.04] border border-border hover:border-primary/20 cursor-default glass-card btn-shine"
              >
                <div className="mt-1">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-primary/5">
                    <Check size={isMobile ? 16 : 20} strokeWidth={3} />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-black mb-1 md:mb-2 group-hover:text-primary transition-colors tracking-tight">{item.title}</h4>
                  <p className="text-sm md:text-base text-foreground/85 leading-relaxed font-medium">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface TrustStatementProps {
  text: string;
  index: number;
}

export function TrustStatement({ text, index }: TrustStatementProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div 
      className="py-16 md:py-32 border-t border-border relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.03),transparent_70%)] pointer-events-none" />
      
      <div className="container-sahli relative z-10">
        <motion.p 
          className="text-xl md:text-3xl lg:text-5xl font-black leading-[1.1] md:leading-[1.05] tracking-tighter text-foreground/90 max-w-5xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {text.split(' ').map((word: string, i: number) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.03 }}
              className="inline-block mr-[0.2em]"
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </motion.div>
  );
}
