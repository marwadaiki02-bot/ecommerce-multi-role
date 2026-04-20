import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateOrderDto } from './create-order.dto';
import { UpdateOrderDto } from './update-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Lister toutes les commandes (Admin/Fournisseur)' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'fournisseur')
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une commande par ID (Admin/Fournisseur)' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'fournisseur')
  findOne(@Param('id') id: number): Promise<Order | null> {
    return this.ordersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une commande (Client)' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('client')
  create(@Body() dto: CreateOrderDto, @Request() req): Promise<Order> {
    return this.ordersService.create(dto, req.user.userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une commande (Admin/Fournisseur)' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'fournisseur')
  update(@Param('id') id: number, @Body() dto: UpdateOrderDto): Promise<Order | null> {
    return this.ordersService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une commande (Admin seulement)' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: number): Promise<void> {
    return this.ordersService.remove(id);
  }
}
