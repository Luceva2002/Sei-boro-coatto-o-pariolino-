"use client";
import * as React from 'react';
import { Button } from '../ui/button';
import { getOptions } from '../../lib/persona';

export function StepCapelli({ capelli, setCapelli }: { capelli?: string; setCapelli: (c: string) => void }) {
    return (
        <div className="space-y-3">
            <br />
            <div className="grid grid-cols-2 gap-3">
                {getOptions('capelli').map(o => (
                    <Button key={o.value} variant={capelli===o.value? 'default':'outline'} onClick={()=>setCapelli(o.value)}>
                        {o.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}


