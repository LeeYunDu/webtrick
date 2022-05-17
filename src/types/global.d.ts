/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
declare interface Fn<T = any> {
  (...arg: T[]): T;
}

// 任意对象
declare interface IObj<T = any> {
  [key: string]: T;
  [key: number]: T;
}

declare function parseInt(s: string | number, radix?: number): number;

declare function parseFloat(string: string | number): number;

declare type Dictionary<T> = Record<string, T>;

declare type Nullable<T> = T | null;

declare type RefInstanceType<T> = {
  $: T;
} | null;

declare type RefType<T> = T | null;

declare type CustomizedHTMLElement<T> = HTMLElement & T;

declare type Indexable<T = any> = {
  [key: string]: T;
};

declare type Hash<T> = Indexable<T>;

declare type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

declare type SelectOptions = {
  label: string;
  value: any;
}[];

declare type EmitType = (event: string, ...args: any[]) => void;

declare type TargetContext = '_self' | '_blank';

declare module '*.bmp' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.json' {
  const content: any | any[]
  export default content
}

declare module '*.scss' {
  const content: {
    readonly [className: string]: string;
  }
  export default content
}
declare module '*.less' {
  const content: {
    readonly [className: string]: string;
  }
  export default content
}
declare module '*.styl' {
  const content: {
    readonly [className: string]: string;
  }
  export default content
}
declare module '*.css' {
  const content: any
  export default content
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}
