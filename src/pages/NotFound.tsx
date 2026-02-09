import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const { t, dir } = useLanguage();

  return (
    <Layout>
      <section className="min-h-[85vh] bg-background flex items-center justify-center relative overflow-hidden">
        {/* Floating Background Blobs */}
        <div className={`absolute top-1/4 ${dir === 'rtl' ? 'left-1/4' : 'right-1/4'} w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] mix-blend-screen animate-pulse-slow`} />
        <div className={`absolute bottom-1/4 ${dir === 'rtl' ? 'right-1/3' : 'left-1/3'} w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow delay-1000`} />
        
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            crossOrigin="anonymous"
            className="w-full h-full object-cover opacity-[0.05]"
          >
            {/* <source src="https://videos.pexels.com/video-files/5091624/5091624-uhd_2560_1440_25fps.mp4" type="video/mp4" /> */}
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&fm=webp&fit=crop" 
              alt="Lost in Space" 
              crossOrigin="anonymous"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </video>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(var(--primary),0.05),transparent_70%)]" />
        </div>

        <div className="container-sahli text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 0.2, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="mb-8 flex justify-center"
            >
              <img 
                src="/logos/SahlLogo10.png" 
                alt="404 Logo" 
                className="w-48 h-48 md:w-64 md:h-64 object-contain" 
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <h1 className="text-display-sm mb-4 flex flex-wrap justify-center gap-x-4">
                {(t('notFound.title') as string).split(' ').map((word: string, i: number) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.5 + (i * 0.1),
                      ease: [0.215, 0.61, 0.355, 1]
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
              <p className="text-[0.9rem] md:text-[1rem] !text-foreground/60 mb-8 max-w-xl mx-auto leading-relaxed">
                {t('notFound.body')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/" className="cta-primary inline-block min-w-[180px] btn-shine">
                  {t('notFound.back')}
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/contact" className="px-6 py-3 rounded-xl bg-foreground/5 border border-border text-foreground font-bold hover:bg-foreground/10 transition-all duration-300 inline-block min-w-[180px] text-[0.9rem]">
                  {t('nav.contact')}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;

