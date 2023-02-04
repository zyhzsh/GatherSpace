import { IconButton } from '@material-tailwind/react';
import { useAuth0 } from '@auth0/auth0-react';
import { PlayCircleIcon } from '@heroicons/react/24/solid';
const Login = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-cover bg-[url('/img/bg.jpg')]">
      <IconButton
        variant="text"
        color="gray"
        className="animate-bounce z-20"
        onClick={async () => {
          await loginWithPopup();
        }}
      >
        <PlayCircleIcon className="w-6 " />
      </IconButton>
    </div>
  );
};

export default Login;
