import { ApiProperty } from '@nestjs/swagger';

export class AgendamentoDto {
  @ApiProperty({
    example: 1,
    description: 'ID do médico',
  })
  medico_id: number;

  @ApiProperty({
    example: 'Carlos Almeida',
    description: 'Nome do paciente',
  })
  paciente: string;

  @ApiProperty({
    example: '2026-06-10 09:00',
    description: 'Data e horário da consulta',
  })
  data_horario: string;
}

export class CriarAgendamentoDto {
  @ApiProperty({
    type: () => AgendamentoDto,
  })
  agendamento: AgendamentoDto;
}