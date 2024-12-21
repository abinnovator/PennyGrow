import withSession from '@/app/withSession';  // Adjust path based on actual location
import TransactionModal from '@/components/AddTransactionButton';
import PaymentsTable from '@/components/RecentTransactions';
import React from 'react';

const TransactionHistory = () => {
  return (
    <div className='home'>
      <div className='home-content'>
        <h1>Transaction History</h1>
        {/* If you want to enable the TransactionModal, uncomment the line below */}
        {/* <TransactionModal /> */}
        <PaymentsTable type='view-transactions-page' />
      </div>
    </div>
  );
};

export default withSession(TransactionHistory);
