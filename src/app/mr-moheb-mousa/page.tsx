import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'من هو مستر محب موسى؟ | السيرة الذاتية والتطور التعليمي',
  description: 'تعرف على مستر محب موسى، خبير تدريس اللغة الإنجليزية ومؤسس التطور التعليمي الفريد. اكتشف مسيرته في صناعة الأوائل وتطوير التعليم.',
  keywords: 'مستر محب موسى, من هو محب موسى, مدرس إنجليزي, التطور التعليمي الفريد'
};

export default function EntityPage() {
  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto ultra-glass p-8 md:p-12 rounded-3xl">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-full md:w-1/3 shrink-0">
              <div className="gold-24k-frame overflow-hidden rounded-2xl">
                <img src="/assets/4.jpeg" alt="مستر محب موسى" className="w-full h-auto object-cover" />
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                مستر <span className="text-gold-500">محب موسى</span>
              </h1>
              <h2 className="text-xl text-gold-300 font-bold mb-6">مؤسس التطور التعليمي الفريد للغة الإنجليزية</h2>
              
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  يُعد مستر محب موسى من رواد تدريس اللغة الإنجليزية في مصر، حيث تميز بأسلوبه الفريد الذي يجمع بين التأسيس الأكاديمي القوي والتدريب العملي المكثف.
                </p>
                <p>
                  على مدار سنوات من الخبرة، تخرج على يديه مئات الطلاب الأوائل في مختلف المراحل التعليمية (الابتدائية، الإعدادية، والثانوية العامة). يعتمد في تدريسه على منهجية <strong>التطور التعليمي الفريد</strong> التي تواكب أحدث المعايير التعليمية وتدمج التكنولوجيا في عملية التعلم.
                </p>
                <p>
                  ليس مجرد مدرس، بل هو مرشد وموجه يسعى دائماً لبناء جيل واعٍ ومثقف ومتمكن من اللغة الإنجليزية كتابة وتحدثاً، مما يفتح أمامهم آفاقاً واسعة في مستقبلهم الأكاديمي والمهني.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/booking" className="btn-luxury px-6 py-3">
                  احجز كورس الآن
                </Link>
                
                <a 
                  href="https://mr-moheb-web-academy.web.app/login" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center justify-center px-8 py-3 font-bold text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,210,255,0.4)] group"
                  dir="rtl"
                >
                  {/* Glowing Gold Border */}
                  <span className="absolute inset-0 border-2 border-[#ffeb3b]/80 rounded-full shadow-[0_0_15px_rgba(255,235,59,0.5),inset_0_0_10px_rgba(255,235,59,0.4)] transition-all group-hover:border-[#ffeb3b] group-hover:shadow-[0_0_20px_rgba(255,235,59,0.7),inset_0_0_15px_rgba(255,235,59,0.5)] z-10 pointer-events-none"></span>
                  
                  {/* Sea Wave / Neon Spectrum Gradient */}
                  <span className="absolute inset-0 bg-[linear-gradient(90deg,#ff4081_0%,#9c27b0_50%,#00bcd4_100%)] opacity-90 z-0"></span>
                  
                  {/* Content */}
                  <span className="relative z-20 flex items-center gap-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                    التجربة المجانية
                    <i className="fas fa-rocket"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
