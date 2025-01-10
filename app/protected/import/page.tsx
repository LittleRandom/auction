import { createClient } from '@/utils/supabase/server';
import LotForm from '@/components/lot-form'
import { redirect } from 'next/navigation';

export default async function Page() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();


    if (!user) {
        return redirect("/auth/callback?redirect_to=");
    }

    return <pre><LotForm></LotForm></pre>
}