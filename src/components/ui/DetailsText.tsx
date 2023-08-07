import * as React from 'react';

interface DetailsTextProps  { 
    children: React.ReactNode
 }

export default function DetailsText({children}: DetailsTextProps) {
    return (
        <p className="flex justify-between font-medium mb-2">
            {children}
        </p>
    );
}