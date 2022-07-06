import type {
  CallOptions,
  Client,
  ClientUnaryCall,
  Metadata,
  ServiceError,
} from '@grpc/grpc-js'
import type { Message } from 'google-protobuf'

// refer: https://gist.github.com/smnbbrv/f147fceb4c29be5ce877b6275018e294
type OriginalCall<T, U> = (
  request: T,
  metadata: Metadata,
  options: Partial<CallOptions>,
  callback: (error: ServiceError | null, res: U) => void,
) => ClientUnaryCall

type PromisifiedCall<T, U> = (
  request: T,
  metadata?: Metadata,
  options?: Partial<CallOptions>,
) => Promise<U>

export type Promisified<C> = { $: C } & {
  [prop in Exclude<keyof C, keyof Client>]: C[prop] extends OriginalCall<
    infer T,
    infer U
  >
    ? PromisifiedCall<T, U>
    : never
}

export function promisify<C extends Client>(client: C): Promisified<C> {
  return new Proxy(client, {
    get: (target, descriptor) => {
      if (descriptor === '$') {
        return target
      }

      return (...args: any[]) =>
        new Promise((resolve, reject) =>
          (target as any)[descriptor](
            ...[
              ...args,
              (err: ServiceError, res: Message) =>
                err ? reject(err) : resolve(res),
            ],
          ),
        )
    },
  }) as unknown as Promisified<C>
}

export default promisify
