// package: test
// file: test.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as test_pb from "./test_pb";

interface ITestServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    test: ITestServiceService_Itest;
    testClientStream: ITestServiceService_ItestClientStream;
    testServerStream: ITestServiceService_ItestServerStream;
    testBidiStream: ITestServiceService_ItestBidiStream;
}

interface ITestServiceService_Itest extends grpc.MethodDefinition<test_pb.TestRequest, test_pb.TestResponse> {
    path: "/test.TestService/test";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<test_pb.TestRequest>;
    requestDeserialize: grpc.deserialize<test_pb.TestRequest>;
    responseSerialize: grpc.serialize<test_pb.TestResponse>;
    responseDeserialize: grpc.deserialize<test_pb.TestResponse>;
}
interface ITestServiceService_ItestClientStream extends grpc.MethodDefinition<test_pb.TestRequest, test_pb.TestResponse> {
    path: "/test.TestService/testClientStream";
    requestStream: true;
    responseStream: false;
    requestSerialize: grpc.serialize<test_pb.TestRequest>;
    requestDeserialize: grpc.deserialize<test_pb.TestRequest>;
    responseSerialize: grpc.serialize<test_pb.TestResponse>;
    responseDeserialize: grpc.deserialize<test_pb.TestResponse>;
}
interface ITestServiceService_ItestServerStream extends grpc.MethodDefinition<test_pb.TestRequest, test_pb.TestResponse> {
    path: "/test.TestService/testServerStream";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<test_pb.TestRequest>;
    requestDeserialize: grpc.deserialize<test_pb.TestRequest>;
    responseSerialize: grpc.serialize<test_pb.TestResponse>;
    responseDeserialize: grpc.deserialize<test_pb.TestResponse>;
}
interface ITestServiceService_ItestBidiStream extends grpc.MethodDefinition<test_pb.TestRequest, test_pb.TestResponse> {
    path: "/test.TestService/testBidiStream";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<test_pb.TestRequest>;
    requestDeserialize: grpc.deserialize<test_pb.TestRequest>;
    responseSerialize: grpc.serialize<test_pb.TestResponse>;
    responseDeserialize: grpc.deserialize<test_pb.TestResponse>;
}

export const TestServiceService: ITestServiceService;

export interface ITestServiceServer extends grpc.UntypedServiceImplementation {
    test: grpc.handleUnaryCall<test_pb.TestRequest, test_pb.TestResponse>;
    testClientStream: grpc.handleClientStreamingCall<test_pb.TestRequest, test_pb.TestResponse>;
    testServerStream: grpc.handleServerStreamingCall<test_pb.TestRequest, test_pb.TestResponse>;
    testBidiStream: grpc.handleBidiStreamingCall<test_pb.TestRequest, test_pb.TestResponse>;
}

export interface ITestServiceClient {
    test(request: test_pb.TestRequest, callback: (error: grpc.ServiceError | null, response: test_pb.TestResponse) => void): grpc.ClientUnaryCall;
    test(request: test_pb.TestRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: test_pb.TestResponse) => void): grpc.ClientUnaryCall;
    test(request: test_pb.TestRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: test_pb.TestResponse) => void): grpc.ClientUnaryCall;
    testClientStream(callback: (error: grpc.ServiceError | null, response: test_pb.TestResponse) => void): grpc.ClientWritableStream<test_pb.TestRequest>;
    testClientStream(metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: test_pb.TestResponse) => void): grpc.ClientWritableStream<test_pb.TestRequest>;
    testClientStream(options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: test_pb.TestResponse) => void): grpc.ClientWritableStream<test_pb.TestRequest>;
    testClientStream(metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: test_pb.TestResponse) => void): grpc.ClientWritableStream<test_pb.TestRequest>;
    testServerStream(request: test_pb.TestRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<test_pb.TestResponse>;
    testServerStream(request: test_pb.TestRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<test_pb.TestResponse>;
    testBidiStream(): grpc.ClientDuplexStream<test_pb.TestRequest, test_pb.TestResponse>;
    testBidiStream(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<test_pb.TestRequest, test_pb.TestResponse>;
    testBidiStream(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<test_pb.TestRequest, test_pb.TestResponse>;
}

export class TestServiceClient extends grpc.Client implements ITestServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public test(request: test_pb.TestRequest, callback: (error: grpc.ServiceError | null, response: test_pb.TestResponse) => void): grpc.ClientUnaryCall;
    public test(request: test_pb.TestRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: test_pb.TestResponse) => void): grpc.ClientUnaryCall;
    public test(request: test_pb.TestRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: test_pb.TestResponse) => void): grpc.ClientUnaryCall;
    public testClientStream(callback: (error: grpc.ServiceError | null, response: test_pb.TestResponse) => void): grpc.ClientWritableStream<test_pb.TestRequest>;
    public testClientStream(metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: test_pb.TestResponse) => void): grpc.ClientWritableStream<test_pb.TestRequest>;
    public testClientStream(options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: test_pb.TestResponse) => void): grpc.ClientWritableStream<test_pb.TestRequest>;
    public testClientStream(metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: test_pb.TestResponse) => void): grpc.ClientWritableStream<test_pb.TestRequest>;
    public testServerStream(request: test_pb.TestRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<test_pb.TestResponse>;
    public testServerStream(request: test_pb.TestRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<test_pb.TestResponse>;
    public testBidiStream(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<test_pb.TestRequest, test_pb.TestResponse>;
    public testBidiStream(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<test_pb.TestRequest, test_pb.TestResponse>;
}
