// withSession.tsx
import React from 'react';
import { getSessionClient } from './sessionHandler';

const withSession = (WrappedComponent: React.ComponentType<any>) => {
  const HOC = (props: any) => <WrappedComponent {...props} />;
  
  HOC.getServerSideProps = async (context: any) => {
    try {
      const account = await getSessionClient();
      const userData = await account.get();

      return {
        props: {
          user: userData,
        },
      };
    } catch (error) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  };

  return HOC;
};

export default withSession;