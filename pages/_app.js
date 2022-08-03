import Layout from '../components/Layout/Layout';
import '../styles/index.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ToastContainer position="top-right" />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
