import { reverseLexerLookup, validSymbols } from 'src/athena-lexer/dictionary';
import { mulDivideType } from 'src/athena-parser/athena-parser.service';
import { IToken, ITokenNumber } from 'src/types';

export interface INode {
  leftNode: ITokenNumber;
  operationTOPerform: string;
  rightNode: ITokenNumber;
}
export class BinaryOperationOnNode {
  static stringForm: string = '';
  node: {
    leftNode: any;
    operationToPerform: IToken;
    rightNode: any;
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
  step(
    leftNode: ITokenNumber,
    operationToPerform: IToken,
    rightNode: ITokenNumber
  ) {
    this.node['leftNode'] = leftNode;
    this.node['operationToPerform'] = operationToPerform;
    this.node['rightNode'] = rightNode;
  }
  isMulDivideType = (
    currentCharacter: 'AT_MULTIPLY' | 'AT_DIVIDE',
    operationArr: mulDivideType = ['AT_MULTIPLY', 'AT_DIVIDE', 'AT_OPERATION']
  ) => {
    console.log('currentCharacter', currentCharacter, operationArr);
    return operationArr.some(
      (element: validSymbols) => currentCharacter === element
    );
  };
  getNodeValue() {
    return JSON.parse(JSON.stringify(this.node));
  }
  stringBuilder() {
    if (
      this.node.leftNode !== undefined &&
      this.node.operationToPerform !== undefined &&
      this.node.rightNode !== undefined
    )
      return `(${this.node.leftNode.value},${
        reverseLexerLookup[this.node.operationToPerform.value]
      },${this.node.rightNode.value})`;
    else {
      throw 'Something is wrong with the expression please recheck';
    }
  }
}
