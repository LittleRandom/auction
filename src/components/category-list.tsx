"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading1 } from 'lucide-react';
import { MouseEvent, MouseEventHandler } from 'react';
import { Separator } from './ui/separator';

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
        <div className='grid'>
            <div className='px-2 pb-2'>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Categories
                </h2>
            </div>
            <div className='space-y-1 px-2mb-2'>
                {categories.map((item) => (
                    <Category key={item} item={item}></Category>
                ))}
            </div>
        </div>
    );
}

export function Category({ item }: { item: string }) {

    const onCategoryClick = (e: MouseEvent<HTMLDivElement>) => {
        console.log("🚀 ~ onCategoryClick ~ e:", e)
    }

    return (
        <div>
            <div className='hover:bg-primary-foreground' onClick={onCategoryClick}>
                <div className='flex items-center justify-between mx-4 my-1'>
                    <div>
                        <p>{item}</p>
                    </div>
                    <div>
                        <p>2</p>
                    </div>
                </div>
            </div>
        </div>
    );
}