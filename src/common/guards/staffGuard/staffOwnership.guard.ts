import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { PaymentsService } from "../../../payments/payments.service";

@Injectable()
export class CashierOwnershipGuard implements CanActivate {
  constructor(private readonly paymentsService: PaymentsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const paymentId = request.params.id;

    const payment = await this.paymentsService.findOne(paymentId);
    return payment?.cashier_id === user.id;
  }
}
