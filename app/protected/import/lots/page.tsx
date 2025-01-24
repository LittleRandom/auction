import { createClient, isSignedIn } from '@/src/lib/supabase/server';
import LotImportForm from '@/src/components/lots/lot-import-form'
import { redirect } from 'next/navigation';

export default async function Page() {

    return <pre><LotImportForm></LotImportForm></pre>
}