import HeroSection from '@/components/HeroSection';
import SwiperGallery from '@/components/SwiperGallery';
import BookingForm from '@/components/BookingForm';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <HeroSection />

      <SwiperGallery />

      <section className="py-20 relative bg-obsidian" id="booking-section">
        <div className="container mx-auto px-4">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
