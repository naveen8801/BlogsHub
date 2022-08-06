import Head from 'next/head';
import { Typography } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="home">
      <Head>
        <title>BlogsHub | Home</title>
      </Head>
      <div className="intro">
        <Typography className="intro-text">
          Welcome to <strong>BlogsHub</strong>. Awsome place to write and share
          blogs. Login to start writing your blogs
        </Typography>
        <Link href="https://github.com/naveen8801/BlogsHub">
          <a target="__blank">
            <GitHub />
          </a>
        </Link>
      </div>
      <div className="wrapper">
        <div className="img-wrapper"></div>
      </div>
    </div>
  );
}
