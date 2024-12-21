import TransactionModal from '@/components/AddTransactionButton';
import HeaderBox from '@/components/HeaderBox';
import PaymentsTable from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import { getLoggedInUser, getUserInfo } from '@/lib/actions/user.actions';
import withSession from '@/app/withSession'; // Adjust import if necessary

const Home = async () => {
  const loggedIn = await getLoggedInUser();
  
  // Ensure the loggedIn object and its nested properties exist
  if (!loggedIn || !loggedIn.targets?.[0]?.userId) {
    return <div>Error: Unable to retrieve user data.</div>; // Handle error case
  }

  const userInfo = await getUserInfo({ userId: loggedIn.targets[0].userId });

  // Log user data for debugging (can be removed in production)
  console.log(loggedIn);
  console.log(loggedIn.targets[0].userId);
  console.log(userInfo);
  
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type='greeting'
            title='Welcome'
            user={loggedIn?.name || 'Guest'}
            subtext="From textbooks to savings accounts. Let's make it happen."
          />
          <TotalBalanceBox 
            accounts={userInfo?.accounts || []}  // Use empty array as default if accounts data is missing
            totalBanks={userInfo?.totalBanks || 1}  // Fallback to 1 if totalBanks data is missing
            totalCurrentBalance={userInfo?.balance || 0}  // Use default 0 for balance
          />
        </header>
        
        <PaymentsTable type='home-page' />
      </div>

      <RightSidebar
        user={loggedIn}
        transactions={userInfo?.transactions || []}  // Default empty array if transactions are missing
        banks={[
          { currentBalance: userInfo?.balance || 0 }, 
          { currentBalance: userInfo?.balance || 0 }  // Fallback to 0 if balance is missing
        ]}
      />
    </section>
  );
};

export default withSession(Home);
