export type ReducedClassInterface<
  C extends { prototype: any },
  T extends keyof C['prototype']
> = Omit<C['prototype'], T>;
