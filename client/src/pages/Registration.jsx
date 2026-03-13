import RegistrationForm from '../components/RegistrationForm';

export default function Registration({ authenticate }) {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient2 bg-cover">
      <RegistrationForm onSuccess={() => authenticate(true)} />
    </div>
  );
}
