import { createClient, isSignedIn } from '@/utils/supabase/server';
import LotForm from '@/src/components/Lots/LotImportForm'
import { redirect } from 'next/navigation';

export default async function Page() {

    if (!isSignedIn()) {
        return redirect("/auth/callback?redirect_to=");
    }

    return <pre><LotForm></LotForm></pre>
}