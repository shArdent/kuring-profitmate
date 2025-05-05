import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <AuthLayout title="Masuk dengan Akun ProfiteMate">
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;