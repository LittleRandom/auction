import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEvents } from "@/hooks/use-events";
import { useEffect, useState } from "react";

// Interface to pass date state to parent
interface EventSelectProps {

    onEventSelect: (id: string) => void;
}

export const EventSelectList = ({ onEventSelect }: EventSelectProps) => {
    const [condition, setCondition] = useState(0);
    const { data, isLoading } = useEvents({ isActive: true })

    const handleEventSelect = (value: string) => {
        setCondition(parseInt(value))
        onEventSelect(condition.toString())
    };

    if (isLoading)
        return (<SelectContent>
            <SelectItem key={null} value={'NULL'}>
                Loading...
            </SelectItem>
        </SelectContent>
        )

    return (
        <SelectContent>
            {data?.map(({ id, end_date }) => (
                <SelectItem key={id} value={id.toString()}>
                    {end_date}
                </SelectItem>
            ))}
        </SelectContent>
    );
}