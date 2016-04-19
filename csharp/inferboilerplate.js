'use strict';

Blockly.CSharp['inferboilerplate'] = function(block) {
  var getEngineBoiler = function(algorithm) {
    var declaration = "InferenceEngine engine = new InferenceEngine();\n";
    var algorithmMap = {
      EP: "ExpectationPropagation",
      VMP: "VariationalMessagePassing",
      Gibbs: "GibbsSampling"
    };
    var algorithmDeclaration = "engine.Algorithm = new "+ algorithmMap[algorithm] +"();\n"
    return declaration + algorithmDeclaration;
  }
  var preBoiler = `using System;
using System.Collections.Generic;
using System.Text;
using MicrosoftResearch.Infer.Models;
using MicrosoftResearch.Infer;

namespace MicrosoftResearch.Infer.Tutorials
{
\tpublic class FirstExample
\t{
\t\tpublic void Run()
\t\t{`;
  var postBoiler = `\t\t}
\t}
}`;
  var algorithm = block.getFieldValue('ALGORITHM_DROPDOWN');
  var engineBoiler = getEngineBoiler(algorithm);
  var variableDefinitions = Blockly.CSharp.build_definitions();
  var statements = Blockly.CSharp.statementToCode(block, 'STATEMENTS').trim();
  statements = engineBoiler + variableDefinitions + statements;
  statements = statements
                .split("\n")
                .map(function(line) { return "\t\t\t" + line;})
                .join("\n");
  statements = preBoiler + "\n" + statements + "\n" + postBoiler;
  return statements;
};
