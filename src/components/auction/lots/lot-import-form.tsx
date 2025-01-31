"use client"
// ProductForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { EventSelectList } from '../events/event-select-list';
import { useSupabase } from '@/hooks/use-supabase';

interface LotFormData {
    name: string;
    current_bid: number;
    msrp: number;
    condition: string;
    cf_bucket_url: string;
    bid_count: number;
    event_num: number;
}

type Condition = 'new' | 'like-new' | 'used' | 'refurbished';

const CONDITIONS: { value: Condition; label: string; }[] = [
    { value: 'new', label: 'New' },
    { value: 'like-new', label: 'Like New' },
    { value: 'used', label: 'Used' },
    { value: 'refurbished', label: 'Refurbished' },
];

const ProductForm: React.FC = () => {
    const [formData, setFormData] = useState<LotFormData>({
        name: '',
        current_bid: 0,
        msrp: 0,
        condition: '',
        cf_bucket_url: '',
        bid_count: 0,
        event_num: 0,
    });

    const supabase = useSupabase()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("🚀 ~ handleSubmit ~ formData:", formData)
        const { data, error } = await supabase
            .from('auction_lots')
            .insert([
                formData,
            ])
            .select()
        // Here you would typically add your Supabase integration
        console.log('Form submitted:', formData);
        console.log('received:', data);
        console.log('Error:', error);

        setFormData(
            {
                name: '',
                current_bid: 0,
                msrp: 0,
                condition: '',
                cf_bucket_url: '',
                bid_count: 0,
                event_num: 0,
            }
        )
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleConditionChange = (value: string) => {
        setFormData(prev => ({
            ...prev,
            condition: value
        }));
    };

    const handleEventSelect = (value: string) => {
        setFormData(prev => ({
            ...prev,
            event_num: parseInt(value)
        }));
    };

    return (
        <Card className="w-96 mx-auto" >
            <CardHeader>
                <CardTitle>Add New Product</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="current_bid">Current Bid</Label>
                        <Input
                            id="current_bid"
                            name="current_bid"
                            type="number"
                            step="0.01"
                            value={formData.current_bid}
                            onChange={handleInputChange}
                            required
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="msrp">MSRP</Label>
                        <Input
                            id="msrp"
                            name="msrp"
                            type="number"
                            step="0.01"
                            value={formData.msrp}
                            onChange={handleInputChange}
                            required
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="condition">Condition</Label>
                        <Select
                            onValueChange={handleConditionChange}
                            value={formData.condition}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                            <SelectContent>
                                {CONDITIONS.map(({ value, label }) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="event_num">Event</Label>
                        <Select
                            onValueChange={handleEventSelect}
                            value={formData.event_num.toString()}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                            <EventSelectList onEventSelect={handleEventSelect}></EventSelectList>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="cf_bucket_url">Image URL</Label>
                        <Input
                            id="cf_bucket_url"
                            name="cf_bucket_url"
                            type="url"
                            value={formData.cf_bucket_url}
                            onChange={handleInputChange}
                            className="w-full"
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Add Product
                    </Button>
                </form>
            </CardContent>
        </Card >
    );
};

export default ProductForm;