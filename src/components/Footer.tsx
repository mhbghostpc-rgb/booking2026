import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-luxury-900 border-t border-gold-500/20 pt-12 pb-6 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold text-gold-500 mb-4">أكاديمية مستر محب موسى</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            منصة تعليمية متخصصة في تعليم اللغة الإنجليزية للطلاب بنظام حجز ومتابعة تفاعلي يضمن أعلى درجات التفوق.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-4">روابط سريعة</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/" className="hover:text-gold-400 transition-colors">الرئيسية</Link></li>
            <li><Link href="/courses" className="hover:text-gold-400 transition-colors">كورسات إنجليزي</Link></li>
            <li><Link href="/mr-moheb-mousa" className="hover:text-gold-400 transition-colors">من هو مستر محب موسى؟</Link></li>
            <li><Link href="/faq" className="hover:text-gold-400 transition-colors">الأسئلة الشائعة</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-4">الدعم القانوني</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/privacy-policy" className="hover:text-gold-400 transition-colors">سياسة الخصوصية</Link></li>
            <li><Link href="/terms" className="hover:text-gold-400 transition-colors">شروط الاستخدام</Link></li>
            <li><Link href="/contact" className="hover:text-gold-400 transition-colors">تواصل معنا</Link></li>
          </ul>
        </div>
      </div>
      <div className="text-center border-t border-white/10 pt-6">
        <p className="text-sm text-gray-500">
          جميع الحقوق محفوظة © {new Date().getFullYear()} أكاديمية مستر محب موسى للغة الإنجليزية
        </p>
      </div>
    </footer>
  );
}
