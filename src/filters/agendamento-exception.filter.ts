import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { HorarioIndisponivelError } from '../errors/horario-indisponivel.error';
import { MedicoNaoEncontradoError } from '../errors/medico-nao-encontrado.error';

interface ErrorResponse {
  erro: string;
  mensagem: string;
}

@Catch(
  MedicoNaoEncontradoError,
  HorarioIndisponivelError,
)
export class AgendamentoExceptionFilter
  implements
    ExceptionFilter<
      MedicoNaoEncontradoError | HorarioIndisponivelError
    >
{
  catch(
    exception:
      | MedicoNaoEncontradoError
      | HorarioIndisponivelError,
    host: ArgumentsHost,
  ): void {
    const response = host
      .switchToHttp()
      .getResponse<Response>();

    if (exception instanceof MedicoNaoEncontradoError) {
      const body: ErrorResponse = {
        erro: 'Médico não encontrado',
        mensagem: 'O médico informado não foi encontrado.',
      };

      response.status(HttpStatus.NOT_FOUND).json(body);
      return;
    }

    if (exception instanceof HorarioIndisponivelError) {
      const body: ErrorResponse = {
        erro: 'Horário indisponível',
        mensagem:
          'O horário solicitado não está mais disponível para este médico.',
      };

      response.status(HttpStatus.CONFLICT).json(body);
    }
  }
}