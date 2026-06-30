'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

export default function SwiperGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('reviews');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          window.dispatchEvent(new CustomEvent('playMusic'));
          if (containerRef.current) observer.unobserve(containerRef.current);
        }
      });
    }, { threshold: 0.1, rootMargin: '200px' });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const academyImages = Array.from({ length: 13 }, (_, i) => ({
    src: `/assets/academy/${i + 1}.jpeg`,
    caption: 'صور الأكاديمية والتعلم التفاعلي',
    icon: 'fa-laptop-code',
    color: 'text-gold-500',
    category: 'academy'
  }));

  const momentsImages = Array.from({ length: 15 }, (_, i) => ({
    src: `/assets/moments/${i + 1}.jpeg`,
    caption: 'لحظات لا تنسى',
    icon: 'fa-heart',
    color: 'text-yellow-400',
    category: 'moments'
  }));

  const reviewsImages = Array.from({ length: 16 }, (_, i) => ({
    src: `/assets/reviews/${i + 1}.jpeg`,
    caption: 'آراء طلابنا الأعزاء',
    icon: 'fa-star',
    color: 'text-yellow-400',
    category: 'reviews'
  }));

  const allImages = [...reviewsImages, ...momentsImages, ...academyImages];

  return (
    <section className="py-20 relative overflow-hidden" id="gallery" ref={containerRef}>
      <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none transform-gpu"></div>
      <div className="hidden md:block absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none transform-gpu"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4 flex items-center justify-center gap-4">
          ألبوم الأكاديمية <i className="fas fa-camera text-gold-500"></i>
        </h2>
        <p className="text-gray-400 mb-12">اسحب لمشاهدة الصور والمزيد من ذكرياتنا</p>

        <style jsx global>{`
          .gallery-swiper .swiper-slide {
            width: 280px !important;
            height: 380px !important;
            border-radius: 1.5rem !important;
            overflow: hidden !important;
            border: 2px solid rgba(212, 175, 55, 0.3) !important;
            position: relative !important;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5) !important;
            background-color: #0a0a0a !important;
          }
          @media (min-width: 768px) {
            .gallery-swiper .swiper-slide {
              width: 350px !important;
              height: 450px !important;
              box-shadow: 0 15px 35px rgba(0,0,0,0.8) !important;
            }
          }
          .gallery-swiper .swiper-slide img {
            display: block !important;
            width: 100% !important;
            height: 100% !important;
            transition: transform 0.5s ease !important;
          }
          .gallery-swiper .swiper-slide-active img:not(.review-img) {
            transform: scale(1.05) !important;
          }
          .gallery-swiper .swiper-slide-active img.review-img {
            transform: scale(1) !important;
            object-fit: contain !important;
            background-color: #0a0a0a !important;
          }
          .gallery-swiper .swiper-slide img.review-img {
            object-fit: contain !important;
            background-color: #0a0a0a !important;
          }
          .slide-caption {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(0deg, rgba(5,7,10,0.95), transparent);
            padding: 40px 20px 20px;
            text-align: center;
            color: white;
            font-weight: 800;
            text-shadow: 0 2px 4px rgba(0,0,0,0.8);
            border-bottom-left-radius: 1.4rem;
            border-bottom-right-radius: 1.4rem;
            transform: translateY(100%);
            transition: transform 0.3s ease;
          }
          .gallery-swiper .swiper-slide-active .slide-caption {
            transform: translateY(0);
          }
        `}</style>
        {isVisible ? (
          <>
            <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={500}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 150,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full max-w-5xl mx-auto pb-12 pt-5 gallery-swiper"
            onSlideChange={(swiper) => {
              window.dispatchEvent(new CustomEvent('playMusic'));
              setCurrentCategory(allImages[swiper.activeIndex]?.category || 'reviews');
            }}
            onTouchStart={() => window.dispatchEvent(new CustomEvent('playMusic'))}
          >
            {allImages.map((item, index) => {
              const isReview = item.category === 'reviews';
              return (
                <SwiperSlide
                  key={index}
                  className="my-slide"
                  data-swiper-autoplay={isReview ? 6000 : 3000}
                >
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    sizes="(max-width: 768px) 280px, 350px"
                    quality={50}
                    className={`${isReview ? 'review-img object-contain bg-[#0a0a0a]' : 'object-cover'}`}
                  />
                  <div className="slide-caption font-tajawal text-sm md:text-base">
                    <i className={`fas ${item.icon} ${item.color} mr-2 ml-1`}></i>
                    {item.caption}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
          
          <div className="mt-8 h-20 flex items-center justify-center transition-all duration-500">
            {currentCategory === 'reviews' && (
              <div className="animate-bounce flex flex-col items-center">
                <span className="text-gold-500 font-bold text-lg mb-2 tracking-wider">انتظر في التالي.. لحظات لا تنسى</span>
                <i className="fas fa-arrow-left text-4xl text-gold-500 drop-shadow-[0_0_15px_rgba(212,175,55,1)]"></i>
              </div>
            )}
            {currentCategory === 'moments' && (
              <div className="animate-bounce flex flex-col items-center">
                <span className="text-gold-500 font-bold text-lg mb-2 tracking-wider">المزيد من التشويق.. صور الأكاديمية</span>
                <i className="fas fa-arrow-left text-4xl text-gold-500 drop-shadow-[0_0_15px_rgba(212,175,55,1)]"></i>
              </div>
            )}
          </div>
          </>
        ) : (
          <div className="w-full max-w-5xl mx-auto h-[450px] flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

    </section>
  );
}
