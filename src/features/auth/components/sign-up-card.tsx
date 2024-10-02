import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { FaGithub } from 'react-icons/fa';

import { FcGoogle } from 'react-icons/fc';
import { SignInFlow } from '../types';
import { useState } from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { TriangleAlert } from 'lucide-react';

interface SignInCardProps {
  setState: (prop: SignInFlow) => void;
}

const SignUpCard = ({ setState }: SignInCardProps) => {
  const { signIn } = useAuthActions();

  /* ---------------- STATES ------------------ */
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  /* ---------------- FUNCTIONS ------------------ */
  const passwordSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    signIn('password', { email, password, flow: 'signUp' })
      .catch((error) => {
        console.log('error in SignUpCard', error);
        setError('Invalid email or password');
      })
      .finally(() => setIsLoading(false));
  };

  const handleProviderSignIn = (value: 'github' | 'google') => {
    setIsLoading(true);
    signIn(value).finally(() => setIsLoading(false));
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign Up to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>

      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={passwordSignUp} className="space-y-2.5 px-0 pb-0">
          <Input
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          />

          <Input
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            required
          />

          <Input
            disabled={isLoading}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm password"
            required
          />

          <Button
            type="submit"
            className="w-full"
            size={'lg'}
            disabled={isLoading}
          >
            Continue
          </Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={isLoading}
            onClick={() => handleProviderSignIn('google')}
            variant={'outline'}
            size={'lg'}
            className="relative w-full"
          >
            <FcGoogle className="size-5 absolute left-2.5 top-2.5" />
            Continue with Google
          </Button>

          <Button
            disabled={isLoading}
            onClick={() => handleProviderSignIn('github')}
            variant={'outline'}
            size={'lg'}
            className="relative w-full"
          >
            <FaGithub className="size-5 absolute left-2.5 top-2.5" />
            Continue with Github
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Already have an account?{' '}
          <span
            onClick={() => setState('signIn')}
            className="text-sky-700 cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
