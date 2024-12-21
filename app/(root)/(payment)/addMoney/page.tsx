import AddDepositFloat from '@/components/AddDepositFloat';
import HeaderBox from '@/components/HeaderBox';
import { getLoggedInUser, getUserInfo } from '@/lib/actions/user.actions';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import withSession from '@/app/withSession';

const PaymentTransfer = async () => {
  const loggedIn = await getLoggedInUser();
  
  if (!loggedIn || !loggedIn.targets?.[0]?.userId) {
    return <div>Error: Unable to retrieve user data.</div>;  // Handle cases where user or target info is not available
  }

  const userInfo = await getUserInfo({ userId: loggedIn.targets[0].userId });
  
  return (
    <div className='home-content'>
      <header className='home-header'>
        <HeaderBox
          type='greeting'
          title='Welcome'
          user={loggedIn?.name || 'Guest'}
          subtext="Update your balance" 
        />
        <TotalBalanceBox
          accounts={userInfo?.accounts || []}  // Provide accounts or an empty array
          totalBanks={userInfo?.totalBanks || 0}  // Handle possible undefined totalBanks
          totalCurrentBalance={userInfo?.balance || 0}  // Provide default value for balance
        />
        <AddDepositFloat />
      </header>
    </div>
  );
}

export default withSession(PaymentTransfer);
