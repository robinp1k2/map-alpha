import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const businesses = [
            { id: 11, name: 'Whole Foods Market', lat: 38.6270696, lon: -90.3478798 },
            { id: 12, name: 'Trader Joe"s', lat: 38.6274111, lon: -90.3412601 },
            { id: 13, name: 'McDonald"s', lat: 38.6267008, lon: -90.335488},
            { id: 14, name: 'Walgreens', lat: 38.6172362, lon: -90.3492048},
            { id: 15, name: 'Schnucks Brentwood', lat: 38.6112716, lon: -90.350385 },
            { id: 16, name: 'Brentwood High School', lat: 38.6211833, lon: -90.3536654},
        ];
        return {businesses};
    }
}