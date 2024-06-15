import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { create } from 'domain';
import{ v4 as uuidv4 } from 'uuid'    ;
import { CreateCarDto } from './dtos/create-car-dto';
import { UpdateCarDto } from './dtos/update-car-dto';



                           // decorador en NestJS que marca una clase como un proveedor
@Injectable()             // que puede ser inyectado en otras partes de la aplicación mediante el sistema de inyección de dependencias.
export class CarsService {

    private cars :Car [] = [
        // { id: uuidv4(), brand: 'Toyota' , model: 'Corolla' },
        // { id: uuidv4(), brand: 'Honda', model: 'Civic' },
        // { id: uuidv4(), brand: 'Ford', model: 'Fusion' },
    ];
    
    delete(id: string) {
        const carIndex = this.cars.findIndex(car => car.id === id);
    
        if (carIndex === -1) {
          throw new NotFoundException('Car not found.');
        }
    
        this.cars.splice(carIndex, 1);

        return { message: 'Car deleted successfully.' };
      }
    

    update(id: string, updateCarDto: UpdateCarDto): Car {
        const carIndex = this.cars.findIndex(car => car.id === id);
    
        if (carIndex === -1) {
          throw new NotFoundException('Car not found.');
        }
    
        const carWithSameModel = this.cars.find(car => car.model === updateCarDto.model.trim() && car.id !== id);
    
        if (carWithSameModel) {
          throw new BadRequestException('A car with this model already exists.');
        }
    
        this.cars[carIndex] = {
          ...this.cars[carIndex],
          ...updateCarDto,
        };
    
        return this.cars[carIndex];
      } 

  

    findAll() {
        return this.cars;
    }

    findOne(id: string) {
        return this.cars.find((car) => car.id === id);
    }

    findByBrand(brand: string) {
        return this.cars.filter((car) => car.brand === brand);
    }


    create(createCarDto: CreateCarDto): Car {
        // Check if a car with the same model already exists
        const carExists = this.cars.some(car => car.model === createCarDto.model.trim());
    
        if (carExists) {
          throw new BadRequestException('A car with this model already exists.');
        }
    
        const newCar: Car = {
          id: uuidv4(),
          ...createCarDto,
        };
    
        this.cars.push(newCar);
        return newCar;
      }

      fillCarsWithSedd(cars:Car[]){
        this.cars=cars;
      }



}
