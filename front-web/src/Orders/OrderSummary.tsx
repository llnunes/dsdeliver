import { formatarPreco } from "../Utils";

type Props = {
  amount: number;
  totalPrice: number;
  onSubmit: () => void;
};

function OrderSummary({ amount, totalPrice, onSubmit }: Readonly<Props>) {
  return (
    <div className="order-summary-container">
      <div className="order-summary-content">
        <div>
          <span className="amount-selected-container">
            <strong className="amount-selected">{amount}</strong>
            PRODUTO(S) SELECIONADO(S)
          </span>
          <span className="order-summary-total">
            <strong className="amount-selected">{formatarPreco(totalPrice)}</strong>
            VALOR TOTAL
          </span>
        </div>
        <button className="order-summary-make-order" onClick={onSubmit}>
          FAZER PEDIDO
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
