export class HorarioIndisponivelError extends Error {
  constructor() {
    super(
      'O horário solicitado não está mais disponível para este médico.',
    );

    this.name = 'HorarioIndisponivelError';
  }
}