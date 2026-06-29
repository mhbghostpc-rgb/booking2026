import { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'تواصل معنا | أكاديمية مستر محب موسى',
  description: 'تواصل مع الدعم الفني والقانوني لأكاديمية مستر محب موسى للغة الإنجليزية.',
};

export default function ContactUs() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden" dir="rtl">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-green-900/20 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto max-w-5xl relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              تواصل معنا
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              نحن هنا لمساعدتك! إذا كان لديك أي استفسار، شكوى، أو تحتاج إلى مساعدة فنية أو قانونية، لا تتردد في التواصل معنا عبر القنوات التالية.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <ScrollReveal delay={0.1}>
            <div className="ultra-glass p-8 rounded-3xl border border-white/10 hover:border-gold-500/30 transition-all duration-300 h-full flex flex-col justify-center items-center text-center">
              <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <i className="fab fa-whatsapp"></i>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">الدعم الفني والواتساب</h2>
              <p className="text-gray-400 mb-6">للتواصل السريع لحل المشاكل التقنية أو الاستفسارات العامة عبر تطبيق واتساب.</p>
              <a href="https://wa.me/201200621226" target="_blank" rel="noopener noreferrer" className="btn-luxury px-8 py-3 rounded-full flex items-center gap-2">
                <i className="fab fa-whatsapp"></i> تواصل عبر واتساب
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="ultra-glass p-8 rounded-3xl border border-white/10 hover:border-gold-500/30 transition-all duration-300 h-full flex flex-col justify-center items-center text-center">
              <div className="w-20 h-20 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center text-4xl mb-6 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                <i className="fas fa-envelope"></i>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">الدعم الإداري والقانوني</h2>
              <p className="text-gray-400 mb-6">للاستفسارات الرسمية والدعم القانوني، يمكنك مراسلتنا عبر البريد الإلكتروني.</p>
              <a href="mailto:support@mrmohebmousa.com" className="bg-blue-600/20 hover:bg-blue-500 text-blue-400 hover:text-white border border-blue-500/50 px-8 py-3 rounded-full flex items-center gap-2 transition-all">
                <i className="fas fa-paper-plane"></i> إرسال بريد إلكتروني
              </a>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </div>
  );
}
