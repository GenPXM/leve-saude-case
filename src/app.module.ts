import { Module } from '@nestjs/common';

import { AgendaController } from './controller/agenda.controller';
import { AgendaService } from './services/agenda.service';

import { AgendamentoController } from './controller/agendamento.controller';
import { AgendamentoService } from './services/agendamento.service';
import { AgendamentoRepository } from './repositories/agendamento.repository';
import { AgendamentoMemoryRepository } from './repositories/agendamento-memory.repository';
import { APP_FILTER } from '@nestjs/core';
import { AgendamentoExceptionFilter } from './filters/agendamento-exception.filter';

@Module({
  imports: [],
  controllers: [AgendaController, AgendamentoController],
  providers: [
    AgendaService,
    AgendamentoService,
    {
      provide: AgendamentoRepository,
      useClass: AgendamentoMemoryRepository,
    },
    {
      provide: APP_FILTER,
      useClass: AgendamentoExceptionFilter,
    },
  ],
})
export class AppModule {}
