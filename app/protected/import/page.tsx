import { createClient, isSignedIn } from '@/src/lib/supabase/server';
import LotForm from '@/src/components/lots/lot-import-form'
import { redirect } from 'next/navigation';

export default async function Page() {

    if (!isSignedIn()) {
        return redirect("/auth/callback?redirect_to=");
    }

    return <pre><LotForm></LotForm></pre>
}