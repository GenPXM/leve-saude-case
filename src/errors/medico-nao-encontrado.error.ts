export class MedicoNaoEncontradoError extends Error {
  constructor(medicoId: number) {
    super(`O médico informado não foi encontrado: ${medicoId}.`);

    this.name = 'MedicoNaoEncontradoError';
  }
}