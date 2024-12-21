import logo from '@/assets/logosaas.png';
import Image from 'next/image';
import SocialYoutube from '@/assets/social-youtube.svg'

export const Footer = () => {
  return (
    <footer className='bg-black text-[#BCBCBC] text-sm py-10 text-center'>
      <div className="container">
        <div className="inline-flex relative before:content-[''] before:w-full before:h-full before:absolute before:blur before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)]">
          <Image src={logo} alt='PennyGrow logo' height={40} className='relative' />      
        </div>
          
        <nav className='flex flex-col md:flex-row justify-center gap-6 mt-6'>
          <a href='#'>About</a>
          <a href='#'>Features</a>
          <a href='#'>Customers</a>
          <a href='#'>Help</a>
          {/* <a href='#'></a> */}
        </nav>
        <div className='flex justify-center gap-6 mt-6'>
          <a href='https://www.youtube.com/@PennyGrow-i1v' target='_blank'><SocialYoutube className='' /></a>
        </div>
        <p className='mt-6'>&copy; 2024 PennyGrow, All rights reserved</p>
      </div>
    </footer>
  );
};
