import { useState, useEffect } from 'react';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Avatar,
} from '@material-tailwind/react';
import {
  AcademicCapIcon,
  HomeIcon,
  Bars3Icon,
  XMarkIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

interface NavLinkItem {
  link: string;
  name: string;
  icon: any;
}

const Navlinks: NavLinkItem[] = [
  {
    link: '/',
    name: 'Memories',
    icon: <HomeIcon />,
  },
  {
    link: '/events',
    name: 'Events',
    icon: <ChatBubbleBottomCenterTextIcon />,
  },
  {
    link: '/favorites',
    name: 'Favorites',
    icon: <AcademicCapIcon />,
  },
];

export default function Header() {
  const [openNav, setOpenNav] = useState(false);
  const { logout, user } = useAuth0();

  const currentPage = useLocation();
  useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = () => {
    return (
      <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        {Navlinks.map((link, _) => (
          <Typography
            as="li"
            variant="small"
            key={_}
            className={`${
              currentPage.pathname === link.link ? ' font-extrabold' : ''
            }`}
          >
            <Link
              to={link.link}
              className="flex items-center hover:bg-violet-600 "
            >
              {link.name}
            </Link>
          </Typography>
        ))}
      </ul>
    );
  };
  return (
    <Navbar className="mt-4 mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          variant="small"
          className="cursor-pointer py-1.5 font-normal"
        >
          <Link to="profile">
            <Avatar
              src={user?.picture}
              size="md"
              referrerPolicy="no-referrer"
            />
          </Link>
        </Typography>
        <div className="hidden lg:block">{navList()}</div>
        <Button
          variant="gradient"
          size="sm"
          className="hidden lg:inline-block"
          onClick={() => logout()}
        >
          <span>Log out</span>
        </Button>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="w-6" />
          ) : (
            <Bars3Icon className="w-6" />
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto text-black">
          {navList()}

          <Button
            variant="gradient"
            size="sm"
            fullWidth
            className="mb-2"
            onClick={() => logout()}
          >
            <span>Log out</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}
