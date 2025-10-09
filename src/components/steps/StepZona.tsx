"use client";
import * as React from 'react';
import { getOptions } from '../../lib/persona';
import { Button } from '../ui/button';

export function StepZona({ zona, setZona }: { zona?: string; setZona: (z: string) => void }) {
	return (
        <div className="space-y-3">
            <br />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {getOptions('zona').map(o => (
                    <Button key={o.value} variant={zona===o.value? 'default':'outline'} onClick={()=>setZona(o.value)}>
                        {o.label}
                    </Button>
                ))}
            </div>
        </div>
	);
}


