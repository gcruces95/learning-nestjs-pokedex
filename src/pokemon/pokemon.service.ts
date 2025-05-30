import { Injectable, BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
@Injectable()
export class PokemonService {

  private defaultLimit: number;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService,
  ) { 
    this.defaultLimit = configService.get<number>('defaultLimit')!;
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return {
        message: 'Pokemon created',
        data: pokemon,
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = this.defaultLimit, offset = 0 } = paginationDto;
      const pokemon = await this.pokemonModel.find()
        .limit(limit)
        .skip(offset)
        .sort({ 
          no: 1
        })
        .select('-__v');
      return {
        message: 'Pokemon found',
        data: pokemon,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findOne(term: string) {

    let pokemon: Pokemon | null = null;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: +term });
    }

    if (!pokemon && isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase() });
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term);
    }

    if (!pokemon) throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);


    return {
      message: 'Pokemon found',
      data: pokemon,
    };
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      await pokemon.data.updateOne(updatePokemonDto);
      return {
        message: 'Pokemon updated',
        data: {
          ...pokemon.data.toJSON(),
          ...updatePokemonDto,
        },
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });
    if (deletedCount === 0) throw new NotFoundException(`Pokemon with id "${id}" not found`);
    return {
      message: 'Pokemon deleted',
      id,
    };
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon already exists ${JSON.stringify(error.keyValue)}`);
    }
    throw new InternalServerErrorException(`Can't update Pokemon - Check server logs`);
  }
}
