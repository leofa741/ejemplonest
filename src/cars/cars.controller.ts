import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dtos/create-car-dto';
import { create } from 'domain';
import { UpdateCarDto } from './dtos/update-car-dto';
import { Car } from './interfaces/car.interface';

@Controller('cars')//define un controlador asociado con la ruta
export class CarsController {

    //El servicio MiServicio se inyecta en el constructor del controlador 
    //utilizando el modificador de acceso private readonly,
    // lo que permite que miServicio esté disponible en todos los métodos de la clase.
    constructor(
        private readonly carsService: CarsService
    ) {

    }


    @Get()// El decorador @Get() define una ruta GET que llamará al método
    getCars() {
        return this.carsService.findAll();

    }
    // ValidationPipe: Valida datos de entrada basados en DTOs y class-validator.
    // ParseIntPipe:    Convierte un valor entrante a un entero.
    // ParseBoolPipe: Convierte un valor entrante a un booleano.
    // ParseFloatPipe: Convierte un valor entrante a un número flotante.
    // DefaultValuePipe: Proporciona un valor predeterminado si el valor es undefined

    @Get('/by-id/:id')
    getCarById(@Param('id', ParseUUIDPipe) id: string) { //Los pipes en NestJS  para asegurarse de que ---se aplican en controladores, a nivel parametros, a nivel global de controlador, a nivel de aplicacion
                                                         //los datos manejados en los controladores son válidos
                                                         // y están en el formato correcto.   
        const car = this.carsService.findOne(id)
        if (!car) {
            throw new NotFoundException(`Car with ID ${id} not found`);
        }
        return car;
    }



    @Get('by-name/:name')
    getCarByName(@Param('name') name: string) {
        return this.carsService.findByBrand(name);
    }

    @Post()
    //@UsePipes(ValidationPipe)
    createCar(@Body() createCarDto:CreateCarDto)    {                     // DTO: Objeto para transferir datos entre procesos.
                                                         // Validación: Se usa junto con class-validator para asegurar que los datos sean correctos.
                                                         // Propósito: Estandarizar y validar la estructura de los datos de entrada y salida.
                                                         // Los DTOs mejoran la seguridad y la integridad de los datos en la aplicación
        return this.carsService.create(createCarDto);

    }




    @Put('/:id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCarDto: UpdateCarDto): Car {
      return this.carsService.update(id, updateCarDto);
    }



    @Delete('/:id')
    delete(@Param('id') id: string) {
      return this.carsService.delete(id);
    }




}
