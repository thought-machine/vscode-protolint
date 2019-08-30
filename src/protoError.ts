const errorRegex = /^\[[^:]+:(\d+):\d+\] (.*)$/;

export interface ProtoError {
  line: number;
  reason: string;
}

export function parseProtoError(error: string): ProtoError {
  if (!error) {
    return getEmptyProtoError();
  }

  let m = errorRegex.exec(error);

  if (!m) {
    return getEmptyProtoError();
  }

  let [, lineNo, errDesc] = m;

  const protoError: ProtoError = {
    line: +lineNo,
    reason: errDesc
  };

  return protoError;
}

export function getEmptyProtoError(): ProtoError {
  const emptyProtoError: ProtoError = {
    line: 0,
    reason: ""
  };

  return emptyProtoError;
}
