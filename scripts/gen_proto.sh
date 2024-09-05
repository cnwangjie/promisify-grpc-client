#!/bin/bash

# change directory to project root
cd "$(dirname "$0")/.."

PROTO_GEN_DIR="./test/test_grpc"

mkdir -p $PROTO_GEN_DIR
protoc --plugin=`which protoc-gen-ts` --ts_out=grpc_js:$PROTO_GEN_DIR -Iproto ./proto/*.proto
grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:$PROTO_GEN_DIR \
  --grpc_out=grpc_js:$PROTO_GEN_DIR \
  --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
  -Iproto \
  ./proto/*.proto
