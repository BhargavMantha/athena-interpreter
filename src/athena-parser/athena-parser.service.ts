import { validSymbols } from 'src/athena-lexer/dictionary';
import { BinaryOperationOnNode } from '../node/binary.operation.class';
import { NumberNode } from '../node/number.node.class';
import { IExpressionNodes, IToken, ITokenNumber } from '../types';
interface IParseExpression {
  tokens: ITokenNumber[];
  position: number;
  currentCharacter: ITokenNumber;
}
export type mulDivideType = ['AT_MULTIPLY', 'AT_DIVIDE', 'AT_OPERATION'];
export type addSubType = ['AT_PLUS', 'AT_MINUS', 'AT_OPERATION'];
export type intOrFloat = ['AT_INTEGER', 'AT_FLOAT'];

export class AthenaParserService {
  parseExpression: IParseExpression = {
    tokens: [],
    position: -1,
    currentCharacter: undefined
  };

  constructor(tokens: ITokenNumber[]) {
    this.parseExpression.tokens = tokens;
    console.log(tokens);
    this.nextCharacter();
  }
  nextCharacter() {
    this.parseExpression.position += 1;
    this.parseExpression.currentCharacter =
      this.parseExpression.position < this.parseExpression.tokens.length
        ? this.parseExpression.tokens[this.parseExpression.position]
        : undefined;
  }
  factor = () => {
    console.log('in Factor');
    const token = this.parseExpression.currentCharacter;
    const isValidType = this.isFactorOrTerm(token, ['AT_INTEGER', 'AT_FLOAT']);
    if (isValidType) {
      this.nextCharacter();
      const numberNode = new NumberNode(token);
      return numberNode.token;
    }
  };
  term = () => {
    console.log('in term');
    return this.commonBinaryOperation(this.factor, [
      'AT_MULTIPLY',
      'AT_DIVIDE',
      'AT_OPERATION'
    ]);
  };

  expr() {
    console.log('in Expr');
    return this.commonBinaryOperation(this.term, [
      'AT_PLUS',
      'AT_MINUS',
      'AT_OPERATION'
    ]);
  }
  isFactorOrTerm = (
    currentCharacter: ITokenNumber,
    operationArr: mulDivideType | addSubType | intOrFloat
  ) =>
    operationArr.some((element: validSymbols) => {
      try {
        if (currentCharacter === undefined) {
          throw 'Invalid character Please re check the expression';
        }
        return currentCharacter.type === element;
      } catch (error) {
        console.log(error);
      }
    });
  commonBinaryOperation(
    factorOrTermFn: Function,
    operationArr: mulDivideType | addSubType
  ): IExpressionNodes {
    try {
      let node = factorOrTermFn();
      let stringForm = '';
      let count = 1;

      while (
        this.isFactorOrTerm(this.parseExpression.currentCharacter, operationArr)
      ) {
        const operationToPerformToken = this.parseExpression.currentCharacter;
        this.nextCharacter();
        const right = factorOrTermFn();

        const binaryOperationOnNode = new BinaryOperationOnNode();
        binaryOperationOnNode.step(node, operationToPerformToken, right);
        const value = binaryOperationOnNode.getNodeValue();
        count += 1;
        node = value;
        console.log(`${count}. abstractSyntaxTree`, node);
      }
      return node;
    } catch (error) {
      console.log('Something went wrong please re check the input expression');
      console.error(error);
    }
  }

  parse() {
    return this.expr();
  }
}
