import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { PokeAPIResponse } from './interfaces/pokeApi-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async executeSeed() {
    const {data} = await this.axios.get<PokeAPIResponse>('https://pokeapi.co/api/v2/pokemon?limit=151');

    data.results.forEach(async ({name, url}) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      await this.pokemonModel.create({name, no});
    });

    return 'Seed executed';
  }

}
