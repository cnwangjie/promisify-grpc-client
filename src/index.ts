import type {
  CallOptions,
  Client,
  ClientUnaryCall,
  Metadata,
  ServiceError,
} from '@grpc/grpc-js'
import type { Message } from 'google-protobuf'

// refer: https://gist.github.com/smnbbrv/f147fceb4c29be5ce877b6275018e294
type UnaryCall<T, U> = (
  request: T,
  metadata: Metadata,
  options: Partial<CallOptions>,
  callback: (error: ServiceError | null, res: U) => void,
) => ClientUnaryCall

type PromisifiedUnaryCall<T, U> = (
  request: T,
  metadata?: Metadata,
  options?: Partial<CallOptions>,
) => Promise<U>

type PromisifiedMethod<T> = T extends UnaryCall<infer U, infer V>
  ? PromisifiedUnaryCall<U, V>
  : T

export type Promisified<C> = {
  [K in Exclude<keyof C, keyof Client>]: PromisifiedMethod<C[K]>
}

interface PromisifyOption<C> {
  wrapError?(
    err: ServiceError,
    target: C,
    p: string | symbol,
    args: any[],
  ): ServiceError
}

const clientKeys = new Set<string | symbol>([
  'close',
  'getChannel',
  'waitForReady',
  'makeUnaryRequest',
  'makeClientStreamRequest',
  'makeServerStreamRequest',
  'makeBidiStreamRequest',
])

const promisifiedSymbol = Symbol('promisified')

const isAttrs = (
  o: unknown,
): o is { path: string; requestStream: boolean; responseStream: boolean } => {
  return o != null && typeof o === 'object' && !!(o as any).path
}

const getAttrs = (o: any, p: string) => {
  if (isAttrs(o[p])) return o[p]
  const proto = o.__proto__
  if (isAttrs(proto?.[p])) return proto[p]
  const constructorService = o.constructor?.service
  if (isAttrs(constructorService?.[p])) return constructorService[p]
}

export function promisify<C extends Client>(
  client: C,
  opt: PromisifyOption<C> = {},
): Promisified<C> {
  const cachedMethods = new Map<string | symbol, any>()

  if ((client as any)[promisifiedSymbol]) {
    return client as unknown as Promisified<C>
  }

  return new Proxy(client, {
    get: (target, p) => {
      if (p === promisifiedSymbol) {
        return true
      }

      if (p === '$') {
        return target
      }

      const cachedMethod = cachedMethods.get(p)
      if (cachedMethod) return cachedMethod

      const method: any = (target as any)[p]
      if (clientKeys.has(p)) return method

      if (!method) return method

      const attrs = getAttrs(target, p as string)
      if (!attrs) return method

      const isStreamCall = attrs.requestStream || attrs.responseStream

      if (isStreamCall) {
        return method
      }

      const wrappedMethod = function wrappedMethod(...argArray: any[]) {
        return new Promise((resolve, reject) => {
          const callback = (err: ServiceError, res: Message) => {
            if (err) {
              return reject(
                opt.wrapError ? opt.wrapError(err, target, p, argArray) : err,
              )
            }

            resolve(res)
          }

          method.apply(target, [...argArray, callback])
        })
      }

      cachedMethods.set(p, wrappedMethod)
      Object.assign(wrappedMethod, attrs)
      return wrappedMethod
    },
  }) as unknown as Promisified<C>
}

export default promisify
