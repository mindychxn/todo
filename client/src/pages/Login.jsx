import LoginForm from '../components/LoginForm';

export default function Login({ authenticate }) {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient2 bg-cover">
      <LoginForm onSuccess={() => authenticate(true)} />
    </div>
  );
}
