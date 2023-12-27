import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/infrastructure/prisma.module';
import { ProductModule } from './product/infrastructure/product.module';
import { DetailModule } from './detail/infrastructure/detail.module';
import { ImageModule } from './image/infrastructure/image.module';
import { PaymentMethodModule } from './payment-method/infrastructure/payment-method.module';
import { StageModule } from './stage/infrastructure/stage.module';
import { StockModule } from './stock/infrastructure/stock.module';
import { RolModule } from './rol/infrastructure/rol.module';
import { UserModule } from './user/infrastructure/user.module';

@Module({
  imports: [
    PrismaModule,
    ProductModule,
    DetailModule,
    ImageModule,
    PaymentMethodModule,
    StageModule,
    StockModule,
    RolModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
