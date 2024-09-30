import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class SuperadminGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        if (req.user.role != 'superadmin'){
            throw new ForbiddenException('you are not superadmin')
        }
        return true;
    }
}