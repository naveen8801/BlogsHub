import { Typography, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Link } from 'next/link';

export default function NavBar() {
  const router = useRouter();
  const [active, setActive] = useState(1);

  useEffect(() => {
    const path = router?.pathname;
    if (path.indexOf('/blogs') !== -1) {
      setActive(2);
    } else if (path.indexOf('/contact') !== -1) {
      setActive(3);
    } else if (path.indexOf('/blog') !== -1) {
      setActive(0);
    } else {
      setActive(1);
    }
  }, [router]);

  return (
    <div className="navbar">
      <Typography variant="h4" className="title">
        Blog<span className="span-title">Hub</span>
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
          <li
            onClick={(e) => router.push('/contact')}
            className={active === 3 ? `li-active` : 'li'}
          >
            Contact Us
          </li>
          <li onClick={(e) => router.push('/login')} className="li">
            <Button className="btn">Sign In</Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
