"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MouseEvent, MouseEventHandler } from 'react';

export default function CategoryList() {
    const categories = [
        "Electronics",
        "Automotive",
        "Household",
        "Food",
        "Appliances",
        "Books",
        "Office Products",
        "Pet Supplies",
        "Toys & Games",
        "Sports & Outdoors",
        "Tools",
        "Patio, Lawn, & Garden"
    ]
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Categories</CardTitle>
                </CardHeader>

                <div className='space-y-1 mx-2 mb-2'>
                    {categories.map((item) => (
                        <Category key={item} item={item}></Category>
                    ))}
                </div>
            </Card>
        </div>
    );
}

export function Category({ item }: { item: string }) {

    const onCategoryClick = (e: MouseEvent<HTMLDivElement>) => {
        console.log("🚀 ~ onCategoryClick ~ e:", e)
    }

    return (
        <div>
            <Card className='hover:bg-primary-foreground' onClick={onCategoryClick}>
                <div className='flex items-center justify-between mx-4 my-1'>
                    <div>
                        <p>{item}</p>
                    </div>
                    <div>
                        <p>2</p>
                    </div>
                </div>
            </Card>
        </div>
    );
}