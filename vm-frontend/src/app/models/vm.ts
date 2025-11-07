export interface VM {
  id: string;
  name: string;
  cpu: number;
  memoryMb: number;
  diskGb: number;
  region: string;
  status: 'RUNNING' | 'PAUSED' | 'STOP';
}
