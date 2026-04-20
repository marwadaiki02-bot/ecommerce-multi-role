import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';


import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './create-order.dto';
import { UpdateOrderDto } from './update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private usersService: UsersService,
    private productsService: ProductsService,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async findOne(id: number): Promise<Order | null> {
    return this.ordersRepository.findOne({ where: { id } });
  }

  async create(dto: CreateOrderDto, clientId: number): Promise<Order> {
    const client = await this.usersService.findOne(clientId);
    const product = await this.productsService.findOne(dto.productId);

    if (!client || !product) {
      throw new Error('Client ou produit introuvable');
    }

    const order = this.ordersRepository.create({
      client: client,
      product: product,
      quantity: dto.quantity,
      status: 'pending',
    });

    return this.ordersRepository.save(order);
  }

  async update(id: number, dto: UpdateOrderDto): Promise<Order | null> {
    await this.ordersRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
