import Layout from '../components/Layout/Layout';
import '../styles/index.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
