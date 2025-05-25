import { IsString, IsNotEmpty, MinLength, IsPositive, IsInt } from 'class-validator';

export class CreatePokemonDto {

  @IsString()
  @MinLength(1)
  name: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  no: number;
}
