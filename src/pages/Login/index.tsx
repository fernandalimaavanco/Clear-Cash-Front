import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../lib/axios';
import { LoginContainer, StyledForm } from './styles';
import logo from '../../../public/assets/logo.svg';
import { useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useContextSelector } from 'use-context-selector';
import { AlertContext } from '../../contexts/AlertContext';

const loginFormSchema = z.object({
    login: z
        .string()
        .min(1, { message: "Login deve ter pelo menos 1 caractere" })
        .max(255, { message: "Login deve ter no máximo 60 caracteres" }),
    password: z
        .string()
        .min(1, { message: "Senha deve ter pelo menos 1 caractere" }),
});

const registerFormSchema = z.object({
    name: z.string().min(1, { message: "Nome é obrigatório" }),
    login: z
        .string()
        .min(1, { message: "Login deve ter pelo menos 1 caractere" })
        .max(255, { message: "Login deve ter no máximo 60 caracteres" }),
    password: z
        .string()
        .min(8, { message: "Senha deve ter pelo menos 8 caracteres" })
        .regex(/[A-Z]/, { message: "Senha deve conter pelo menos uma letra maiúscula" })
        .regex(/[a-z]/, { message: "Senha deve conter pelo menos uma letra minúscula" })
        .regex(/[^A-Za-z0-9]/, { message: "Senha deve conter pelo menos um caractere especial" })
        .max(255, { message: "Senha deve ter no máximo 255 caracteres" }),
});

type loginFormInputs = z.infer<typeof loginFormSchema>;
type registerFormInputs = z.infer<typeof registerFormSchema>;

export function Login() {

    const configLogin = useContextSelector(AuthContext, (context) => context?.configLogin);
    const showAlert = useContextSelector(AlertContext, (context) => context?.showAlert);

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const {
        control: controlLogin,
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { isSubmitting, errors },
        reset: resetLoginForm,
    } = useForm<loginFormInputs>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: { login: '', password: '' },
    });

    const {
        control: controlRegister,
        register: registerRegister,
        handleSubmit: handleRegisterSubmit,
        formState: { errors: registerErrors },
        reset: resetRegisterForm,
    } = useForm<registerFormInputs>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: { name: '', login: '', password: '' },
    });

    async function handleLogin(data: loginFormInputs) {
        const { login, password } = data

        try {

            const response = await api.post('/login', { login, password })

            if (response.status === 200) {

                showAlert("Bem vindo ao Clear Cash!", 'success')
                configLogin(response.data.token);

                navigate('/transactions');
            } else {
                showAlert(response.data.message, 'error')
            }
        } catch (error: any) {
            showAlert(error.response.data.message, 'error')
        }

        resetLoginForm({ login: '', password: '' });
    }

    const handleRegister = async (data: registerFormInputs) => {
        const { name, login, password } = data;

        try {
            const response = await api.post('/users', { name, login, password })

            if (response.status === 201) {
                showAlert(response.data.message || 'Usuário registrado com sucesso!', 'success')
                setIsLogin(true)
                resetRegisterForm({ name: '', login: '', password: '' })
                resetLoginForm({ login: '', password: '' })
            } else {
                showAlert(response.data.message || 'Erro ao registrar usuário!', 'error')
            }
        } catch (error: any) {
            showAlert(error.response.data.message, 'error')
        }
    };

    return (
        <LoginContainer>
            <img src={logo} alt="Logo" />
            <h1>{isLogin ? 'Login' : 'Registrar'}</h1>

            <div>
                <StyledForm
                    onSubmit={isLogin ? handleLoginSubmit(handleLogin) : handleRegisterSubmit(handleRegister)}
                >
                    {isLogin && (
                        <div className="login-form">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Login"
                                    required
                                    {...registerLogin('login')}
                                />
                                {errors.login && <p>{errors.login.message}</p>}
                            </div>

                            <div>
                                <div style={{ position: 'relative' }}>
                                    <Controller
                                        name="password"
                                        control={controlLogin}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Senha"
                                                required
                                            />
                                        )}
                                    />
                                    <span
                                        onClick={() => setShowPassword((prevState) => !prevState)}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '10px',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {showPassword ? (
                                            <button type="button">🙈</button>
                                        ) : (
                                            <button type="button">👁️</button>
                                        )}
                                    </span>
                                </div>
                                {errors.password && <p>{errors.password.message}</p>}
                            </div>

                            <button type="submit" disabled={isSubmitting}>
                                {isLogin ? 'Entrar' : 'Registrar'}
                            </button>
                            <button type="button" onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? 'Registre-se' : 'Já tem uma conta? Entrar'}
                            </button>
                        </div>
                    )}

                    {!isLogin && (
                        <div className="register-form">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    required
                                    {...registerRegister('name')}
                                />
                                {registerErrors.name && <p>{registerErrors.name.message}</p>}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Login"
                                    required
                                    {...registerRegister('login')}
                                />
                                {registerErrors.login && <p>{registerErrors.login.message}</p>}
                            </div>

                            <div>
                                <div style={{ position: 'relative' }}>
                                    <Controller
                                        name="password"
                                        control={controlRegister}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Senha"
                                                required
                                            />
                                        )}
                                    />
                                    <span
                                        onClick={() => setShowPassword((prevState) => !prevState)}
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            right: '10px',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {showPassword ? (
                                            <button type="button">🙈</button>
                                        ) : (
                                            <button type="button">👁️</button>
                                        )}
                                    </span>
                                </div>
                                {registerErrors.password && <p>{registerErrors.password.message}</p>}
                            </div>

                            <button type="submit" disabled={isSubmitting}>
                                {isLogin ? 'Entrar' : 'Registrar'}
                            </button>
                            <button type="button" onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? 'Registre-se' : 'Já tem uma conta? Entrar'}
                            </button>
                        </div>
                    )}
                </StyledForm>
            </div>
        </LoginContainer>
    );
}
