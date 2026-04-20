import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './update-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Lister tous les produits' })
  @UseGuards(AuthGuard('jwt'))
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un produit par ID' })
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: number): Promise<Product | null> {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un produit (Admin/Fournisseur)' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'fournisseur')
  create(@Body() dto: CreateProductDto): Promise<Product | null> {
    return this.productsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un produit (Admin/Fournisseur)' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'fournisseur')
  update(@Param('id') id: number, @Body() dto: UpdateProductDto): Promise<Product | null> {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un produit (Admin seulement)' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
