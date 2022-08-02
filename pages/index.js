import Head from 'next/head';
import { Typography } from '@material-ui/core';

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
      </div>
      <div className="featured-div">
        <Typography variant="h4" className="heading">
          Featured Blogs
        </Typography>
        <div className="featured-content">
          <em>No Content </em>
        </div>
      </div>
    </div>
  );
}
