export type Decimal = bigint;

export const SCALE = 8n;
export const MULTIPLIER = 10n ** SCALE;

export function forNumber(value : number | string) : Decimal {
    if(value === null || value === undefined) {
        throw new Error("invalid value")
    }

const num =  typeof  value === "string" ? Number(value) : value ;

if(isNaN(num)) {
    throw new Error("nan not allowed")
}

return BigInt(Math.round(num * Number(MULTIPLIER)))
}

export function toNumber(value : Decimal) : number {
    return Number(value) / Number(MULTIPLIER)
}

export function add(a : Decimal , b : Decimal) : Decimal {
return a + b;
}

export function sub(a : Decimal , b: Decimal) : Decimal {
    return a -b;
}

export function mul(a : Decimal  , b : Decimal) : Decimal {
    return (a * b) / MULTIPLIER
}

export function div(a : Decimal  , b : Decimal) : Decimal {
    if(b === 0n) throw new Error("Divsion by zero")
        return (a * MULTIPLIER) / b;
}

export function gt(a : Decimal  , b : Decimal)  : boolean {
    return a > b;
}

export function gte(a : Decimal , b : Decimal) : boolean {
    return a >= b ;
}

export function lt(a : Decimal , b : Decimal) : boolean {
    return a < b ;
}

export function lte( a : Decimal ,b : Decimal ) : boolean {
    return a <= b;
}

export function eq(a : Decimal , b : Decimal) : boolean {
    return a === b;
}

export function min(a : Decimal , b : Decimal) : Decimal {
    return  a < b ? a : b;
}

export function max(a : Decimal , b : Decimal) : Decimal {
    return a > b ? a : b;
}

export function round(value : Decimal) {
    return (value / 1n) * 1n;
}














