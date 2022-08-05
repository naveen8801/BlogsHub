import Head from 'next/head';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@material-ui/core';
import axios from 'axios';

export default function ContactUs() {
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!email) {
      toast.error(`Email is required`);
      setLoading(false);
      return;
    }
    if (!text) {
      toast.error(`Plese enter your query`);
      setLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      toast.error(`Plese enter valid email`);
      setLoading(false);
      return;
    }
    const data = { email: email, query: text };
    try {
      const res = await axios.post('/api/contact-us', data);
      if (res.data) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="contact">
      <Head>
        <title>BlogsHub | Contact Us</title>
      </Head>
      <form className="form">
        <input
          className="input"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
        <textarea
          className="text-area"
          placeholder="Type you query here."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <Button disabled={loading} className="btn" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}
