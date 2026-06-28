import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata = {
  title: 'كورسات اللغة الإنجليزية | أكاديمية مستر محب موسى',
  description: 'اكتشف الكورسات المتاحة في أكاديمية مستر محب موسى للغة الإنجليزية لجميع المراحل الدراسية (الابتدائية، الإعدادية، الثانوية العامة) بنظام الحضور أو الأونلاين.',
  keywords: 'كورسات إنجليزي, كورس لغة إنجليزية, ثانوية عامة, إعدادي, ابتدائي, مستر محب موسى'
};

export default function CoursesPage() {
  const courses = [
    {
      title: 'كورسات المرحلة الثانوية',
      description: 'تأهيل شامل لامتحانات الثانوية العامة، شرح مفصل للقواعد والمفردات، تدريب مكثف على الترجمة وكتابة المقال.',
      icon: 'fa-graduation-cap',
      color: 'gold'
    },
    {
      title: 'كورسات المرحلة الإعدادية',
      description: 'بناء أساس قوي في اللغة الإنجليزية، تنمية مهارات القراءة والاستماع، والتدريب على نمط الأسئلة الحديثة.',
      icon: 'fa-book-open',
      color: 'blue'
    },
    {
      title: 'كورسات المرحلة الابتدائية',
      description: 'تأسيس تفاعلي ممتع للأطفال، التركيز على النطق الصحيح (Phonics) والمحادثة الأساسية بأسلوب مبسط.',
      icon: 'fa-child',
      color: 'green'
    }
  ];

  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            البرامج <span className="text-gold-500">التدريبية</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            نقدم برامج تدريبية متكاملة تناسب كافة المراحل الدراسية لضمان تفوق الطالب في اللغة الإنجليزية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {courses.map((course, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.2} duration={1.2}>
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-gold-500/50 hover:bg-white/10 transition-all group h-full">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 bg-gradient-to-br from-white/10 to-transparent border border-white/20 group-hover:scale-110 transition-transform ${course.color === 'gold' ? 'text-gold-500 border-gold-500/30' : course.color === 'blue' ? 'text-blue-400 border-blue-400/30' : 'text-green-400 border-green-400/30'}`}>
                  <i className={`fas ${course.icon}`}></i>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">{course.title}</h2>
                <p className="text-gray-400 leading-relaxed mb-8 h-24">{course.description}</p>
                <Link href="/booking" className={`inline-flex items-center gap-2 font-bold transition-colors ${course.color === 'gold' ? 'text-gold-500 hover:text-gold-400' : course.color === 'blue' ? 'text-blue-400 hover:text-blue-300' : 'text-green-400 hover:text-green-300'}`}>
                  احجز الآن <i className="fas fa-arrow-left"></i>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
