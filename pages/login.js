import { Card } from '@material-ui/core';
import Head from 'next/head';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@material-ui/core';

export default function LoginSignin() {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleSubmitSignIn = async () => {
    setLoading(true);
    const { email, password } = signInData;
    if (!email.trim()) {
      toast.error(`Email is required`);
      setLoading(false);
      return;
    }
    if (!password.trim()) {
      toast.error(`Plese enter your query`);
      setLoading(false);
      return;
    }
    if (!validateEmail(email.trim())) {
      toast.error(`Plese enter valid email`);
      setLoading(false);
      return;
    }
    if (password.trim().length < 6) {
      toast.error(`Password length must be between 6 and 16 characters`);
      setLoading(false);
      return;
    }
    const data = { email: email.trim(), password: password.trim() };
    console.log(data);
    // try {
    //   const res = await axios.post('/api/contact-us', data);
    //   if (res.data) {
    //     toast.success(res.data.msg);
    //   }
    // } catch (err) {
    //   toast.error(err.message);
    // }
    setLoading(false);
  };

  const handleSubmitSignUp = async () => {
    setLoading(true);
    const { name, email, password } = signUpData;
    if (!name) {
      toast.error(`Name is required`);
      setLoading(false);
      return;
    }
    if (!email.trim()) {
      toast.error(`Email is required`);
      setLoading(false);
      return;
    }
    if (!password.trim()) {
      toast.error(`Plese enter your query`);
      setLoading(false);
      return;
    }
    if (!validateEmail(email.trim())) {
      toast.error(`Plese enter valid email`);
      setLoading(false);
      return;
    }
    if (password.trim().length < 6) {
      toast.error(`Password length must be between 6 and 16 characters`);
      setLoading(false);
      return;
    }
    const data = { name: name, email: email.trim(), password: password.trim() };
    console.log(data);
    // try {
    //   const res = await axios.post('/api/contact-us', data);
    //   if (res.data) {
    //     toast.success(res.data.msg);
    //   }
    // } catch (err) {
    //   toast.error(err.message);
    // }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (current === 0) {
      setSignInData({ ...signInData, [name]: value });
    } else {
      setSignUpData({ ...signUpData, [name]: value });
    }
  };

  console.log(signUpData);

  return (
    <div className="login">
      <Head>
        <title>BlogsHub | Login</title>
      </Head>
      <Card className="modal">
        <div className="switcher">
          <Button
            className={current === 0 ? 'btn-active' : 'btn'}
            onClick={(e) => setCurrent(0)}
          >
            Sign In
          </Button>
          <Button
            onClick={(e) => setCurrent(1)}
            className={current === 1 ? 'btn-active' : 'btn'}
          >
            Sign Up
          </Button>
        </div>
        {current === 0 ? (
          <form className="form">
            <input
              className="input"
              type="text"
              placeholder="Email"
              name="email"
              value={signInData.email}
              onChange={handleChange}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={signInData.password}
            />
            <Button className="btn" onClick={handleSubmitSignIn}>
              Sign In
            </Button>
          </form>
        ) : (
          <form className="form">
            <input
              className="input"
              type="text"
              placeholder="Fullname"
              name="name"
              value={signUpData.name}
              onChange={handleChange}
            />
            <input
              className="input"
              type="text"
              placeholder="Email"
              name="email"
              value={signUpData.email}
              onChange={handleChange}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={signUpData.password}
            />
            <Button className="btn" onClick={handleSubmitSignUp}>
              Sign Up
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
