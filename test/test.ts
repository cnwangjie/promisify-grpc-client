import { ChannelCredentials } from '@grpc/grpc-js'
import { promisify } from '../src'
import { TestServiceClient } from './test_grpc/test_grpc_pb'

const client = promisify(
  new TestServiceClient('localhost:50051', ChannelCredentials.createInsecure()),
)

console.log(client.testBidiStream())
