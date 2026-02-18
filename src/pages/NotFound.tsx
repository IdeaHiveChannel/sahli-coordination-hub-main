import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const { t, dir } = useLanguage();

  return (
    <Layout>
      <section className="min-h-[85vh] bg-background flex items-center justify-center relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="w-full h-full opacity-[0.05]">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&fm=webp&fit=crop" 
              alt="Lost in Space" 
              crossOrigin="anonymous"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsla(var(--primary),0.05),transparent_70%)]" />
        </div>

        <div className="container-sahli text-center relative z-10">
          <div
            className="max-w-2xl mx-auto animate-in fade-in zoom-in-90 duration-1000 ease-out fill-mode-backwards"
          >
            <div
              className="mb-8 flex justify-center animate-in fade-in zoom-in-75 duration-[1500ms] delay-200 fill-mode-backwards"
            >
              <img 
                src="/logos/SahlLogo10.png" 
                alt="404 Logo" 
                className="w-48 h-48 md:w-64 md:h-64 object-contain" 
              />
            </div>

            <div
              className="animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-500 fill-mode-backwards"
            >
              <h1 className="text-display-sm mb-4 flex flex-wrap justify-center gap-x-4">
                {(t('notFound.title') as string).split(' ').map((word: string, i: number) => (
                  <span
                    key={i}
                    className="inline-block animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-backwards"
                    style={{ animationDelay: `${600 + (i * 100)}ms` }}
                  >
                    {word}
                  </span>
                ))}
              </h1>
              <p className="text-[0.9rem] md:text-[1rem] !text-foreground/60 mb-8 max-w-xl mx-auto leading-relaxed">
                {t('notFound.body')}
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-700 fill-mode-backwards"
            >
              <div className="hover:scale-105 active:scale-95 transition-transform duration-300">
                <Link to="/" className="cta-primary inline-block min-w-[180px] btn-shine">
                  {t('notFound.back')}
                </Link>
              </div>
              
              <div className="hover:scale-105 active:scale-95 transition-transform duration-300">
                <Link to="/contact" className="px-6 py-3 rounded-xl bg-foreground/5 border border-border text-foreground font-bold hover:bg-foreground/10 transition-all duration-300 inline-block min-w-[180px] text-[0.9rem]">
                  {t('nav.contact')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
