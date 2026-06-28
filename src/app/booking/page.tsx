import BookingForm from '@/components/BookingForm';

export const metadata = {
  title: 'حجز كورسات إنجليزي | أكاديمية مستر محب موسى',
  description: 'احجز مكانك الآن في كورسات اللغة الإنجليزية للعام القادم مع مستر محب موسى. نظام حجز إلكتروني متطور ومقاعد محدودة.',
  keywords: 'حجز كورس إنجليزي, مستر محب موسى, ثانوية عامة, إعدادي, ابتدائي'
};

export default function BookingPage() {
  return (
    <div className="pt-10 pb-20">
      <div className="container mx-auto px-4 text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          احجز <span className="text-gold-500">مكانك</span> الآن
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          المقاعد محدودة للعام الدراسي الجديد. سجل بياناتك الآن وسنقوم بالتواصل معك لتأكيد الحجز وبدء التجربة المجانية.
        </p>
      </div>
      <BookingForm />
    </div>
  );
}
