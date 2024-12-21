import FeaturesSection from '@/components/Features';
import HeroSection from '@/components/Hero';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

const LandingPage = async () => {
  const loggedIn = await getLoggedInUser();

  if (loggedIn) {
    redirect('/dashboard');
  }

  return (
    <div>
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};

export default LandingPage; // Avoid wrapping withSession unless necessary
