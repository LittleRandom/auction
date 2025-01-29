"use client"
// ProductForm.tsx
import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { DatePickerWithPresets } from '../../calendar-picker-presets';
import { createClient } from '@/lib/supabase/client';

interface EventFormData {
    end_date: string
}

const EventImportForm: React.FC = () => {
    const [formData, setFormData] = useState<EventFormData>({
        end_date: ''
    });

    const handleEndDateChange = async (date: Date | undefined) => {
        setFormData(prev => ({
            ...prev,
            end_date: date!.toISOString()
        }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const supabase = createClient()

        const { data, error } = await supabase
            .from('auction_events')
            .insert(
                formData
            )
            .select()
        // Here you would typically add your Supabase integration
        console.log('Form submitted:', formData);
        console.log('received:', data);
        console.log('Error:', error);

        setFormData(
            {
                end_date: ''
            }
        )

    };


    return (
        <Card className="w-96 mx-auto" >
            <CardHeader>
                <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="end_date">End Date</Label>
                        <div>
                            <DatePickerWithPresets
                                onDateChange={handleEndDateChange} />
                        </div>
                    </div>
                    <Button type="submit" className="w-full">
                        Add Product
                    </Button>
                </form>
            </CardContent>
        </Card >
    );
};

export default EventImportForm;