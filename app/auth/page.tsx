'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, EyeSlashIcon, CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type AuthMode = 'login' | 'register';

export default function AuthPage() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<AuthMode>('login');

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam === 'register') setMode('register');
  }, [searchParams]);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLoginData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRegisterData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); console.log('Login:', loginData); }, 2000);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) { alert('Password tidak cocok!'); return; }
    if (!acceptTerms) { alert('Harap setujui syarat dan ketentuan!'); return; }
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); console.log('Register:', registerData); }, 2000);
  };

  const passwordStrength = (password: string) => {
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  };
  const strength = passwordStrength(registerData.password);

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    const url = new URL(window.location.href);
    newMode === 'register' ? url.searchParams.set('mode', 'register') : url.searchParams.delete('mode');
    window.history.pushState({}, '', url.toString());
  };

  const spring = { type: 'spring' as const, stiffness: 280, damping: 28 };

  const inputClass =
    'w-full px-4 py-3 border border-gray-200 rounded-xl font-dm-sans text-navy placeholder-gray-400 focus:border-orange focus:ring-4 focus:ring-orange/15 outline-none transition-all duration-200';

  return (
    <div className="min-h-screen flex overflow-hidden relative bg-white">

      {/* ─── LEFT PANEL: sliding navy background ─── */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-1/2 overflow-hidden z-0">
        {/* Login panel */}
        <motion.div
          animate={{ x: mode === 'login' ? '0%' : '-100%' }}
          transition={spring}
          className="absolute inset-0 bg-gradient-to-br from-[#0f1f3d] via-[#132347] to-[#0d1b34]"
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(45deg, #f97316 1px, transparent 1px), linear-gradient(-45deg, #f97316 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <NavyContent
            icon={
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            }
            title={<>Kelola Visa Anda<br /><span className="text-orange">Dengan Mudah</span></>}
            subtitle="Platform terpercaya untuk mengurus visa, sponsor letter, dan kebutuhan perjalanan internasional Anda"
            stats={[
              { icon: 'check', label: 'Proses Cepat' },
              { icon: 'lock', label: 'Aman Terpercaya' },
              { icon: 'bolt', label: '24/7 Support' },
            ]}
          />
        </motion.div>

        {/* Register panel */}
        <motion.div
          animate={{ x: mode === 'register' ? '0%' : '100%' }}
          transition={spring}
          className="absolute inset-0 bg-gradient-to-br from-[#0f1f3d] via-[#132347] to-[#0d1b34]"
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(45deg, #f97316 1px, transparent 1px), linear-gradient(-45deg, #f97316 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <NavyContent
            icon={
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            }
            title={<>Bergabung Dengan<br /><span className="text-orange">Ribuan Pengguna</span></>}
            subtitle="Dapatkan akses ke semua fitur premium dan kelola visa Anda dengan mudah dan aman"
            numbers={[
              { value: '10K+', label: 'Visa Diproses' },
              { value: '50+', label: 'Negara Tujuan' },
              { value: '99%', label: 'Tingkat Sukses' },
            ]}
          />
        </motion.div>
      </div>

      {/* ─── RIGHT PANEL: white form area ─── */}
      <div className="relative z-10 w-full lg:w-1/2 lg:ml-auto flex items-center justify-center px-6 py-12 bg-white min-h-screen overflow-hidden">

        <AnimatePresence mode="wait">
          {mode === 'login' ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <Logo iconPath={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />} />

              <div className="mb-8">
                <h1 className="text-3xl font-poppins font-black text-navy mb-2">Masuk ke akun Anda</h1>
                <p className="text-gray-500 font-dm-sans">Masukkan email dan password untuk melanjutkan</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <Field label="Email">
                  <input type="email" name="email" value={loginData.email} onChange={handleLoginChange}
                    placeholder="nama@example.com" className={inputClass} required />
                </Field>

                <Field label="Password">
                  <PasswordInput
                    name="password" value={loginData.password} onChange={handleLoginChange}
                    placeholder="Masukkan password" show={showPassword} onToggle={() => setShowPassword(v => !v)}
                  />
                </Field>

                <div className="text-right -mt-1">
                  <Link href="/auth/forgot-password" className="text-sm font-dm-sans text-orange hover:text-orange/80 transition-colors">
                    Lupa password?
                  </Link>
                </div>

                <SubmitButton isLoading={isLoading} label="Masuk" loadingLabel="Masuk..." />

                <Divider />

                <p className="text-center text-gray-500 font-dm-sans text-sm">
                  Belum punya akun?{' '}
                  <button type="button" onClick={() => switchMode('register')} className="font-semibold text-orange hover:text-orange/80 transition-colors">
                    Daftar sekarang
                  </button>
                </p>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <Logo iconPath={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />} />

              <div className="mb-8">
                <h1 className="text-3xl font-poppins font-black text-navy mb-2">Buat akun baru</h1>
                <p className="text-gray-500 font-dm-sans">Isi data diri Anda untuk memulai</p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Nama Depan">
                    <input type="text" name="firstName" value={registerData.firstName} onChange={handleRegisterChange}
                      placeholder="John" className={inputClass} required />
                  </Field>
                  <Field label="Nama Belakang">
                    <input type="text" name="lastName" value={registerData.lastName} onChange={handleRegisterChange}
                      placeholder="Doe" className={inputClass} required />
                  </Field>
                </div>

                <Field label="Email">
                  <input type="email" name="email" value={registerData.email} onChange={handleRegisterChange}
                    placeholder="nama@example.com" className={inputClass} required />
                </Field>

                <Field label="Password">
                  <>
                    <PasswordInput
                      name="password" value={registerData.password} onChange={handleRegisterChange}
                      placeholder="Minimal 8 karakter" show={showPassword} onToggle={() => setShowPassword(v => !v)}
                    />
                    {registerData.password && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          {[1, 2, 3, 4].map(l => (
                            <div key={l} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${strength >= l ? 'bg-orange' : 'bg-gray-200'}`} />
                          ))}
                        </div>
                        <p className="text-xs text-gray-400 font-dm-sans">
                          {strength < 2 ? 'Password lemah' : strength === 2 ? 'Password sedang' : strength === 3 ? 'Password kuat' : 'Password sangat kuat'}
                        </p>
                      </div>
                    )}
                  </>
                </Field>

                <Field label="Konfirmasi Password">
                  <>
                    <PasswordInput
                      name="confirmPassword" value={registerData.confirmPassword} onChange={handleRegisterChange}
                      placeholder="Ulangi password" show={showConfirmPassword} onToggle={() => setShowConfirmPassword(v => !v)}
                    />
                    {registerData.confirmPassword && registerData.password !== registerData.confirmPassword && (
                      <p className="text-xs text-red-500 font-dm-sans mt-1">Password tidak cocok</p>
                    )}
                  </>
                </Field>

                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => setAcceptTerms(v => !v)}
                    className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${acceptTerms ? 'bg-orange border-orange' : 'border-gray-300 hover:border-orange'}`}
                  >
                    {acceptTerms && <CheckIcon className="w-3 h-3 text-white" />}
                  </button>
                  <p className="text-sm font-dm-sans text-gray-600 leading-relaxed">
                    Saya setuju dengan{' '}
                    <Link href="/terms" className="text-orange hover:text-orange/80">Syarat & Ketentuan</Link>
                    {' '}dan{' '}
                    <Link href="/privacy" className="text-orange hover:text-orange/80">Kebijakan Privasi</Link>
                  </p>
                </div>

                <SubmitButton isLoading={isLoading} disabled={!acceptTerms} label="Buat Akun" loadingLabel="Mendaftar..." />

                <p className="text-center text-gray-500 font-dm-sans text-sm">
                  Sudah punya akun?{' '}
                  <button type="button" onClick={() => switchMode('login')} className="font-semibold text-orange hover:text-orange/80 transition-colors">
                    Masuk sekarang
                  </button>
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */

function Logo({ iconPath }: { iconPath: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-orange to-orange/80 rounded-xl flex items-center justify-center shadow-lg shadow-orange/20">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">{iconPath}</svg>
        </div>
        <span className="text-xl font-poppins font-bold text-navy">WEPOSE</span>
      </Link>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-dm-sans font-medium text-navy mb-2">{label}</label>
      {children}
    </div>
  );
}

function PasswordInput({
  name, value, onChange, placeholder, show, onToggle,
}: {
  name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string; show: boolean; onToggle: () => void;
}) {
  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'} name={name} value={value} onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl font-dm-sans text-navy placeholder-gray-400 focus:border-orange focus:ring-4 focus:ring-orange/15 outline-none transition-all duration-200"
        required
      />
      <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
        {show ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
      </button>
    </div>
  );
}

function SubmitButton({ isLoading, disabled, label, loadingLabel }: {
  isLoading: boolean; disabled?: boolean; label: string; loadingLabel: string;
}) {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className="w-full bg-gradient-to-r from-orange to-orange/80 text-white font-poppins font-bold py-3 px-6 rounded-xl hover:shadow-xl hover:shadow-orange/25 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          {loadingLabel}
        </span>
      ) : label}
    </button>
  );
}

function Divider() {
  return (
    <div className="relative my-1">
      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-white text-gray-400 font-dm-sans">atau</span>
      </div>
    </div>
  );
}

type StatItem = { icon: 'check' | 'lock' | 'bolt'; label: string };
type NumberItem = { value: string; label: string };

function NavyContent({
  icon, title, subtitle, stats, numbers,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  subtitle: string;
  stats?: StatItem[];
  numbers?: NumberItem[];
}) {
  const iconPaths: Record<string, React.ReactNode> = {
    check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
    lock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
    bolt: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
  };

  return (
    <div className="relative z-10 flex flex-col justify-center items-center h-full p-12 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-orange to-orange/70 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-orange/30">
        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">{icon}</svg>
      </div>

      <h2 className="text-4xl font-poppins font-black text-white mb-4 leading-tight">{title}</h2>
      <p className="text-lg text-white/70 font-dm-sans leading-relaxed max-w-xs">{subtitle}</p>

      {stats && (
        <div className="grid grid-cols-3 gap-6 mt-12 w-full max-w-sm">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                <svg className="w-5 h-5 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">{iconPaths[s.icon]}</svg>
              </div>
              <p className="text-xs text-white/60 font-dm-sans">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {numbers && (
        <div className="grid grid-cols-3 gap-8 mt-12 w-full max-w-sm">
          {numbers.map(n => (
            <div key={n.label} className="text-center">
              <div className="text-3xl font-poppins font-black text-orange mb-1">{n.value}</div>
              <p className="text-xs text-white/60 font-dm-sans">{n.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}