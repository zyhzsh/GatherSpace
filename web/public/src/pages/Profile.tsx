import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-tailwind/react';
import React from 'react';

const Profile = () => {
  const { user, getIdTokenClaims, getAccessTokenSilently } = useAuth0();

  return (
    <>
      <Button
        onClick={async () => {
          const data = await getIdTokenClaims();
          console.log(data);
        }}
      >
        aaa
      </Button>
      <Button
        onClick={async () => {
          const data = await getAccessTokenSilently();
          console.log(data);
        }}
      >
        bbb
      </Button>
    </>
  );
};

export default Profile;
