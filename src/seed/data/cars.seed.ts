import { Car } from "src/cars/interfaces/car.interface";
import { v4 as uuid } from 'uuid';


export const CAR_SEDD: Car[] = [
    {
        id: uuid(),
        brand: 'Toyota',
        model: 'Corolla'
    },
    {
        id: uuid(),
        brand: 'Honda',
        model: 'Civic'
    },
    {
        id: uuid(),
        brand: 'Ford',
        model: 'Fusionv'
    }
]



