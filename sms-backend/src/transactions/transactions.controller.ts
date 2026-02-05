import { Controller, Get, Post, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, TransactionQueryDto } from './dto/transaction.dto';

@Controller('api/v1/sms')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('receive')
  @HttpCode(HttpStatus.CREATED)
  async receive(@Body() createTransactionDto: CreateTransactionDto) {
    const transaction = await this.transactionsService.create(createTransactionDto);
    return {
      id: transaction.id,
      status: transaction.status,
      createdAt: transaction.timestamp,
    };
  }

  @Get('transactions')
  async findAll(@Query() query: TransactionQueryDto) {
    return this.transactionsService.findAll(query);
  }

  @Get('transactions/:id')
  async findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }
}
