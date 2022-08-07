import { Typography, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Link } from 'next/link';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

export default function NavBar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [active, setActive] = useState(1);

  useEffect(() => {
    const path = router?.pathname;
    if (path.indexOf('/blogs') !== -1) {
      setActive(2);
    } else if (path.indexOf('/createBlog') !== -1) {
      setActive(3);
    } else if (path.indexOf('/contact') !== -1) {
      setActive(4);
    } else if (path.indexOf('/user') !== -1) {
      setActive(5);
    } else if (path.indexOf('/blog') !== -1) {
      setActive(0);
    } else {
      setActive(1);
    }
  }, [router]);

  const logoutHandler = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="navbar">
      <Typography variant="h4" className="title">
        Blogs<span className="span-title">Hub</span>
      </Typography>
      <div>
        <ul className="ul">
          <li
            onClick={(e) => router.push('/')}
            className={active === 1 ? `li-active` : 'li'}
          >
            Home
          </li>
          <li
            onClick={(e) => router.push('/blogs')}
            className={active === 2 ? `li-active` : 'li'}
          >
            Blogs
          </li>
          {status === 'authenticated' ? (
            <li
              onClick={(e) => router.push('/createBlog')}
              className={active === 3 ? `li-active` : 'li'}
            >
              Create Blog
            </li>
          ) : null}
          <li
            onClick={(e) => router.push('/contact')}
            className={active === 4 ? `li-active` : 'li'}
          >
            Contact Us
          </li>
          {status === 'authenticated' ? (
            <li
              onClick={(e) => router.push('/user')}
              className={active === 5 ? `li-active` : 'li'}
            >
              Profile
            </li>
          ) : null}
          {status === 'authenticated' ? (
            <li onClick={logoutHandler} className="li">
              <Button className="btn">Logout</Button>
            </li>
          ) : (
            <li onClick={(e) => router.push('/login')} className="li">
              <Button className="btn">Log In</Button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
