function generateCode(jsonData) {
    function processBlock(block) {
      switch (block.type) {
        case "当开始运行":
          const nextBlock = processBlock(block.next);
          return `当开始运行(() => {\n${nextBlock}\n});`;
        case "永远循环":
          const statements = processBlock(block.statements.DO);
          return `  永远循环(() => {\n${statements}\n  });`;
        case "如果":
          const condition = processBlock(block.inputs.IF0);
          const doStatements = processBlock(block.statements.DO0);
          const elseStatements = block.statements.ELSE ? processBlock(block.statements.ELSE) : "";
          return `    if (${condition}) {\n${doStatements}\n    } else {\n${elseStatements}\n    }`;
        case "判断角色碰撞":
          return `判断角色碰撞("${block.fields.sprite}", "${block.fields.sprite1}")`;
        case "移动步数":
          return `      移动步数(${processBlock(block.inputs.steps)})`;
        case "移到位置":
          return `      移到位置(${processBlock(block.inputs.x)}, ${processBlock(block.inputs.y)})`;
        case "math_number":
          return block.fields.NUM;
        default:
          return "";
      }
    }
  
    return processBlock(jsonData);
  }
  
  // 示例JSON数据
  const jsonData = {
    "type": "当开始运行",
    "next": {
      "type": "永远循环",
      "statements": {
        "DO": {
          "type": "如果",
          "inputs": {
            "IF0": {
              "type": "判断角色碰撞",
              "fields": {
                "sprite": "自己",
                "sprite1": "鼠标"
              },
              "is_output": true
            }
          },
          "statements": {
            "DO0": {
              "type": "移动步数",
              "inputs": {
                "steps": {
                  "type": "math_number",
                  "fields": {
                    "NUM": 10
                  },
                  "is_output": true
                }
              }
            },
            "ELSE": {
              "type": "移到位置",
              "inputs": {
                "x": {
                  "type": "math_number",
                  "fields": {
                    "NUM": 0
                  },
                  "is_output": true
                },
                "y": {
                  "type": "math_number",
                  "fields": {
                    "NUM": -100
                  },
                  "is_output": true
                }
              }
            }
          }
        }
      }
    }
  };
  

  const code = generateCode(jsonData);
  console.log(code);