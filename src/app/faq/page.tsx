import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: 'الأسئلة الشائعة | أكاديمية مستر محب موسى',
  description: 'إجابات على الأسئلة الشائعة حول كيفية الحجز في أكاديمية مستر محب موسى، أنظمة الدفع، ونظام الأونلاين.',
  keywords: 'أسئلة شائعة, الحجز, مستر محب موسى, أكاديمية محب موسى'
};

export default function FAQPage() {
  const faqs = [
    {
      question: 'كيف يمكنني تأكيد الحجز للعام القادم؟',
      answer: 'يمكنك تأكيد الحجز من خلال تعبئة استمارة الحجز الموجودة في الموقع، وسيقوم فريق الدعم بالتواصل معك على رقم الواتساب لتأكيد الحجز وتحديد المواعيد.'
    },
    {
      question: 'هل يوجد نظام أونلاين بالكامل؟',
      answer: 'نعم، نوفر نظام أونلاين تفاعلي مباشر يشمل امتحانات إلكترونية ومتابعة دورية تضمن نفس مستوى التحصيل لنظام الحضور الفعلي.'
    },
    {
      question: 'كيف تتم متابعة مستوى الطالب؟',
      answer: 'نقوم بعمل امتحانات دورية وتقييمات مستمرة، وتُرسل تقارير مفصلة لمستوى الطالب إلى ولي الأمر عبر الواتساب لضمان المتابعة المستمرة.'
    },
    {
      question: 'متى تبدأ الدراسة للعام الجديد؟',
      answer: 'يتم الإعلان عن مواعيد بدء الدراسة لكل مرحلة على حدة من خلال الجروبات الرسمية الخاصة بنا بعد تأكيد الحجز.'
    }
  ];

  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            الأسئلة <span className="text-gold-500">الشائعة</span>
          </h1>
          <p className="text-gray-400 text-lg">كل ما تود معرفته عن نظام الدراسة والحجز.</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => {
            const directions: ('right' | 'left' | 'up' | 'none')[] = ['right', 'left', 'up', 'none'];
            const direction = directions[idx % 4];
            
            return (
              <ScrollReveal key={idx} direction={direction} duration={1.2} delay={idx * 0.1}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold-500/30 transition-all">
                  <h3 className="text-xl font-bold text-gold-400 mb-3 flex items-start gap-3">
                    <i className="fas fa-question-circle mt-1 text-gold-600"></i>
                    {faq.question}
                  </h3>
                  <p className="text-gray-300 leading-relaxed pr-8">{faq.answer}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
