import HeaderBox from '@/components/HeaderBox'
import React from 'react'
import { getLoggedInUser, getUserInfo } from '@/lib/actions/user.actions';

const budgdetsDashboard = async () => {
     const loggedIn = await getLoggedInUser();
      
      // Ensure the loggedIn object and its nested properties exist
      if (!loggedIn || !loggedIn.targets?.[0]?.userId) {
        return <div>Error: Unable to retrieve user data.</div>; // Handle error case
      }
      
      const userInfo = await getUserInfo({ userId: loggedIn.targets[0].userId });
  return (
    <div className='pt-10 px-10'>
        <HeaderBox
            type='greeting'
            title='Welcome'
            user={loggedIn?.name || 'Guest'}
            subtext="From textbooks to savings accounts. Let's make it happen."
          />
    </div>
  )
}

export default budgdetsDashboard