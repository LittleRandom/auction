import { createClient, isSignedIn } from '@/src/lib/supabase/server';
import EventImportForm from '@/src/components/events/event-create-form'
import { redirect } from 'next/navigation';
import { EventFormData } from '../../../test/page';

export default async function Page() {

    return <pre><EventImportForm></EventImportForm></pre>
}