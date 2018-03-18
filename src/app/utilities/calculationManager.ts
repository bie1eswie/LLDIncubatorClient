export class CalculationManager {

  static calculateProfitmargin(profitaftertax: number, revenue: number): number {

    // Profit margin(Profit after tax/Revenue)
    return (profitaftertax / revenue) * 100;
  }

  static calculateGrossProfitMargin(revenueCostofProduction: number, revenue: number): number {
    // Gross Profit Margin ((Revenue-Cost of Production)/Revenue)
    return ((revenue - revenueCostofProduction) / revenue) * 100;
  }

  static calculateCashGeneratingAbilityRatio(cashGeneratedFromOperations: number, EBITDA: number): number {
   // Cash generating ability ratio (Cash generated from operations/EBITDA)
    return (cashGeneratedFromOperations / EBITDA);
  }

  static calculateDebtorsDays(accountsReceivables: number, revenue: number): number {
    // Debtors Days(Accounts Receivables/Revenue)*365
    return (accountsReceivables / revenue) * 365;
  }

  static calculateCreditorsDays(accountsPayable: number, costOfProduction: number) {
    // Creditors Days(Accounts Payable/Cost of production)*365
    return (accountsPayable / costOfProduction) * 365;
  }

  static calculateInventoryDays(inventory: number, costOfProduction: number) {
    // Inventory Days(Inventory/Cost of Production)*365
    return (inventory / costOfProduction) * 365;
  }

  static calculateSolvencyTest(totalAsset: number, totalLiabilities: number) {
    // Solvency Test(Total Asset/Total Liabilities)
    return totalAsset / totalLiabilities;
  }

  static calculateLiquidityTest(currentAsset: number, currentLiabilities: number) {
    // Liquidity Test(Current Asset/Current Liabilities)
    return currentAsset / currentLiabilities;
  }

  static calculateAcidTest(currentAsset: number, inventory: number, currentLiabilities: number) {
    // Acid test ((Current Asset - Inventory)/Current Liabilities)
     return (currentAsset - inventory) / currentLiabilities;
  }

  static calculateGearing(totalLiabilities: number,totalEquity: number) {
    // Gearing(Total Liabilities/Total Equity)
    return totalLiabilities / totalEquity;
  }

  static calculateReturnOnEquity(profitaftertax: number, totalEquity: number) {
    return (profitaftertax / totalEquity) * 100;
  }
}
