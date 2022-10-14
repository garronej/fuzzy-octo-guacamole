import * as symbols from './internals/symbols';
import { GuardFunction } from './types/helpers';
import { InvertPattern } from './types/InvertPattern';
import { Pattern, UnknownPattern, OptionalP, ArrayP, AndP, OrP, NotP, GuardP, SelectP, AnonymousSelectP, GuardExcludeP } from './types/Pattern';
export type { Pattern };
/**
 * `P.infer<typeof somePattern>` will return the type of the value
 * matched by this pattern.
 *
 * [Read `P.infer` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#Pinfer)
 *
 * @example
 * const userPattern = { name: P.string }
 * type User = P.infer<typeof userPattern>
 */
export declare type infer<p extends Pattern<any>> = InvertPattern<p>;
/**
 * `P.optional(subpattern)` takes a sub pattern and returns a pattern which matches if the
 * key is undefined or if it is defined and the sub pattern matches its value.
 *
 * [Read `P.optional` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#Poptional-patterns)

* @example
 *  match(value)
 *   .with({ greeting: P.optional('Hello') }, () => 'will match { greeting?: "Hello" }')
 */
export declare function optional<input, p extends unknown extends input ? UnknownPattern : Pattern<input>>(pattern: p): OptionalP<input, p>;
declare type Elem<xs> = xs extends Array<infer x> ? x : never;
/**
 * `P.array(subpattern)` takes a sub pattern and returns a pattern, which matches
 * arrays if all their elements match the sub pattern.
 *
 * [Read `P.array` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#Parray-patterns)
 *
 * @example
 *  match(value)
 *   .with({ users: P.array({ name: P.string }) }, () => 'will match { name: string }[]')
 */
export declare function array<input, p extends unknown extends input ? UnknownPattern : Pattern<Elem<input>>>(pattern: p): ArrayP<input, p>;
/**
 * `P.intersection(...patterns)` returns a pattern which matches
 * only if **every** patterns provided in parameter match the input.
 *
 * [Read `P.intersection` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#Pintersection-patterns)
 *
 * @example
 *  match(value)
 *   .with(
 *     {
 *       user: P.intersection(
 *         { firstname: P.string },
 *         { lastname: P.string },
 *         { age: P.when(age => age > 21) }
 *       )
 *     },
 *     ({ user }) => 'will match { firstname: string, lastname: string, age: number } if age > 21'
 *   )
 */
export declare function intersection<input, ps extends unknown extends input ? [UnknownPattern, ...UnknownPattern[]] : [Pattern<input>, ...Pattern<input>[]]>(...patterns: ps): AndP<input, ps>;
/**
 * `P.union(...patterns)` returns a pattern which matches
 * if **at least one** of the patterns provided in parameter match the input.
 *
 * [Read `P.union` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#Punion-patterns)
 *
 * @example
 *  match(value)
 *   .with(
 *     { type: P.union('a', 'b', 'c') },
 *     ({ user }) => 'will match { type: "a" | "b" | "c" }'
 *   )
 */
export declare function union<input, ps extends unknown extends input ? [UnknownPattern, ...UnknownPattern[]] : [Pattern<input>, ...Pattern<input>[]]>(...patterns: ps): OrP<input, ps>;
/**
 * `P.not(pattern)` returns a pattern which matches if the sub pattern
 * doesn't match.
 *
 * [Read `P.not` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#Pnot-patterns)
 *
 * @example
 *  match<{ a: string | number }>(value)
 *   .with({ a: P.not(P.string) }, (x) => 'will match { a: number }'
 *   )
 */
export declare function not<input, p extends unknown extends input ? UnknownPattern : Pattern<input> | undefined>(pattern: p): NotP<input, p>;
/**
 * `P.when((value) => boolean)` returns a pattern which matches
 * if the predicate returns true for the current input.
 *
 * [Read `P.when` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#Pwhen-patterns)
 *
 * @example
 *  match<{ age: number }>(value)
 *   .with({ age: P.when(age => age > 21) }, (x) => 'will match if value.age > 21'
 *   )
 */
export declare function when<input, p extends (value: input) => unknown>(predicate: p): GuardP<input, p extends (value: any) => value is infer narrowed ? narrowed : never>;
export declare function when<input, narrowed extends input, excluded>(predicate: (input: input) => input is narrowed): GuardExcludeP<input, narrowed, excluded>;
/**
 * `P.select()` is a pattern which will always match,
 * and will inject the selected piece of input in the handler function.
 *
 * [Read `P.select` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#Pselect-patterns)
 *
 * @example
 *  match<{ age: number }>(value)
 *   .with({ age: P.select() }, (age) => 'age: number'
 *   )
 */
