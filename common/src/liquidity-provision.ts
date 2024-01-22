export type LiquidityProvision = {
  id: string
  userId: string
  contractId: string
  createdTime: number
  isAnte?: boolean
  answerId?: string // This is only set for house subsidies
  amount: number // Ṁ quantity

  liquidity: number // change in constant k after provision

  // For cpmm-1:
  pool?: { [outcome: string]: number } // pool shares before provision
}
