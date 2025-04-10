export function formatarPreco(valor: number | string): string {
    const numero = typeof valor === 'number' ? valor : parseFloat(valor);
  
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(numero);
  }
  