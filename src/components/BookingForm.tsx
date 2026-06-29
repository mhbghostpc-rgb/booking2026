'use client';
import { useState, FormEvent } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import ScrollReveal from '@/components/ScrollReveal';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone1: '',
    phone2: '',
    address: '',
    schoolName: '',
    finalGrade: '',
    stage: '',
    grade: '',
    attendanceMode: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [submittedData, setSubmittedData] = useState<any>(null);

  const gradesOptions: Record<string, string[]> = {
    primary: ['الاول الابتدائي', 'الثاني الابتدائي', 'الثالث الابتدائي', 'الرابع الابتدائي', 'الخامس الابتدائي', 'السادس الابتدائي'],
    prep: ['الاول الاعدادي', 'الثاني الاعدادي', 'الثالث الاعدادي'],
    secondary: ['الاول الثانوي', 'الثاني الثانوي', 'الثالث الثانوي']
  };

  const handleStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, stage: e.target.value, grade: '' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (!auth.currentUser) {
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      } catch (error) {
        setMessage({ text: 'يرجى تسجيل الدخول بحساب جوجل لإكمال الحجز.', type: 'error' });
        return;
      }
    }

    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(formData.phone1)) {
      setMessage({ text: 'رقم هاتف الطالب غير صحيح. يرجى إدخال رقم مصري صحيح مكون من 11 رقم.', type: 'error' });
      return;
    }
    if (!phoneRegex.test(formData.phone2)) {
      setMessage({ text: 'رقم ولي الأمر غير صحيح. يرجى إدخال رقم مصري صحيح مكون من 11 رقم.', type: 'error' });
      return;
    }

    const addressWords = formData.address.trim().split(/\s+/);
    if (addressWords.length !== 2) {
      setMessage({ text: 'العنوان غير صحيح. يرجى كتابة المحافظة والمنطقة (كلمتين فقط).', type: 'error' });
      return;
    }

    const schoolWords = formData.schoolName.trim().split(/\s+/);
    if (schoolWords.length > 2) {
      setMessage({ text: 'اسم المدرسة غير صحيح. يرجى كتابة اسم المدرسة بحد أقصى كلمتين.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    try {
      if (!auth.currentUser) throw new Error("User not authenticated");
      const q = query(collection(db, 'students'), where('parentUid', '==', auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setMessage({ text: 'عذراً، لقد قمت بتسجيل طالب بالفعل. لا يمكن تسجيل أكثر من طالب لنفس حساب جوجل.', type: 'error' });
        setIsSubmitting(false);
        return;
      }

      const stageMap: Record<string, string> = { primary: 'ابتدائي', prep: 'إعدادي', secondary: 'ثانوي' };
      const stageToSave = stageMap[formData.stage] || formData.stage;

      await addDoc(collection(db, 'students'), {
        ...formData,
        stage: stageToSave,
        parentUid: auth.currentUser?.uid,
        parentEmail: auth.currentUser?.email,
        timestamp: serverTimestamp(),
        acknowledged: false,
        adminMessage: ''
      });
      setSubmittedData({
        ...formData,
        stage: stageToSave
      });
      setMessage({ text: 'تم تسجيل بياناتك بنجاح! سيتم التواصل معك قريباً.', type: 'success' });
    } catch (error: any) {
      console.error(error);
      setMessage({ text: 'حدث خطأ أثناء التسجيل، يرجى المحاولة لاحقاً.', type: 'error' });
    }
    setIsSubmitting(false);
  };

  if (submittedData) {
    const whatsappText = `🌟 طلب تأكيد حجز جديد 🌟
-------------------------
👤 الاسم: ${submittedData.name}
📱 تليفون الطالب: ${submittedData.phone1}
💬 واتساب ولي الأمر: ${submittedData.phone2}
🏠 العنوان: ${submittedData.address}
🏫 المدرسة: ${submittedData.schoolName}
💯 درجة الإنجليزي: ${submittedData.finalGrade}%
📚 المرحلة: ${submittedData.stage}
🎓 الصف: ${submittedData.grade}
🏫 نظام الحضور: ${submittedData.attendanceMode}
-------------------------
يرجى إرسال الميعاد والمكان ورابط مجموعة الواتساب.`;

    const whatsappUrl = `https://wa.me/201200621226?text=${encodeURIComponent(whatsappText)}`;

    return (
      <div className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto text-center" dir="rtl">
        <div className="bg-gradient-to-b from-[#0a0f1c] to-[#04060a] border-t border-blue-900/40 border-x border-[#0a0f1c] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(59,130,246,0.2)] p-8 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-green-500/20 rounded-full blur-3xl"></div>
          
          <div className="w-24 h-24 bg-gradient-to-br from-green-400/20 to-green-600/20 border-2 border-green-400/50 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl shadow-[0_0_30px_rgba(74,222,128,0.5),inset_0_0_15px_rgba(74,222,128,0.3)] backdrop-blur-md relative z-10">
            <i className="fas fa-check"></i>
          </div>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-green-400 to-green-300 mb-4 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)] relative z-10">تم التسجيل بنجاح!</h2>
          
          <p className="text-gray-300 mb-8 text-lg leading-relaxed relative z-10 max-w-lg mx-auto">
            لقد تم حفظ استمارتك! برجاء الضغط على الزر بالأسفل لإرسال هذه الاستمارة عبر الواتساب لتأكيد الحجز النهائي واستلام تفاصيل الميعاد.
          </p>

          <div className="bg-gradient-to-br from-[#111827] to-[#0a0f16] rounded-2xl p-6 text-right mb-8 border border-[#d4af37]/30 mx-auto max-w-lg shadow-[0_15px_30px_-5px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.15)] relative z-10">
            <h3 className="text-xl font-bold text-center text-white mb-6 pb-4 border-b border-[#d4af37]/20 drop-shadow-md">
              <i className="fas fa-file-invoice text-[#d4af37] ml-2"></i> بيانات الاستمارة
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="flex flex-col border-b border-white/5 pb-2">
                <span className="text-[#D4AF37] font-bold text-sm drop-shadow-md mb-1"><i className="fas fa-user ml-1"></i> الاسم الرباعي</span> 
                <strong className="text-white text-md">{submittedData.name}</strong>
              </div>
              <div className="flex flex-col border-b border-white/5 pb-2">
                <span className="text-[#D4AF37] font-bold text-sm drop-shadow-md mb-1"><i className="fas fa-layer-group ml-1"></i> المرحلة والصف</span> 
                <strong className="text-white text-md">{submittedData.stage} - {submittedData.grade}</strong>
              </div>
              <div className="flex flex-col border-b border-white/5 pb-2">
                <span className="text-[#D4AF37] font-bold text-sm drop-shadow-md mb-1"><i className="fas fa-mobile-alt ml-1"></i> هاتف الطالب</span> 
                <strong className="text-white text-md" dir="ltr">{submittedData.phone1}</strong>
              </div>
              <div className="flex flex-col border-b border-white/5 pb-2">
                <span className="text-[#D4AF37] font-bold text-sm drop-shadow-md mb-1"><i className="fab fa-whatsapp ml-1"></i> واتساب ولي الأمر</span> 
                <strong className="text-white text-md" dir="ltr">{submittedData.phone2}</strong>
              </div>
              <div className="flex flex-col border-b border-white/5 pb-2">
                <span className="text-[#D4AF37] font-bold text-sm drop-shadow-md mb-1"><i className="fas fa-map-marker-alt ml-1"></i> العنوان</span> 
                <strong className="text-white text-md">{submittedData.address}</strong>
              </div>
              <div className="flex flex-col border-b border-white/5 pb-2">
                <span className="text-[#D4AF37] font-bold text-sm drop-shadow-md mb-1"><i className="fas fa-school ml-1"></i> المدرسة</span> 
                <strong className="text-white text-md">{submittedData.schoolName}</strong>
              </div>
              <div className="flex flex-col border-b border-white/5 pb-2 md:border-b-0 md:pb-0">
                <span className="text-[#D4AF37] font-bold text-sm drop-shadow-md mb-1"><i className="fas fa-percentage ml-1"></i> درجة الإنجليزي</span> 
                <strong className="text-white text-md">{submittedData.finalGrade}%</strong>
              </div>
              <div className="flex flex-col">
                <span className="text-[#D4AF37] font-bold text-sm drop-shadow-md mb-1"><i className="fas fa-chalkboard-teacher ml-1"></i> نظام الحضور</span> 
                <strong className="text-white text-md">{submittedData.attendanceMode}</strong>
              </div>
            </div>
          </div>

          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#25D366] to-[#1ebd5a] text-white px-10 py-4 rounded-full font-bold text-xl inline-flex items-center justify-center gap-3 w-full max-w-md transition-all shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(37,211,102,0.7)] hover:-translate-y-1 border border-green-400/50 relative z-10">
            <i className="fab fa-whatsapp text-3xl"></i>
            إرسال الاستمارة لتأكيد الحجز
          </a>
        </div>
      </div>
    );
  }

  return (
    <ScrollReveal delay={0.1}>
      <div className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto" dir="rtl">
        <div className="bg-gradient-to-b from-[#0a0f1c] to-[#04060a] border-t border-blue-900/40 border-x border-[#0a0f1c] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(59,130,246,0.2)] p-6 md:p-12 relative overflow-hidden rounded-[2rem]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-blue-500/10 rounded-full blur-3xl"></div>
          <h2 className="text-3xl font-bold text-center text-white mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <i className="fas fa-calendar-check text-gold-500 ml-2"></i> استمارة الحجز للعام الجديد
          </h2>

          {message.text && (
            <div className={`mb-6 p-4 rounded-xl font-bold text-center ${message.type === 'error' ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-green-500/20 text-green-400 border border-green-500/50'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-[#D4AF37] text-sm mb-2 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"><i className="fas fa-user ml-2"></i> الاسم الرباعي للطالب</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="modern-input w-full p-3 px-4" placeholder="مثال: أحمد محمد محمود علي" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[#D4AF37] text-sm mb-2 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"><i className="fas fa-mobile-alt ml-2"></i> رقم هاتف الطالب</label>
                <input type="tel" required pattern="^01[0125][0-9]{8}$" title="رقم هاتف مصري مكون من 11 رقم" value={formData.phone1} onChange={e => setFormData({...formData, phone1: e.target.value})} className="modern-input w-full p-3 px-4" placeholder="01xxxxxxxxx" />
              </div>
              <div>
                <label className="block text-[#D4AF37] text-sm mb-2 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"><i className="fab fa-whatsapp ml-2"></i> رقم ولي الأمر (واتساب)</label>
                <input type="tel" required pattern="^01[0125][0-9]{8}$" title="رقم هاتف مصري مكون من 11 رقم" value={formData.phone2} onChange={e => setFormData({...formData, phone2: e.target.value})} className="modern-input w-full p-3 px-4" placeholder="01xxxxxxxxx" />
              </div>
            </div>

            <div>
              <label className="block text-[#D4AF37] text-sm mb-2 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"><i className="fas fa-map-marker-alt ml-2"></i> المنطقة السكنية (العنوان)</label>
              <input type="text" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="modern-input w-full p-3 px-4" placeholder="مثال: شبرا الخيمة - الشارع الجديد" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[#D4AF37] text-sm mb-2 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"><i className="fas fa-school ml-2"></i> اسم المدرسة</label>
                <input type="text" required value={formData.schoolName} onChange={e => setFormData({...formData, schoolName: e.target.value})} className="modern-input w-full p-3 px-4" placeholder="اسم المدرسة التي يدرس بها الطالب" />
              </div>
              <div>
                <label className="block text-[#D4AF37] text-sm mb-2 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"><i className="fas fa-percentage ml-2"></i> درجة الإنجليزي العام السابق (%)</label>
                <input type="number" min="50" max="100" required value={formData.finalGrade} onChange={e => setFormData({...formData, finalGrade: e.target.value})} className="modern-input w-full p-3 px-4" placeholder="مثال: 95" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[#D4AF37] text-sm mb-2 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"><i className="fas fa-layer-group ml-2"></i> المرحلة الدراسية (الجديدة)</label>
                <select required value={formData.stage} onChange={handleStageChange} className="modern-input w-full p-3 px-4 [&>option]:bg-luxury-900 [&>option]:text-white">
                  <option value="" disabled>اختر المرحلة</option>
                  <option value="primary">المرحلة الابتدائية</option>
                  <option value="prep">المرحلة الإعدادية</option>
                  <option value="secondary">المرحلة الثانوية</option>
                </select>
              </div>
              <div>
                <label className="block text-[#D4AF37] text-sm mb-2 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"><i className="fas fa-graduation-cap ml-2"></i> الصف الدراسي</label>
                <select required value={formData.grade} disabled={!formData.stage} onChange={e => setFormData({...formData, grade: e.target.value})} className="modern-input w-full p-3 px-4 disabled:opacity-50 [&>option]:bg-luxury-900 [&>option]:text-white">
                  <option value="" disabled>اختر المرحلة أولاً</option>
                  {formData.stage && gradesOptions[formData.stage]?.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#D4AF37] text-sm mb-2 font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"><i className="fas fa-chalkboard-teacher ml-2"></i> نظام الحضور المفضل</label>
              <select required value={formData.attendanceMode} onChange={e => setFormData({...formData, attendanceMode: e.target.value})} className="modern-input w-full p-3 px-4 [&>option]:bg-luxury-900 [&>option]:text-white">
                <option value="" disabled>اختر النظام</option>
                <option value="حضوري">حضوري بالسنتر (للطلاب القريبين)</option>
                <option value="أونلاين">أونلاين (تفاعلي مباشر)</option>
              </select>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-luxury w-full py-4 text-lg font-bold flex items-center justify-center gap-2">
              {isSubmitting ? 'جاري الإرسال...' : <><i className="fas fa-paper-plane"></i> تأكيد التسجيل</>}
            </button>
          </form>
        </div>
      </div>
    </ScrollReveal>
  );
}
