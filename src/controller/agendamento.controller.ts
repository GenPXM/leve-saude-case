import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CriarAgendamentoDto } from '../dtos/criar-agendamento.dto';
import { AgendamentoService } from '../services/agendamento.service';

@ApiTags('Agendamento')
@Controller('agendamento')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @Post()
  @ApiOperation({
    summary: 'Registrar agendamento do paciente',
    description:
      'Permite que um paciente marque um horário de consulta com um médico.',
  })
  @ApiCreatedResponse({
    description: 'Agendamento realizado com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Médico não encontrado',
  })
  @ApiConflictResponse({
    description: 'Horário indisponível',
  })
  criar(@Body() body: CriarAgendamentoDto) {
    return this.agendamentoService.criar(body.agendamento);
  }
}
