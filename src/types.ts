export interface IToken {
  type: string;
  value: any;
}

export interface ITokenNumber extends IToken {
  value: number;
}

export interface IExpressionNodes {
  leftNode: IExpressionNodes | ITokenNumber;
  operationToPerform: IToken;
  rightNode: ITokenNumber;
}
