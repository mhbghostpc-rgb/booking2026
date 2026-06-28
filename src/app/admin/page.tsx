'use client';
import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, onSnapshot, doc, setDoc, increment, deleteDoc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [students, setStudents] = useState<any[]>([]);
  const [visitorCount, setVisitorCount] = useState(0);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [adminMessage, setAdminMessage] = useState('');
  const [sendMethod, setSendMethod] = useState('platform');
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', phone1: '', phone2: '', stage: '', grade: '', attendanceMode: 'حضوري', schoolName: '', finalGrade: '', address: '' });

  const router = useRouter();

  useEffect(() => {
    // Check WebAuthn Passkey
    const verifyPasskey = async () => {
      const storedCredIdStr = localStorage.getItem('admin_passkey_id');
      if (storedCredIdStr) {
        try {
          const storedCredId = Uint8Array.from(atob(storedCredIdStr), c => c.charCodeAt(0));
          const challenge = new Uint8Array(32);
          window.crypto.getRandomValues(challenge);

          const credential = await navigator.credentials.get({
            publicKey: {
              challenge: challenge,
              allowCredentials: [{ id: storedCredId, type: "public-key", transports: ["internal"] }],
              userVerification: "required"
            }
          });

          if (credential) {
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.log("Passkey auto-login failed or cancelled", error);
        }
      }
    };
    verifyPasskey();
  }, []);

  const saveNewStudent = async () => {
    if (!newStudent.name || !newStudent.phone1) {
      alert("يرجى إدخال الاسم ورقم الهاتف على الأقل");
      return;
    }
    
    try {
      // Admin bypasses standard constraints and adds to the system directly
      await addDoc(collection(db, 'users'), {
        ...newStudent,
        role: 'student',
        createdAt: new Date(),
        // Note: For actual auth, the user will still need to sign in with Google
        // This just pre-registers their details. They will link when they login with the same phone/email.
      });
      alert('تم إضافة الطالب بنجاح!');
      setIsAddingStudent(false);
      setNewStudent({ name: '', phone1: '', phone2: '', stage: '', grade: '', address: '', schoolName: '', finalGrade: '', attendanceMode: 'حضوري' });
    } catch (error) {
      console.error("Error adding student:", error);
      alert('حدث خطأ أثناء إضافة الطالب');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const unsubStudents = onSnapshot(collection(db, 'students'), (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Sort by timestamp desc
        data.sort((a: any, b: any) => {
          const tA = a.timestamp?.toMillis ? a.timestamp.toMillis() : 0;
          const tB = b.timestamp?.toMillis ? b.timestamp.toMillis() : 0;
          return tB - tA;
        });
        setStudents(data);
      });

      const unsubStats = onSnapshot(doc(db, 'site_stats', 'visitors'), (docSnap) => {
        if (docSnap.exists()) {
          setVisitorCount(docSnap.data().count || 0);
        }
      });

      return () => {
        unsubStudents();
        unsubStats();
      };
    }
  }, [isLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'mhbghost@gmail.com' && password === '0127558019m') {
      try {
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);

        const userId = new Uint8Array(16);
        window.crypto.getRandomValues(userId);

        const credential = await navigator.credentials.create({
          publicKey: {
            challenge: challenge,
            rp: { name: "Moheb Academy Admin" },
            user: {
              id: userId,
              name: email,
              displayName: "مستر محب"
            },
            pubKeyCredParams: [{ type: "public-key", alg: -7 }, { type: "public-key", alg: -257 }],
            authenticatorSelection: { authenticatorAttachment: "platform", userVerification: "required" },
            timeout: 60000,
            attestation: "none"
          }
        });

        if (credential) {
          const rawIdArray = Array.from(new Uint8Array((credential as any).rawId));
          const credIdString = btoa(String.fromCharCode.apply(null, rawIdArray as any));
          localStorage.setItem('admin_passkey_id', credIdString);
        }
      } catch (error) {
        console.log('WebAuthn registration failed or cancelled', error);
      }
      // Log in even if passkey fails to register (e.g. unsupported device)
      setIsLoggedIn(true);
    } else {
      alert('بيانات الدخول غير صحيحة');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_passkey_id');
    setIsLoggedIn(false);
  };

  const downloadExcel = () => {
    const csvRows = [];
    const headers = ['اسم الطالب', 'رقم الهاتف 1', 'رقم الهاتف 2', 'المرحلة', 'الصف', 'النظام', 'المدرسة', 'العنوان', 'تاريخ التسجيل'];
    csvRows.push(headers.join(','));

    filteredStudents.forEach(s => {
      const row = [
        `"${s.name || ''}"`,
        `"${s.phone1 || ''}"`,
        `"${s.phone2 || ''}"`,
        `"${s.stage || ''}"`,
        `"${s.grade || ''}"`,
        `"${s.mode || ''}"`,
        `"${s.schoolName || ''}"`,
        `"${s.address || ''}"`,
        `"${s.timestamp ? new Date(s.timestamp.toMillis()).toLocaleString('ar-EG') : ''}"`
      ];
      csvRows.push(row.join(','));
    });

    const csvString = '\uFEFF' + csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `طلاب_مستر_محب_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteStudent = async (id: string) => {
    try {
      if (confirm('هل أنت متأكد من حذف هذا الطالب نهائياً؟')) {
        await deleteDoc(doc(db, 'students', id));
      }
    } catch (err) {
      alert('حدث خطأ أثناء الحذف: ' + err);
    }
  };

  const saveEdit = async () => {
    if (!editingStudent) return;
    try {
      await updateDoc(doc(db, 'students', editingStudent.id), editingStudent);
      setEditingStudent(null);
      alert('تم تعديل بيانات الطالب بنجاح!');
    } catch (err) {
      alert('حدث خطأ أثناء التعديل: ' + err);
    }
  };

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(new Set(filteredStudents.map(s => s.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const sendBulkMessage = async () => {
    if (selectedIds.size === 0 || !adminMessage.trim()) return;

    if (sendMethod === 'platform') {
      for (const id of Array.from(selectedIds)) {
        await updateDoc(doc(db, 'students', id), {
          adminMessage,
          acknowledged: false
        });
      }
      alert('تم إرسال الرسائل عبر المنصة بنجاح!');
      setAdminMessage('');
      setSelectedIds(new Set());
    } else if (sendMethod === 'whatsapp') {
      let successCount = 0;
      if (selectedIds.size > 5) {
        if (!confirm(`تنبيه: أنت على وشك فتح ${selectedIds.size} نافذة واتساب دفعة واحدة. هل تريد المتابعة؟`)) return;
      }
      Array.from(selectedIds).forEach(id => {
        const student = students.find(s => s.id === id);
        if (student && student.phone1) {
          let cleanPhone = student.phone1.replace(/\s+/g, '');
          if (cleanPhone.startsWith('0')) cleanPhone = '+20' + cleanPhone.substring(1);
          else if (!cleanPhone.startsWith('+')) cleanPhone = '+20' + cleanPhone;

          const msgBody = adminMessage.trim() ? `\n\n${adminMessage.trim()}\n\n` : '\n\n';
          const fullMessage = `أهلاً بك ولي أمر الطالب/ة (${student.name})\nمعك إدارة مستر محب موسى.${msgBody}أتمنى لكم عام ملئ بالنجاح والتفوق`;

          window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(fullMessage)}`, '_blank');
          successCount++;
        }
      });
      alert(`تم تجهيز الواتساب لـ ${successCount} طالب.`);
    }
  };

  const filteredStudents = students.filter(s => {
    const matchSearch = !search || (s.name && s.name.includes(search)) || (s.schoolName && s.schoolName.includes(search)) || (s.phone1 && s.phone1.includes(search));

    let sStage = s.stage || '';
    if (sStage === 'primary' || sStage.includes('الابتدائية')) sStage = 'ابتدائي';
    else if (sStage === 'prep' || sStage.includes('الإعدادية') || sStage.includes('الاعدادية')) sStage = 'إعدادي';
    else if (sStage === 'secondary' || sStage.includes('الثانوية')) sStage = 'ثانوي';

    const matchStage = stageFilter === 'all' || sStage === stageFilter;

    let sGrade = s.grade || '';
    if (sGrade === 'الصف الرابع') sGrade = 'الرابع الابتدائي';
    else if (sGrade === 'الصف الخامس') sGrade = 'الخامس الابتدائي';
    else if (sGrade === 'الصف السادس') sGrade = 'السادس الابتدائي';
    else if (sGrade.includes('الأول الإعدادي')) sGrade = 'الاول الاعدادي';
    else if (sGrade.includes('الثاني الإعدادي')) sGrade = 'الثاني الاعدادي';
    else if (sGrade.includes('الثالث الإعدادي')) sGrade = 'الثالث الاعدادي';
    else if (sGrade.includes('الأول الثانوي') || sGrade.includes('الاول الثانوي')) sGrade = 'الاول الثانوي';
    else if (sGrade.includes('الثاني الثانوي')) sGrade = 'الثاني الثانوي';
    else if (sGrade.includes('الثالث الثانوي')) sGrade = 'الثالث الثانوي';

    const matchGrade = gradeFilter === 'all' || sGrade === gradeFilter;
    const matchMode = modeFilter === 'all' || s.attendanceMode === modeFilter || s.mode === modeFilter;
    return matchSearch && matchStage && matchGrade && matchMode;
  });

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#05070a] pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <div className="ultra-glass p-8 rounded-2xl relative overflow-hidden">
            <h2 className="text-3xl font-bold text-center text-white mb-6">دخول الإدارة</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  className="modern-input w-full p-3 px-4"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="mhbghost@gmail.com"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">كلمة المرور</label>
                <input
                  type="password"
                  required
                  className="modern-input w-full p-3 px-4"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <button type="submit" className="btn-luxury w-full py-3 text-lg mt-6">
                <i className="fas fa-sign-in-alt ml-2"></i> تسجيل الدخول
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070a] pt-28 pb-20 px-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="ultra-glass p-6 md:p-8 rounded-2xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <i className="fas fa-tachometer-alt text-gold-500"></i>
              لوحة التحكم الإدارية
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-blue-600/20 text-blue-400 border border-blue-500/50 px-4 py-2 rounded-xl flex items-center gap-2 font-bold shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <i className="fas fa-eye"></i> الزوار: <span>{visitorCount}</span>
              </div>
              <div className="bg-purple-600/20 text-purple-400 border border-purple-500/50 px-4 py-2 rounded-xl flex items-center gap-2 font-bold shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <i className="fas fa-users"></i> إجمالي الطلاب: <span>{filteredStudents.length}</span>
              </div>
              <button onClick={downloadExcel} className="bg-green-600/20 hover:bg-green-500 text-green-400 hover:text-white border border-green-500/50 px-4 py-2 rounded-xl transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                <i className="fas fa-file-excel"></i> تحميل Excel
              </button>
              <button onClick={() => window.print()} className="bg-orange-600/20 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/50 px-4 py-2 rounded-xl transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                <i className="fas fa-file-pdf"></i> طباعة كـ PDF
              </button>
              <button onClick={() => setIsAddingStudent(true)} className="btn-luxury px-4 py-2 flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]">
                <i className="fas fa-user-plus"></i> إضافة طالب
              </button>
              <button onClick={() => { localStorage.removeItem('admin_passkey_id'); window.location.reload(); }} className="bg-red-600/20 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/50 px-4 py-2 rounded-xl transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <i className="fas fa-sign-out-alt"></i> خروج
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-white/5 p-4 rounded-xl border border-white/10">
            <div>
              <label className="block text-gray-400 text-xs mb-1">بحث بالاسم أو المدرسة</label>
              <input type="text" className="modern-input w-full p-2" placeholder="اكتب للبحث..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">المرحلة</label>
              <select className="modern-input w-full p-2 [&>option]:bg-luxury-900 [&>option]:text-white" value={stageFilter} onChange={e => { setStageFilter(e.target.value); setGradeFilter('all'); }}>
                <option value="all">كل المراحل</option>
                <option value="ابتدائي">المرحلة الابتدائية</option>
                <option value="إعدادي">المرحلة الإعدادية</option>
                <option value="ثانوي">المرحلة الثانوية</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">الصف</label>
              <select className="modern-input w-full p-2 [&>option]:bg-luxury-900 [&>option]:text-white" disabled={stageFilter === 'all'} value={gradeFilter} onChange={e => setGradeFilter(e.target.value)}>
                {stageFilter === 'all' && <option value="all">كل الصفوف (اختر المرحلة)</option>}
                {stageFilter !== 'all' && <option value="all">كل الصفوف</option>}
                {stageFilter === 'ابتدائي' && (
                  <>
                    <option value="الاول الابتدائي">الأول الابتدائي</option>
                    <option value="الثاني الابتدائي">الثاني الابتدائي</option>
                    <option value="الثالث الابتدائي">الثالث الابتدائي</option>
                    <option value="الرابع الابتدائي">الرابع الابتدائي</option>
                    <option value="الخامس الابتدائي">الخامس الابتدائي</option>
                    <option value="السادس الابتدائي">السادس الابتدائي</option>
                  </>
                )}
                {stageFilter === 'إعدادي' && (
                  <>
                    <option value="الاول الاعدادي">الأول الإعدادي</option>
                    <option value="الثاني الاعدادي">الثاني الإعدادي</option>
                    <option value="الثالث الاعدادي">الثالث الإعدادي</option>
                  </>
                )}
                {stageFilter === 'ثانوي' && (
                  <>
                    <option value="الاول الثانوي">الأول الثانوي</option>
                    <option value="الثاني الثانوي">الثاني الثانوي</option>
                    <option value="الثالث الثانوي">الثالث الثانوي</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">نظام الحضور</label>
              <select className="modern-input w-full p-2 [&>option]:bg-luxury-900 [&>option]:text-white" value={modeFilter} onChange={e => setModeFilter(e.target.value)}>
                <option value="all">الكل</option>
                <option value="حضوري">حضوري</option>
                <option value="أونلاين">أونلاين</option>
              </select>
            </div>
          </div>

          <div className={`bg-luxury-800 border border-gold-500/30 p-4 rounded-xl mb-6 flex flex-col md:flex-row items-center gap-4 transition-all duration-300 ${selectedIds.size === 0 ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
            <div className="text-white font-bold whitespace-nowrap">
              <span className="text-gold-500 text-xl">{selectedIds.size}</span> طلاب محددين
            </div>
            <div className="flex-grow flex gap-2 w-full">
              <input type="text" placeholder={selectedIds.size > 0 ? "اكتب رسالتك هنا..." : "اختر طلاباً لتفعيل المراسلة"} className="modern-input w-full p-2 flex-grow" value={adminMessage} onChange={e => setAdminMessage(e.target.value)} disabled={selectedIds.size === 0} />
              <select className="modern-input p-2 w-32 [&>option]:bg-luxury-900 [&>option]:text-white" value={sendMethod} onChange={e => setSendMethod(e.target.value)} disabled={selectedIds.size === 0}>
                <option value="platform">عبر المنصة</option>
                <option value="whatsapp">عبر واتساب</option>
              </select>
              <button onClick={sendBulkMessage} className="btn-luxury px-6 py-2 whitespace-nowrap" disabled={selectedIds.size === 0}>إرسال</button>
            </div>
          </div>
          <div className="overflow-x-auto bg-black/40 rounded-xl border border-white/5">
            <table className="w-full text-right" dir="rtl">
              <thead className="bg-white/5 text-gray-400 text-sm border-b border-white/10">
                <tr>
                  <th className="p-4 w-10 text-center">
                    <input
                      type="checkbox"
                      onChange={toggleSelectAll}
                      checked={filteredStudents.length > 0 && selectedIds.size === filteredStudents.length}
                      className="custom-checkbox mx-auto"
                    />
                  </th>
                  <th className="p-4">اسم الطالب</th>
                  <th className="p-4">رقم التواصل</th>
                  <th className="p-4">المرحلة والصف</th>
                  <th className="p-4">المدرسة والدرجة</th>
                  <th className="p-4 text-center">تاريخ الحجز</th>
                  <th className="p-4 text-center">نظام الحضور</th>
                  <th className="p-4 text-center">العنوان</th>
                  <th className="p-4 text-center">الحالة</th>
                  <th className="p-4 text-center">مراسلة</th>
                  <th className="p-4 text-center">تعديل</th>
                  <th className="p-4 text-center">حذف</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredStudents.map(s => {
                  let statusHtml;
                  if (s.adminMessage) {
                    if (s.acknowledged) {
                      statusHtml = <span className="text-green-400 font-bold bg-green-900/30 px-2 py-1 rounded border border-green-500/30 whitespace-nowrap"><i className="fas fa-check-double mr-1"></i> تم التأكيد</span>;
                    } else {
                      statusHtml = <span className="text-gold-400 text-xs bg-gold-900/30 px-2 py-1 rounded border border-gold-500/30 whitespace-nowrap"><i className="fas fa-paper-plane mr-1 animate-pulse"></i> أُرسل</span>;
                    }
                  } else {
                    statusHtml = <span className="text-gray-500 text-xs"><i className="fas fa-minus mr-1"></i> لم يرسل</span>;
                  }

                  let modeStr = s.attendanceMode || 'غير محدد';
                  let modeHtml;
                  if (modeStr === 'حضوري') modeHtml = <span className="bg-blue-500/10 text-blue-400 px-2 py-1 rounded text-xs border border-blue-500/20 whitespace-nowrap"><i className="fas fa-building mr-1"></i> {modeStr}</span>;
                  else if (modeStr === 'أونلاين') modeHtml = <span className="bg-purple-500/10 text-purple-400 px-2 py-1 rounded text-xs border border-purple-500/20 whitespace-nowrap"><i className="fas fa-laptop-house mr-1"></i> {modeStr}</span>;
                  else modeHtml = <span className="text-gray-500">{modeStr}</span>;

                  const schoolHtml = s.schoolName ? s.schoolName : 'غير مسجل';
                  const gradeHtml = s.finalGrade ? <span className="text-xs text-gold-400 border border-gold-500/30 bg-gold-900/30 px-1.5 py-0.5 rounded-sm inline-block mt-1">الدرجة: {s.finalGrade}</span> : null;

                  return (
                    <tr key={s.id} className="hover:bg-white/5 transition group border-b border-white/5">
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(s.id)}
                          onChange={() => toggleSelect(s.id)}
                          className="custom-checkbox mx-auto"
                        />
                      </td>
                      <td className="p-4 font-bold text-white group-hover:text-gold-300 transition-colors">
                        {s.name}
                        <br />
                        <span className="text-xs text-gray-500 font-normal mt-1 block">
                          <i className="fas fa-envelope text-gold-500/40 ml-1"></i> {s.parentEmail || 'N/A'}
                        </span>
                      </td>
                      <td className="p-4" dir="ltr">
                        <span className="text-white text-base">{s.phone1}</span>
                      </td>
                      <td className="p-4">
                        <span className="bg-gold-500/10 text-gold-500 px-2 py-1 rounded text-xs border border-gold-500/20 whitespace-nowrap">
                          {s.stage} - {s.grade}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-300">
                        <span className="block font-bold text-white">{schoolHtml}</span>
                        {gradeHtml}
                      </td>
                      <td className="p-4 text-center text-gray-400 text-xs" dir="ltr">
                        {s.timestamp && s.timestamp.seconds ? new Date(s.timestamp.seconds * 1000).toLocaleString('ar-EG', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'غير متوفر'}
                      </td>
                      <td className="p-4 font-bold text-center">
                        {modeHtml}
                      </td>
                      <td className="p-4 text-gray-300 whitespace-nowrap text-center">
                        <i className="fas fa-map-pin text-gold-500/50 ml-1"></i> {s.address || 'غير محدد'}
                      </td>
                      <td className="p-4 text-center">{statusHtml}</td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => {
                            let cleanPhone = s.phone1?.replace(/\s+/g, '') || '';
                            if (cleanPhone.startsWith('0')) cleanPhone = '+20' + cleanPhone.substring(1);
                            else if (!cleanPhone.startsWith('+')) cleanPhone = '+20' + cleanPhone;

                            const msgBody = adminMessage.trim() ? `\n\n${adminMessage.trim()}\n\n` : '\n\n';
                            const fullMessage = `أهلاً بك ولي أمر الطالب/ة (${s.name})\nمعك إدارة مستر محب موسى.${msgBody}أتمنى لكم عام ملئ بالنجاح والتفوق`;

                            window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(fullMessage)}`, '_blank');
                          }}
                          className="bg-green-600/20 hover:bg-green-500 text-green-400 hover:text-white border border-green-500/50 w-10 h-10 rounded-full transition-all shadow-[0_0_10px_rgba(34,197,94,0.2)] flex items-center justify-center mx-auto"
                          title="مراسلة عبر واتساب">
                          <i className="fab fa-whatsapp text-xl"></i>
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <button onClick={() => setEditingStudent(s)} className="text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-600 border border-blue-500/20 hover:border-blue-500 w-9 h-9 rounded-full inline-flex items-center justify-center transition-all shadow-sm mx-auto" title="تعديل السجل">
                          <i className="fas fa-edit"></i>
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <button onClick={() => deleteStudent(s.id)} className="text-red-400 hover:text-white bg-red-500/10 hover:bg-red-600 border border-red-500/20 hover:border-red-500 w-9 h-9 rounded-full inline-flex items-center justify-center transition-all shadow-sm mx-auto" title="حذف السجل">
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan={12} className="p-8 text-center text-gray-500">لا يوجد طلاب مطابقين للبحث</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingStudent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-[#0a0f18] border border-gold-500/30 p-6 rounded-2xl w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">تعديل بيانات الطالب</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">الاسم</label>
                  <input type="text" className="modern-input w-full p-2" value={editingStudent.name || ''} onChange={e => setEditingStudent({ ...editingStudent, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">رقم التواصل (1)</label>
                  <input type="text" className="modern-input w-full p-2" value={editingStudent.phone1 || ''} onChange={e => setEditingStudent({ ...editingStudent, phone1: e.target.value })} />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">رقم التواصل (2)</label>
                  <input type="text" className="modern-input w-full p-2" value={editingStudent.phone2 || ''} onChange={e => setEditingStudent({ ...editingStudent, phone2: e.target.value })} />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">المرحلة</label>
                  <select className="modern-input w-full p-2 [&>option]:bg-luxury-900 [&>option]:text-white" value={editingStudent.stage || ''} onChange={e => setEditingStudent({ ...editingStudent, stage: e.target.value })}>
                    <option value="ابتدائي">ابتدائي</option>
                    <option value="إعدادي">إعدادي</option>
                    <option value="ثانوي">ثانوي</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">الصف</label>
                  <input type="text" className="modern-input w-full p-2" value={editingStudent.grade || ''} onChange={e => setEditingStudent({ ...editingStudent, grade: e.target.value })} />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">نظام الحضور</label>
                  <select className="modern-input w-full p-2 [&>option]:bg-luxury-900 [&>option]:text-white" value={editingStudent.attendanceMode || ''} onChange={e => setEditingStudent({ ...editingStudent, attendanceMode: e.target.value })}>
                    <option value="حضوري">حضوري</option>
                    <option value="أونلاين">أونلاين</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">المدرسة</label>
                  <input type="text" className="modern-input w-full p-2" value={editingStudent.schoolName || ''} onChange={e => setEditingStudent({ ...editingStudent, schoolName: e.target.value })} />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">الدرجة</label>
                  <input type="text" className="modern-input w-full p-2" value={editingStudent.finalGrade || ''} onChange={e => setEditingStudent({ ...editingStudent, finalGrade: e.target.value })} />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-400 text-sm mb-1">العنوان</label>
                  <input type="text" className="modern-input w-full p-2" value={editingStudent.address || ''} onChange={e => setEditingStudent({ ...editingStudent, address: e.target.value })} />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setEditingStudent(null)} className="px-4 py-2 text-gray-400 hover:text-white">إلغاء</button>
                <button onClick={saveEdit} className="btn-luxury px-6 py-2">حفظ التعديلات</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isAddingStudent && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm" dir="rtl">
          <div className="bg-[#0a0f18] border border-green-500/30 p-6 rounded-2xl w-full max-w-md shadow-[0_0_30px_rgba(34,197,94,0.15)] max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-user-plus text-green-400"></i> تسجيل طالب جديد مباشر
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">الاسم</label>
                  <input type="text" className="modern-input w-full p-2" value={newStudent.name} onChange={e => setNewStudent({ ...newStudent, name: e.target.value })} />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">رقم التواصل (1)</label>
                  <input type="text" className="modern-input w-full p-2" value={newStudent.phone1} onChange={e => setNewStudent({ ...newStudent, phone1: e.target.value })} />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">رقم التواصل (2)</label>
                  <input type="text" className="modern-input w-full p-2" value={newStudent.phone2} onChange={e => setNewStudent({ ...newStudent, phone2: e.target.value })} />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">المرحلة</label>
                  <select className="modern-input w-full p-2 [&>option]:bg-luxury-900 [&>option]:text-white" value={newStudent.stage} onChange={e => setNewStudent({ ...newStudent, stage: e.target.value })}>
                    <option value="">اختر المرحلة</option>
                    <option value="ابتدائي">ابتدائي</option>
                    <option value="إعدادي">إعدادي</option>
                    <option value="ثانوي">ثانوي</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">الصف</label>
                  <input type="text" className="modern-input w-full p-2" value={newStudent.grade} onChange={e => setNewStudent({ ...newStudent, grade: e.target.value })} />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">نظام الحضور</label>
                  <select className="modern-input w-full p-2 [&>option]:bg-luxury-900 [&>option]:text-white" value={newStudent.attendanceMode} onChange={e => setNewStudent({ ...newStudent, attendanceMode: e.target.value })}>
                    <option value="حضوري">حضوري</option>
                    <option value="أونلاين">أونلاين</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">المدرسة</label>
                  <input type="text" className="modern-input w-full p-2" value={newStudent.schoolName} onChange={e => setNewStudent({ ...newStudent, schoolName: e.target.value })} />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">الدرجة</label>
                  <input type="text" className="modern-input w-full p-2" value={newStudent.finalGrade} onChange={e => setNewStudent({ ...newStudent, finalGrade: e.target.value })} />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-gray-400 text-sm mb-1">العنوان</label>
                  <input type="text" className="modern-input w-full p-2" value={newStudent.address} onChange={e => setNewStudent({ ...newStudent, address: e.target.value })} />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={() => setIsAddingStudent(false)} className="px-4 py-2 text-gray-400 hover:text-white">إلغاء</button>
                <button onClick={saveNewStudent} className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-2 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all">إضافة للطابور</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

