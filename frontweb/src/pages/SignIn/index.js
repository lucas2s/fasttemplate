import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import { GoSignIn } from 'react-icons/go';
import { MdPermIdentity } from 'react-icons/md';

import Input from '~/components/SimpleInput';
import { Form, DivButton, SighInButton, RegisterButton } from './styles';

import { signInRequest } from '~/store/modules/auth/actions';
import history from '~/services/history';

import logotipo from '~/assets/logo.png';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Insira um e-mail válido')
          .required('O e-mail é obrigatório'),
        password: Yup.string().min(6).required('A senha é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { email, password } = data;

      dispatch(signInRequest(email, password));
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }

  return (
    <>
      <img src={logotipo} alt="logotipo" />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          label="SEU E-MAIL"
          placeholder="Seu e-mail"
        />
        <Input
          name="password"
          type="password"
          label="SUA SENHA"
          placeholder="Sua senha"
        />
        <SighInButton
          type="submit"
          title="Entrar"
          loading={loading}
          IconButton={GoSignIn}
        />
      </Form>
      <DivButton>
        <RegisterButton
          type="submit"
          title="Cadastrar"
          loading={loading}
          IconButton={MdPermIdentity}
          onClick={() => {
            history.push('/signup');
          }}
        />
      </DivButton>
    </>
  );
}
