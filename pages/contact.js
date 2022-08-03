import Head from 'next/head';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@material-ui/core';

export default function ContactUs() {
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!email) {
      toast.error(`Email is required`);
      return;
    }
    if (!text) {
      toast.error(`Plese enter your query`);
      return;
    }
    const data = { email: email, text: text };
    console.log(data);
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
        <Button className="btn" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}