export declare function select(): AnonymousSelectP;
export declare function select<input, patternOrKey extends string | (unknown extends input ? UnknownPattern : Pattern<input>)>(patternOrKey: patternOrKey): patternOrKey extends string ? SelectP<patternOrKey> : SelectP<symbols.anonymousSelectKey, input, patternOrKey>;
export declare function select<input, p extends unknown extends input ? UnknownPattern : Pattern<input>, k extends string>(key: k, pattern: p): SelectP<k, input, p>;
declare type AnyConstructor = new (...args: any[]) => any;
/**
 * `P.any` is a wildcard pattern, matching **any value**.
 *
 * [Read `P.any` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#P_-wildcard)
 *
 * @example
 *  match(value)
 *   .with(P.any, () => 'will always match')
 */
export declare const any: GuardP<unknown, unknown>;
/**
 * `P._` is a wildcard pattern, matching **any value**.
 * It's an alias to `P.any`.
 *
 * [Read `P._` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#P_-wildcard)
 *
 * @example
 *  match(value)
 *   .with(P._, () => 'will always match')
 */
export declare const _: GuardP<unknown, unknown>;
/**
 * `P.string` is a wildcard pattern matching any **string**.
 *
 * [Read `P.string` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#Pstring-wildcard)
 *
 * @example
 *  match(value)
 *   .with(P.string, () => 'will match on strings')
 */
export declare const string: GuardP<unknown, string>;
/**
 * `P.number` is a wildcard pattern matching any **number**.
 *
 * [Read `P.number` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#Pnumber-wildcard)
 *
 * @example
 *  match(value)
 *   .with(P.number, () => 'will match on numbers')
 */
export declare const number: GuardP<unknown, number>;
/**
 * `P.boolean` is a wildcard pattern matching any **boolean**.
 *
 * [Read `P.boolean` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#boolean-wildcard)
 *
 * @example
 *   .with(P.boolean, () => 'will match on booleans')
 */
export declare const boolean: GuardP<unknown, boolean>;
/**
 * `P.bigint` is a wildcard pattern matching any **bigint**.
 *
 * [Read `P.bigint` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#bigint-wildcard)
 *
 * @example
 *   .with(P.bigint, () => 'will match on bigints')
 */
export declare const bigint: GuardP<unknown, bigint>;
/**
 * `P.symbol` is a wildcard pattern matching any **symbol**.
 *
 * [Read `P.symbol` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#symbol-wildcard)
 *
 * @example
 *   .with(P.symbol, () => 'will match on symbols')
 */
export declare const symbol: GuardP<unknown, symbol>;
/**
 * `P.nullish` is a wildcard pattern matching **null** or **undefined**.
 *
 * [Read `P.nullish` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#nullish-wildcard)
 *
 * @example
 *   .with(P.nullish, () => 'will match on null or undefined')
 */
export declare const nullish: GuardP<unknown, null | undefined>;
/**
 * `P.instanceOf(SomeClass)` is a pattern matching instances of a given class.
 *
 * [Read `P.instanceOf` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#Pinstanceof-patterns)
 *
 *  @example
 *   .with(P.instanceOf(SomeClass), () => 'will match on SomeClass instances')
 */
export declare function instanceOf<T extends AnyConstructor>(classConstructor: T): GuardP<unknown, InstanceType<T>>;
/**
 * `P.typed<SomeType>()` is a way to set the input type this
 * pattern should match on.
 *
 * It returns all utility functions to create patterns,
 * Like `array`, `union`, `intersection`, etc.
 *
 * [Read `P.typed` documentation on GitHub](https://github.com/gvergnaud/ts-pattern#Ptyped)
 *
 * @example
 *  .with(
 *    P.typed<string | number[]>().array(P.string),
 *    (arrayOfString) => arrayOfString.join(', ')
 *  )
 */
export declare function typed<input>(): {
    array<p extends Pattern<Elem<input>>>(pattern: p): ArrayP<input, p>;
    optional<p extends Pattern<input>>(pattern: p): OptionalP<input, p>;
    intersection<ps extends [Pattern<input>, ...Pattern<input>[]]>(...patterns: ps): AndP<input, ps>;
    union<ps extends [Pattern<input>, ...Pattern<input>[]]>(...patterns: ps): OrP<input, ps>;
    not<p extends Pattern<input>>(pattern: p): NotP<input, p>;
    when<narrowed extends input = never>(predicate: GuardFunction<input, narrowed>): GuardP<input, narrowed>;
    select<pattern extends Pattern<input>>(pattern: pattern): SelectP<symbols.anonymousSelectKey, input, pattern>;
    select<p extends Pattern<input>, k extends string>(key: k, pattern: p): SelectP<k, input, p>;
};
