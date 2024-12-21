'use client'
import CheckIcon from '@/assets/check.svg';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Get started for free",
    popular: true,
    inverse: false,
    features: [
      "Basic Transactions Dashboard",
      "Unlimited transaction storage",
      "Access to educational resources - Coming Soon",
      "Financial goal tracking - Coming Soon",
      // "Budget templates - Coming Soon",
    ],
  },
  {
    title: "Pro",
    monthlyPrice: 399,
    buttonText: "Coming soon",
    popular: false,
    inverse: true,
    features: [
      "Collaborative projects (Up to 20 members)",
      "Unlimited goals and transactions",
      "Custom budget templates",
      "Exclusive webinars",
      "Priority support",
      "Monthly financial reports",
    ],
  },
  {
    title: "Master",
    monthlyPrice: 799,
    buttonText: "Coming soon",
    popular: false,
    inverse: false,
    features: [
      "Advanced Transactions Dashboard",
      "Unlimited goals and transactions",
      "Custom financial fields",
      "Detailed analytics and reports",
      "Customizable goal tracking",
      "Advanced security features",
      "Exclusive access to competitions and events",
    ],
  },
];



export const Pricing = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        
        <div className='section-heading'>
          <h2 className="section-title">Pricing</h2>
          <p className="section-description mt-5">Free forever. Upgrade to get access to exculsive features.</p>
        </div>

        <div className='flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center'>
          {pricingTiers.map(({title, monthlyPrice, buttonText, popular, inverse, features}) => (
            <div className={twMerge('card',inverse === true && 'border-black bg-black text-white') }key={title}>
              <div className='flex justify-between'>
                <h3 className={twMerge('text-lg font-bold text-black/50',inverse === true && 'border-black bg-black text-white')}>{title}</h3>
                {popular === true && (
                  <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20">
                    <motion.span className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF)] [background-size:200%] text-transparent bg-clip-text font-medium"
                    animate={{
                      backgroundPositionX: '100%'
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                      repeatType: 'loop'
                    }}>
                      Best Value
                    </motion.span>
                  </div>
                )}
              
              </div>

              <div className='flex items-baseline gap-1 mt-[30px]'>
                <span className='text-4xl font-bold tracking-tighter leading-none'>₹{monthlyPrice}</span>
                <span className='tracking-tighter font-bold text-black/50'>/month</span>
              </div>

              <button className={twMerge('btn btn-primary w-full mt-[30px]', inverse === true && 'bg-white text-black')}>{buttonText}</button>
              <ul className='flex-col gap-5 mt-8'>
                {features.map((feature) => (
                  <li className='text-sm flex items-center gap-4' key={feature}>
                    <CheckIcon className='h-6 w-6' />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
        </div>
      </div>
    </section>
  );
};
