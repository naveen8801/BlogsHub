import NavBar from '../NavBar/NavBar';
import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,900&family=Source+Sans+Pro:wght@300;400;600;700;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <NavBar />
      <main>{children}</main>
    </div>
  );
}
