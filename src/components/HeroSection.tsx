import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

export default function HeroSection() {
  return (
    <>
      <div className="relative w-full bg-gradient-to-b from-[#0a1128] via-[#050814] to-transparent">
        <header className="pt-6 md:pt-10 pb-8 flex flex-row items-center justify-center gap-4 md:gap-8 relative z-20">
        <div className="w-20 sm:w-24 md:w-32 shrink-0 group">
          <div className="premium-3d-frame w-full animate-float-slow cursor-pointer" title="مستر محب موسى">
            <div className="premium-3d-inner p-1 aspect-[3/4] flex flex-col justify-center relative bg-luxury-900 rounded-[1rem] md:rounded-[1.2rem] shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              <div className="absolute inset-0 border-2 border-[#D4AF37] rounded-[0.8rem] md:rounded-[1rem] m-1 z-10 pointer-events-none shadow-[0_0_15px_rgba(212,175,55,0.5),inset_0_0_10px_rgba(212,175,55,0.3)]"></div>
              <img src="/assets/4.jpeg" width="400" height="533" alt="مستر محب موسى" className="w-full h-full object-cover rounded-[0.7rem] md:rounded-[0.9rem] relative z-0 shadow-inner grayscale-[10%] contrast-125 brightness-110 group-hover:grayscale-0 transition-all duration-500" />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center text-center mt-1">
          <div className="animate-float inline-block mb-1">
            <i className="fas fa-chess-queen text-2xl md:text-4xl text-gold-500 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"></i>
          </div>
          <h1 className="font-amiri text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-gold cursor-pointer select-none tracking-wide leading-tight" title="مستر محب موسى">
            مستر محب موسى
          </h1>
          <h2 className="mt-1 md:mt-2 text-sm sm:text-base md:text-2xl font-tajawal font-black text-neon-rainbow tracking-widest">
            Web Academy
          </h2>
        </div>
      </header>
    </div>

      <div className="w-[95%] 2xl:w-[90%] max-w-none mx-auto px-4 mt-8">
        <ScrollReveal delay={0.1}>
          <div className="bg-gradient-to-b from-[#0a0f1c] to-[#04060a] border-t border-blue-900/40 border-x border-[#0a0f1c] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(59,130,246,0.2)] p-6 md:p-12 mb-10 overflow-hidden relative rounded-[2rem]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>

          <div className="flex flex-col items-center text-center relative z-10 border-b border-white/5 pb-8 mb-8 max-w-5xl mx-auto">
            <h2 className="font-amiri text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-white drop-shadow-xl">
              🚀 انطلق نحو القمة مع أكاديمية <span className="text-gold-500 block md:inline mt-2">مستر محب موسى</span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg lg:text-xl font-light leading-relaxed">
              حيث يلتقي الذكاء الاصطناعي بالتعليم المتميز! 🎓<br />
              هل تبحث عن تجربة تعليمية تتخطى الحدود التقليدية؟ منصتنا الجديدة ليست مجرد موقع دروس، بل هي بيئة تعليمية ذكية مصممة خصيصاً لتضمن لك التفوق في اللغة الإنجليزية بأحدث التقنيات العالمية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 w-[95%] xl:w-[90%] max-w-none mx-auto relative z-10">
            <ScrollReveal delay={0.2} direction="right">
              <div className="bg-luxury-900/80 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-md hover:border-gold-500/30 transition-colors duration-300 h-full">
              <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center justify-start gap-3 border-b border-white/10 pb-4">
                <i className="fas fa-user-graduate text-blue-400 text-2xl drop-shadow-[0_0_12px_rgba(30,58,138,1)] animate-pulse-slow"></i>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-yellow-100 to-gold-500 animate-shine drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">لماذا يختارنا الطلاب؟</span>
              </h3>
              <ul className="space-y-6 text-right">
                <li className="flex items-start gap-4">
                  <i className="fas fa-check-circle text-gold-500 text-xl mt-1 shrink-0"></i>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    <strong className="text-white font-bold">واجهة عصرية وسلسة:</strong> تعمل بكفاءة على الموبايل، التابلت، والكمبيوتر.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <i className="fas fa-gamepad text-gold-500 text-xl mt-1 shrink-0"></i>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    <strong className="text-white font-bold">دروس تفاعلية:</strong> حل التدريبات والامتحانات داخل الدروس مباشرة.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <i className="fas fa-sync-alt text-gold-500 text-xl mt-1 shrink-0"></i>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    <strong className="text-white font-bold">Live Sync:</strong> نتيجتك تظهر فوراً وتُسجل بحسابك تلقائياً.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <i className="fas fa-fingerprint text-gold-500 text-xl mt-1 shrink-0"></i>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    <strong className="text-white font-bold">أمان وخصوصية:</strong> حسابك مؤمن بنظام "البصمة الرقمية".
                  </p>
                </li>
              </ul>
            </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4} direction="left">
              <div className="bg-luxury-900/80 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-md hover:border-pink-500/30 transition-colors duration-300 h-full">
              <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center justify-start gap-3 border-b border-white/10 pb-4">
                <i className="fas fa-user-friends text-pink-400 text-2xl drop-shadow-[0_0_12px_rgba(236,72,153,0.9)] animate-pulse"></i>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-pink-500 animate-shine drop-shadow-[0_0_12px_rgba(236,72,153,0.8)]">المتابعة الأذكى لولي الأمر</span>
              </h3>
              <ul className="space-y-6 text-right">
                <li className="flex items-start gap-4">
                  <i className="fas fa-shield-alt text-blue-400 text-xl mt-1 shrink-0"></i>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    <strong className="text-white font-bold">حساب خاص بك:</strong> متابعة مستوى ابنك لحظة بلحظة.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <i className="fas fa-chart-pie text-blue-400 text-xl mt-1 shrink-0"></i>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    <strong className="text-white font-bold">تقارير تحليلية دقيقة:</strong> درجاته مفصلة (جرامر، كلمات، قصة).
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <i className="fas fa-history text-blue-400 text-xl mt-1 shrink-0"></i>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    <strong className="text-white font-bold">سجل نشاط كامل:</strong> تاريخ كل حصة ووقت الامتحان.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <i className="fas fa-chart-line text-blue-400 text-xl mt-1 shrink-0"></i>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    <strong className="text-white font-bold">رسوم بيانية:</strong> توضح تطوره الدراسي بشكل دوري.
                  </p>
                </li>
              </ul>
            </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>
      </div>
    </>
  );
}
