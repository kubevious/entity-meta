
export type EnumDictionary<T extends string | symbol | number, U> = Partial<{
    [K in T]: U;
}>;