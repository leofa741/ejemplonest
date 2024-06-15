import { Injectable } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { CAR_SEDD } from './data/cars.seed';
import { BRANDS_SEDD } from './data/brands.seed';
import { CarsService } from 'src/cars/cars.service';
import { BrandsService } from '../brands/brands.service';

@Injectable()
export class SeedService {

  constructor(
private readonly carService: CarsService,
private readonly brandsService: BrandsService
  ){}


  create(createSeedDto: CreateSeedDto) {
    return 'This action adds a new seed';
  }

  popoletDb(){
this.carService.fillCarsWithSedd(CAR_SEDD)
this.brandsService.fillBrandsWithSedd(BRANDS_SEDD)
    // CAR_SEDD
    // BRANDS_SEDD
    return `This action returns all seed`;
  }

  findAll() {
    return `This action returns all seed`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seed`;
  }

  update(id: number, updateSeedDto: UpdateSeedDto) {
    return `This action updates a #${id} seed`;
  }

  remove(id: number) {
    return `This action removes a #${id} seed`;
  }
}
