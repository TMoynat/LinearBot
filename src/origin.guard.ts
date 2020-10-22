import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class OriginGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const userAgent = context.switchToHttp().getRequest().headers['user-agent'];
    return userAgent === process.env.LINEARAGENT;
  }
}
