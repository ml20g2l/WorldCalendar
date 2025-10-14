import { useState } from 'react';
import { WorldCalendar } from './components/WorldCalendar';
import { LoginForm } from './components/LoginForm';
import { SignUpForm } from './components/SignUpForm';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';

type AuthView = 'login' | 'signup' | 'forgot-password';

function AuthenticatedApp() {
  const { user, loading } = useAuth();
  const [authView, setAuthView] = useState<AuthView>('login');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (authView === 'signup') {
      return <SignUpForm onToggleForm={() => setAuthView('login')} />;
    }

    if (authView === 'forgot-password') {
      return <ForgotPasswordForm onBack={() => setAuthView('login')} />;
    }

    return (
      <LoginForm
        onToggleForm={() => setAuthView('signup')}
        onForgotPassword={() => setAuthView('forgot-password')}
      />
    );
  }

  return <WorldCalendar />;
}

function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}

export default App;
