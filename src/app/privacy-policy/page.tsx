import { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية | أكاديمية مستر محب موسى',
  description: 'سياسة الخصوصية الخاصة بمنصة أكاديمية مستر محب موسى التعليمية. تعرف على كيفية حماية بياناتك وشروط استخدام الحساب والامتحانات والمراقبة الآلية.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden" dir="rtl">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"></div>
      <div className="absolute top-40 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              سياسة الخصوصية
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              نلتزم في أكاديمية مستر محب موسى بحماية خصوصيتك وتوفير بيئة تعليمية آمنة وعادلة لجميع الطلاب. يرجى قراءة هذه السياسة بعناية.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          <ScrollReveal delay={0.1}>
            <div className="ultra-glass p-8 rounded-3xl border border-gold-500/20 hover:border-gold-500/40 transition-all duration-500 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-red-500/20 transition-all"></div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 border border-red-500/30">
                  <i className="fas fa-desktop text-xl"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">حساب المستخدم وقيود الأجهزة</h2>
                  <p className="text-gray-300 leading-relaxed">
                    حساب المنصة الممنوح للطالب مخصص <strong className="text-red-400">لشخص واحد فقط ولجهاز واحد فقط</strong>. عند محاولة استخدام الحساب على أكثر من جهاز، سيقوم النظام تلقائياً برصد ذلك وحظر الحساب بشكل مباشر ونهائي.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="ultra-glass p-8 rounded-3xl border border-gold-500/20 hover:border-gold-500/40 transition-all duration-500 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-all"></div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                  <i className="fas fa-user-shield text-xl"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">الخصوصية التامة والمراقبة الآلية (مكافحة الغش)</h2>
                  <p className="text-gray-300 leading-relaxed">
                    لضمان النزاهة، يتم رصد أي محاولة للغش أو الخداع أثناء الامتحانات بشكل آلي من خلال الكاميرا. 
                    <strong className="text-gold-400 block mt-2">
                      نظام المراقبة أوتوماتيكي بالكامل، وتتم معالجة البيانات على سيرفرات ذات تشفير فائق السرية والقوة. لا يمكن لأي شخص (ولا حتى إدارة المنصة أو الآدمن) مشاهدة أو الوصول إلى تسجيلات الكاميرا نهائياً، مما يضمن خصوصيتك المطلقة.
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="ultra-glass p-8 rounded-3xl border border-gold-500/20 hover:border-gold-500/40 transition-all duration-500 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-green-500/20 transition-all"></div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center shrink-0 border border-green-500/30">
                  <i className="fas fa-chart-line text-xl"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">الامتحانات وسجل الدرجات</h2>
                  <p className="text-gray-300 leading-relaxed">
                    يتطلب كل امتحان أقصى قدر من التركيز. يجب عليك المذاكرة جيداً قبل الدخول إلى أي اختبار، حيث يتم حفظ درجة كل امتحان يتم إجراؤه في سجلك الشخصي (History)، وتظهر هذه الدرجات بوضوح في ملفك الشخصي لتعكس مستواك الفعلي.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="ultra-glass p-8 rounded-3xl border border-gold-500/20 hover:border-gold-500/40 transition-all duration-500 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-purple-500/20 transition-all"></div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30">
                  <i className="fas fa-medal text-xl"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">نظام التقييم والرتب العسكرية</h2>
                  <p className="text-gray-300 leading-relaxed mb-2">
                    المنصة مجهزة بنظام متقدم للطلاب المتفوقين يتضمن مستويات ونقاط ورتب عسكرية. كلما تفوقت في امتحاناتك، حصلت على رتبة أعلى.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    الطلاب ذوي التقييمات العليا (Top Rated / High Ranks) يتم تقييمهم بشكل خاص ويحصلون على <strong className="text-gold-400">جوائز قيمة جداً</strong>. من الضروري جداً الحفاظ على تقييمك المرتفع للاستفادة من هذه المكافآت.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="ultra-glass p-8 rounded-3xl border border-gold-500/20 hover:border-gold-500/40 transition-all duration-500 relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-orange-500/20 transition-all"></div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/30">
                  <i className="fas fa-users text-xl"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-3">متابعة أولياء الأمور</h2>
                  <p className="text-gray-300 leading-relaxed">
                    توفر المنصة لأولياء الأمور القدرة على متابعة أبنائهم بشكل مستمر ودقيق، والاطلاع على مستوياتهم ودرجاتهم في جميع الامتحانات أولاً بأول.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </div>
  );
}
