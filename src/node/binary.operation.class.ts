import { IToken, ITokenNumber } from 'src/types';

export interface INode {
  leftNode: ITokenNumber;
  operationTOPerform: string;
  rightNode: ITokenNumber;
}
export class BinaryOperationOnNode {
  node: {
    leftNode: ITokenNumber;
    operationToPerform: IToken;
    rightNode: ITokenNumber;
  } = {
    leftNode: { type: '', value: 0 },
    operationToPerform: {
      type: '',
      value: ''
    },
    rightNode: {
      type: '',
      value: 0
    }
  };
  constructor(
    leftNode: ITokenNumber,
    operationToPerform: IToken,
    rightNode: ITokenNumber
  ) {
    this.node['leftNode'] = leftNode;
    this.node['operationToPerform'] = operationToPerform;
    this.node['rightNode'] = rightNode;
    console.log('this.node', this.node);
  }
  getNodeValue() {
    return this.node;
  }
  stringBuilder() {
    if (
      this.node.leftNode !== undefined &&
      this.node.operationToPerform !== undefined &&
      this.node.rightNode !== undefined
    )
      return `(${this.node.leftNode.value},${this.node.operationToPerform.value},${this.node.rightNode.value})`;
    else {
      throw 'Something is wrong with the expression please recheck';
    }
  }
}
