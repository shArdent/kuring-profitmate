import React from 'react';
import AuthLayout from '../layouts/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <AuthLayout title="Buat Akun ProfiteMate">
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;