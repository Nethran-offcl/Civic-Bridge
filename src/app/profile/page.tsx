import { redirect } from "next/navigation";
import { CalendarDays, Mail, UserRound } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { signout } from "@/app/auth/actions";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/Card";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, email, created_at")
    .eq("id", user.id)
    .single();

  const fullName = profile?.full_name || user.user_metadata?.full_name || "CivicBridge user";
  const email = profile?.email || user.email || "No email available";
  const joinedAt = profile?.created_at || user.created_at;

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">Profile</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Manage your CivicBridge account and keep your scheme discovery workspace close at hand.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>Your profile is created automatically after registration.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-md border border-slate-200 p-4 dark:border-white/10">
              <UserRound className="mb-3 h-5 w-5 text-brand-600 dark:text-sky-400" />
              <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Name</p>
              <p className="mt-1 font-medium text-slate-950 dark:text-white">{fullName}</p>
            </div>
            <div className="rounded-md border border-slate-200 p-4 dark:border-white/10">
              <Mail className="mb-3 h-5 w-5 text-brand-600 dark:text-sky-400" />
              <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Email</p>
              <p className="mt-1 break-words font-medium text-slate-950 dark:text-white">{email}</p>
            </div>
            <div className="rounded-md border border-slate-200 p-4 dark:border-white/10">
              <CalendarDays className="mb-3 h-5 w-5 text-brand-600 dark:text-sky-400" />
              <p className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">Joined</p>
              <p className="mt-1 font-medium text-slate-950 dark:text-white">
                {new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(joinedAt))}
              </p>
            </div>
          </div>

          <form action={signout}>
            <Button type="submit" variant="secondary">
              Sign out
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
