/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BrowserAgentGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req= context.getArgByIndex(0) 
    const userAgent= req.headers['user-agent']
    const isAllow= (userAgent ==='google/chrome')
    if(!isAllow) throw new HttpException('USER_AGENT_NOT_VALID',HttpStatus.BAD_REQUEST)
    return isAllow
  }
}
