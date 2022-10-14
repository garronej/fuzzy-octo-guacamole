export declare type ValueOf<a> = a extends any[] ? a[number] : a[keyof a];
export declare type Values<a extends object> = UnionToTuple<ValueOf<a>>;
/**
 * ### LeastUpperBound
 * An interesting one. A type taking two imbricated sets and returning the
 * smallest one.
 * We need that because sometimes the pattern's inferred type holds more
 * information than the value on which we are matching (if the value is any
 * or unknown for instance).
 */
export declare type LeastUpperBound<a, b> = b extends a ? b : a extends b ? a : never;
/**
 * if a key of an object has the never type,
 * returns never, otherwise returns the type of object
 **/
export declare type ExcludeIfContainsNever<a, b> = b extends Map<any, any> | Set<any> ? a : b extends readonly [any, ...any] ? ExcludeObjectIfContainsNever<a, keyof b & ('0' | '1' | '2' | '3' | '4')> : b extends any[] ? ExcludeObjectIfContainsNever<a, keyof b & number> : ExcludeObjectIfContainsNever<a, keyof b & string>;
export declare type ExcludeObjectIfContainsNever<a, keyConstraint = unknown> = a extends any ? 'exclude' extends {
    [k in keyConstraint & keyof a]-?: [a[k]] extends [never] ? 'exclude' : 'include';
}[keyConstraint & keyof a] ? never : a : never;
export declare type UnionToIntersection<union> = (union extends any ? (k: union) => void : never) extends (k: infer intersection) => void ? intersection : never;
export declare type IsUnion<a> = [a] extends [UnionToIntersection<a>] ? false : true;
export declare type UnionToTuple<union, output extends any[] = []> = UnionToIntersection<union extends any ? (t: union) => union : never> extends (_: any) => infer elem ? UnionToTuple<Exclude<union, elem>, [elem, ...output]> : output;
export declare type Cast<a, b> = a extends b ? a : never;
export declare type Flatten<xs extends any[], output extends any[] = []> = xs extends readonly [infer head, ...infer tail] ? Flatten<tail, [...output, ...Cast<head, any[]>]> : output;
export declare type Equal<a, b> = (<T>() => T extends a ? 1 : 2) extends <T>() => T extends b ? 1 : 2 ? true : false;
export declare type Expect<a extends true> = a;
export declare type IsAny<a> = 0 extends 1 & a ? true : false;
export declare type Length<it extends readonly any[]> = it['length'];
export declare type Iterator<n extends number, it extends any[] = []> = it['length'] extends n ? it : Iterator<n, [any, ...it]>;
export declare type Next<it extends any[]> = [any, ...it];
export declare type Prev<it extends any[]> = it extends readonly [any, ...infer tail] ? tail : [];
export declare type Take<xs extends readonly any[], it extends any[], output extends any[] = []> = Length<it> extends 0 ? output : xs extends readonly [infer head, ...infer tail] ? Take<tail, Prev<it>, [...output, head]> : output;
export declare type Drop<xs extends readonly any[], n extends any[]> = Length<n> extends 0 ? xs : xs extends readonly [any, ...infer tail] ? Drop<tail, Prev<n>> : [];
export declare type UpdateAt<tail extends readonly any[], n extends any[], value, inits extends readonly any[] = []> = Length<n> extends 0 ? tail extends readonly [any, ...infer tail] ? [...inits, value, ...tail] : inits : tail extends readonly [infer head, ...infer tail] ? UpdateAt<tail, Prev<n>, value, [...inits, head]> : inits;
export declare type BuiltInObjects = Function | Date | RegExp | Generator | {
    readonly [Symbol.toStringTag]: string;
} | any[];
export declare type IsPlainObject<o, excludeUnion = BuiltInObjects> = o extends object ? o extends string | excludeUnion ? false : true : false;
export declare type Compute<a extends any> = a extends BuiltInObjects ? a : {
    [k in keyof a]: a[k];
};
export declare type IntersectObjects<a> = (a extends any ? keyof a : never) extends infer allKeys ? {
    [k in Cast<allKeys, PropertyKey>]: a extends any ? k extends keyof a ? a[k] : never : never;
} : never;
export declare type WithDefault<a, def> = [a] extends [never] ? def : a;
export declare type IsLiteral<a> = a extends null | undefined ? true : a extends string ? string extends a ? false : true : a extends number ? number extends a ? false : true : a extends boolean ? boolean extends a ? false : true : a extends symbol ? symbol extends a ? false : true : a extends bigint ? bigint extends a ? false : true : false;
export declare type Primitives = number | boolean | string | undefined | null | symbol | bigint;
export declare type TupleKeys = 0 | 1 | 2 | 3 | 4;
export declare type Union<a, b> = [b] extends [a] ? a : [a] extends [b] ? b : a | b;
/**
 * GuardValue returns the value guarded by a type guard function.
 */
export declare type GuardValue<fn> = fn extends (value: any) => value is infer b ? b : fn extends (value: infer a) => unknown ? a : never;
export declare type GuardFunction<input, narrowed> = ((value: input) => value is Cast<narrowed, input>) | ((value: input) => boolean);