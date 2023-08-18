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

interface PromisifyOption<C> {
  wrapError?(
    err: ServiceError,
    target: C,
    p: string | symbol,
    args: any[],
  ): ServiceError
}

export function promisify<C extends Client>(
  client: C,
  opt: PromisifyOption<C> = {},
): Promisified<C> {
  const clientName = client.constructor.name

  return new Proxy(client, {
    get: (target, p) => {
      if (p === '$') {
        return target
      }

      return (...args: any[]) => {
        return new Promise((resolve, reject) => {
          const method: Function = (target as any)[p]
          const callback = (err: ServiceError, res: Message) => {
            if (err) {
              return reject(
                opt.wrapError ? opt.wrapError(err, target, p, args) : err,
              )
            }

            resolve(res)
          }

          method.apply(target, [...args, callback])
        })
      }
    },
  }) as unknown as Promisified<C>
}

export default promisify
