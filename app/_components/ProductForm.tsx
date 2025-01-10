"use client"
// ProductForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { createClient } from '@/utils/supabase/client'

interface ProductFormData {
    name: string;
    currentprice: string;
    msrp: string;
    condition: string;
    cf_bucket_url: string;
}

type Condition = 'new' | 'like-new' | 'used' | 'refurbished';

const CONDITIONS: { value: Condition; label: string; }[] = [
    { value: 'new', label: 'New' },
    { value: 'like-new', label: 'Like New' },
    { value: 'used', label: 'Used' },
    { value: 'refurbished', label: 'Refurbished' },
];

const ProductForm: React.FC = () => {
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        currentprice: '',
        msrp: '',
        condition: '',
        cf_bucket_url: ''
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const supabase = createClient()

        const { data, error } = await supabase
            .from('auctionlots')
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
                currentprice: '',
                msrp: '',
                condition: '',
                cf_bucket_url: ''
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

    return (
        <Card className="w-96 mx-auto">
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
                        <Label htmlFor="currentprice">Current Price</Label>
                        <Input
                            id="currentprice"
                            name="currentprice"
                            type="number"
                            step="0.01"
                            value={formData.currentprice}
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
        </Card>
    );
};

export default ProductForm;