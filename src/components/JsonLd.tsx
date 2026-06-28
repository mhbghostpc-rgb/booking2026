'use client';

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://mrmohebmousabooking2026.vercel.app/#organization",
        "name": "أكاديمية مستر محب موسى",
        "url": "https://mrmohebmousabooking2026.vercel.app/",
        "logo": "https://mrmohebmousabooking2026.vercel.app/assets/4.jpeg",
        "description": "أكاديمية مستر محب موسى تقدم التطور التعليمي الفريد للغة الإنجليزية. منصة رائدة متخصصة في الحجز والتدريس باستخدام تقنيات حديثة.",
        "founder": {
          "@id": "https://mrmohebmousabooking2026.vercel.app/#person"
        },
        "sameAs": []
      },
      {
        "@type": "Person",
        "@id": "https://mrmohebmousabooking2026.vercel.app/#person",
        "name": "محب موسى",
        "jobTitle": "مدرس لغة إنجليزية وخبير تعليمي",
        "url": "https://mrmohebmousabooking2026.vercel.app/",
        "image": "https://mrmohebmousabooking2026.vercel.app/assets/4.jpeg",
        "description": "خبير في تدريس اللغة الإنجليزية ومؤسس الأكاديمية التي تقود التطور التعليمي الفريد."
      },
      {
        "@type": "WebSite",
        "@id": "https://mrmohebmousabooking2026.vercel.app/#website",
        "url": "https://mrmohebmousabooking2026.vercel.app/",
        "name": "أكاديمية مستر محب موسى",
        "description": "الجيل القادم للتعليم والحجز في اللغة الإنجليزية. اكتشف التطور التعليمي الفريد.",
        "publisher": {
          "@id": "https://mrmohebmousabooking2026.vercel.app/#organization"
        },
        "potentialAction": {
          "@type": "ReserveAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://mrmohebmousabooking2026.vercel.app/booking"
          },
          "result": {
            "@type": "EducationalOccupationalCredential",
            "name": "حجز كورسات إنجليزي"
          }
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
