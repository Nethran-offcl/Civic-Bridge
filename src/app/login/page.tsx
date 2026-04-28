import { AuthForm } from "@/components/auth/AuthForm";
import { login } from "@/app/auth/actions";

export default function LoginPage() {
  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <AuthForm type="login" action={login} />
    </section>
  );
}
