import { Body, Controller, Get, Post } from '@nestjs/common';
import { AgendaService } from '../services/agenda.service';

@Controller('agendas')
export class AgendaController {
  constructor(private readonly agendaService: AgendaService) {}

  @Get()
  getMedicos() {
    return this.agendaService.getMedicos();
  }
}