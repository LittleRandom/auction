import Chat from '@/components/chat';
import Chat2 from '@/components/ui/chat2';

export default function Home() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
            <Chat></Chat>

            <Chat2></Chat2>
        </main>
    );
}