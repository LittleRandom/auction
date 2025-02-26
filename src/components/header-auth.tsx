import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { getUserData } from "@/lib/supabase/server";
import { signOutAction } from "@/lib/auth-actions";

export default async function AuthButton() {

  const userData = await getUserData()

  return userData ? (
    <div className="flex items-center gap-4">
      Hey, {userData.email}!
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
