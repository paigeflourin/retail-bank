export interface Client {
  id: number;
  clientName: string;
  clientBalance: number;
  clientOwes: number;
  clientOwesTo: string;
  clientOwesFromAmount: number;
  clientOwesFrom: string;
}