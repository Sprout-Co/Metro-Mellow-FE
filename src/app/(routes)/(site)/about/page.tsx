import { Metadata } from 'next';
import AboutHero from './_components/AboutHero/AboutHero';
import OurStory from './_components/OurStory/OurStory';
import OurValues from './_components/OurValues/OurValues';
import TeamSection from './_components/TeamSection/TeamSection';
import Statistics from './_components/Statistics/Statistics';
import AboutCTA from './_components/AboutCTA/AboutCTA';
import StorySection from './_components/StorySection/StorySection';
import VideoSection from './_components/VideoSection/VideoSection';
import ImpactSection from './_components/ImpactSection/ImpactSection';

export const metadata: Metadata = {
  title: 'About Metro Mellow | Our Story and Values',
  description: 'Learn about Metro Mellow\'s mission to transform home services with quality, reliability, and exceptional customer care.',
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <StorySection />
      <VideoSection />
      <ImpactSection />
      {/* <AboutHero />
      <OurStory />
      <OurValues />
      <TeamSection />
      <Statistics />
      <AboutCTA /> */}
    </main>
  );
}