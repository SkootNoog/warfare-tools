import { createParamDecorator} from '@nestjs/common';

export const AuthUser = createParamDecorator(
  (data: unknown, req) => {
    return req.user;
  },
);
