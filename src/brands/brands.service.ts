import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';


@Injectable()
export class BrandsService {


  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Toyota',
    //   createdAt: new Date().getTime()
    // },
    // {
    //   id: uuid(),
    //   name: 'Honda',
    //   createdAt: new Date().getTime()
    // }
  ];

  create(createBrandDto: CreateBrandDto) {

    const newBrand: Brand = {
      id: uuid(),
      name: createBrandDto.name.toLowerCase(),
      createdAt: new Date().getTime()
    }
    this.brands.push(newBrand);
    return newBrand
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find(item => item.id === id);
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {

    let brandDb = this.findOne(id);

    this.brands = this.brands.map(item => {
      if (item.id === id) {
        brandDb.updatedAt = new Date().getTime();
        brandDb = { ...brandDb, ...updateBrandDto };
        return brandDb;
      }
      return item;
    });
    return brandDb;
  }

  remove(id: string) {
    const brandIndex = this.brands.findIndex(item => item.id === id);
    if (brandIndex === -1) throw new NotFoundException(`Brand with id ${id} not found`);
    this.brands.splice(brandIndex, 1);
    return `Brand with id ${id} deleted`;
  }

  
  fillBrandsWithSedd(brands:Brand[]){
    this.brands=brands;
  }



}

// nest g resource brands







