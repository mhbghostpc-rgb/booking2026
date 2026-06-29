import { Metadata } from 'next';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: 'شروط الاستخدام | أكاديمية مستر محب موسى',
  description: 'شروط وأحكام استخدام منصة أكاديمية مستر محب موسى للغة الإنجليزية.',
};

export default function TermsOfUse() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden" dir="rtl">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none"></div>
      <div className="absolute top-40 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              شروط الاستخدام
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              تحدد هذه الشروط القواعد الأساسية لاستخدامك لمنصة أكاديمية مستر محب موسى. استخدامك للمنصة يعني موافقتك التامة على هذه الشروط.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <ScrollReveal delay={0.1}>
            <div className="ultra-glass p-8 rounded-3xl border border-white/10 hover:border-gold-500/30 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-4">1. الحساب الشخصي</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                <li>يلتزم الطالب بإنشاء حساب شخصي واحد ببيانات حقيقية ودقيقة.</li>
                <li>يُمنع منعاً باتاً مشاركة بيانات تسجيل الدخول مع أي شخص آخر، والحساب مخصص لاستخدام شخص واحد على جهاز واحد فقط.</li>
                <li>الطالب مسؤول مسؤولية كاملة عن الحفاظ على سرية حسابه وكلمة المرور.</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="ultra-glass p-8 rounded-3xl border border-white/10 hover:border-gold-500/30 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-4">2. السلوك العام والامتحانات</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                <li>يجب الالتزام بآداب السلوك العام واحترام المعلمين وزملاء الدراسة.</li>
                <li>يُمنع أي شكل من أشكال الغش أثناء الامتحانات. سيؤدي رصد أي محاولة غش من قبل النظام الآلي إلى عواقب وخيمة قد تصل إلى الحظر.</li>
                <li>لا يجوز استخدام المنصة لأي أغراض تجارية أو غير قانونية.</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="ultra-glass p-8 rounded-3xl border border-white/10 hover:border-gold-500/30 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-4">3. الملكية الفكرية</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                <li>جميع المواد التعليمية، الفيديوهات، والاختبارات الموجودة على المنصة هي ملكية فكرية حصرية لأكاديمية مستر محب موسى.</li>
                <li>يُمنع تسجيل، أو تصوير، أو إعادة نشر أي محتوى من المنصة بأي شكل من الأشكال بدون إذن كتابي مسبق.</li>
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="ultra-glass p-8 rounded-3xl border border-white/10 hover:border-gold-500/30 transition-all duration-300">
              <h2 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-4">4. التعديلات والإلغاء</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                <li>تحتفظ الإدارة بالحق في تعديل شروط الاستخدام في أي وقت، وسيتم إشعار المستخدمين بأي تغييرات جوهرية.</li>
                <li>يحق للإدارة إيقاف أو إلغاء أي حساب يثبت مخالفته لهذه الشروط وبدون سابق إنذار أو استرداد للمصروفات.</li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
