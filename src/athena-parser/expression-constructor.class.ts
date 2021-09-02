import { reverseLexerLookup } from 'src/athena-lexer/dictionary';
import { ITokenNumber, IToken, IExpressionNodes } from 'src/types';

export class NodeExpressionToString {
  expressionNodes: IExpressionNodes;
  constructor(expressionNodes: IExpressionNodes) {
    this.expressionNodes = expressionNodes;
  }
  getEvaluatedExpression = () => {
    let evaluatedExpression = '';
    let previousNode;
    const getEvaluatedExpressionHelper = (
      expressionNodes: IExpressionNodes
    ) => {
      if ('value' in expressionNodes.leftNode) {
        const leftNode = expressionNodes.leftNode as ITokenNumber;
        evaluatedExpression =
          evaluatedExpression +
          `(${leftNode.value}${
            reverseLexerLookup[expressionNodes.operationToPerform.value]
          }${expressionNodes.rightNode.value})`;
        return evaluatedExpression;
      }
      const result = `(${getEvaluatedExpressionHelper(
        expressionNodes.leftNode
      )}${reverseLexerLookup[expressionNodes.operationToPerform.value]}${
        expressionNodes.rightNode.value
      })`;
      return result;
    };
    return getEvaluatedExpressionHelper(this.expressionNodes);
  };
}
