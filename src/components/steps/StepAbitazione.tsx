"use client";
import * as React from 'react';
import { Button } from '../ui/button';
import { getOptions } from '../../lib/persona';

export function StepAbitazione({ abitazione, setAbitazione }: { abitazione?: string; setAbitazione: (a: string) => void }) {
    return (
        <div className="space-y-3">
            <br />
            <div className="grid grid-cols-2 gap-3">
                {getOptions('abitazione').map(o => (
                    <Button key={o.value} variant={abitazione===o.value? 'default':'outline'} onClick={()=>setAbitazione(o.value)}>
                        {o.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}


