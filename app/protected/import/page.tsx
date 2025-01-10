import { createClient } from '@/utils/supabase/server';
import ProductForm from '@/app/_components/ProductForm'
import { redirect } from 'next/navigation';

export default async function Page() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();


    if (!user) {
        return redirect("/auth/callback?redirect_to=");
    }

    return <pre><ProductForm></ProductForm></pre>
}