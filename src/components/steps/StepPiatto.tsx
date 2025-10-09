"use client";
import * as React from 'react';
import { Button } from '../ui/button';
import { getOptions } from '../../lib/persona';

export function StepPiatto({ piatto, setPiatto }: { piatto?: string; setPiatto: (p: string) => void }) {
    return (
        <div className="space-y-3">
            <br />
            <div className="grid grid-cols-2 gap-3">
                {getOptions('piatto').map(o => (
                    <Button key={o.value} variant={piatto===o.value? 'default':'outline'} onClick={()=>setPiatto(o.value)}>
                        {o.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}


