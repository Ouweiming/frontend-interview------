function run() {
    // 执行一段代码
    Object.prototype[Symbol.iterator] = function() {
        // 获取对象的所有键，确保按照a、b的顺序
        const keys = Object.keys(this).sort();
        let index = 0;
        
        // 返回迭代器对象
        return {
          next: () => {
            if (index < keys.length) {
              // 返回对象的值，而不是键
              return { value: this[keys[index++]], done: false };
            }
            return { done: true };
          }
        };
      };
    }

  run();
  const [a, b] = {a: 1, b: 2} ;
  console.log(a, b); // 输出 1 2