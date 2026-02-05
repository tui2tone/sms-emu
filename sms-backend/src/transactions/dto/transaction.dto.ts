import { IsString, IsOptional, IsEnum, IsNumber, IsDateString } from 'class-validator';
import { TransactionStatus } from '../entities/transaction.entity';

export class CreateTransactionDto {
  @IsString()
  message: string;

  @IsString()
  phone: string;

  @IsString()
  @IsOptional()
  sender?: string;

  @IsDateString()
  @IsOptional()
  timestamp?: string;
}

export class TransactionQueryDto {
  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;

  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
