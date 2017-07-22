(function(global,factory){
         //检测是否是commonjs规范
         if(typeof module === 'object' && Object.prototype.toString.call(module).indexOf('Object') > -1 &&  Object.prototype.toString.call(module.exports).indexOf('Object') > -1 ) {
         	 //此处暂不做命名冲突。如有需要后续将修复此类问题。
         	 module.exports = factory(global);
         }else {
         	 factory( global );
         }     
      })(typeof window !== 'undefined' ? window : this,function(global) {
           global.Template = function(html,option) {
                new Template.prototype.init(html,option);
           } 
           Template.prototype = {
           	   constructor : Template,
           	   init : function(html,option) {
           	   //模板中匹配标识，可以传值进行修改；
           	   this.outExp = option.outExp || /\<\%\s*(\=?[^\%\>]*)(?:\%\>)/g;
           	   //指针索引
           	   this.pointer = 0;
           	   //代码片段集合；
           	   this.code = 'var _codeSet = [];\n';
           	   //闭合状态
           	   this.closeState = true;
           	   //指定循环变量；
           	   var match;
           	   //初始化正则
           	   this.regexpSet();
           	   //循环模板，进行编译
           	   while(match = this.outExp.exec(html)) {
           	   	  //第一步先把匹配元素之前的字符串拼接起来；
           	   	  //第二步把匹配到的元素拼接；
                  this.compile(html.slice(this.pointer,match.index)).call(this,match[1],option);
                  //索引改变
                  this.pointer = match[0].length + match.index;
           	   }  
           	   //将剩余字符串拼接
           	   this.code += '_codeSet.push(' + html.slice(this.pointer) + ');\n';
           	   this.code += 'return _codeSet.join("")';
           	   },
           	   compile : function(part,option) {
           	   	  //查看是否处于闭合状态;
                  if(this.openStateExp.test(part)) {
                  	  this.closeState = false;
                  }else if(this.closeStateExp.test(part)) {
                  	  this.closeState = true;
                  }
                  option ? (this.code += this.filterSignExp.test(part) ? !this.closeState ? '_codeSet.push(' + part.replace(this.filterSignExp,'') + ');\n' : '_codeSet.push(\"' + option[part.match(/^\s*\=\s*(.*)/)[1]] + '\");\n' : '' + part + '\n') : (this.code += part ? '_codeSet.push(\"' + part + '\");\n' : '');
                  return this.compile;
           	   },
           	   regexpSet : function() {
           	   	   this.openStateExp = /.*\{\s*$/g;
           	   	   this.closeStateExp = /\s*\)?\}\s*$/g;
                   this.filterSignExp = /^\s*\=\s*/;                   
           	   }
           }
           Template.prototype.init.prototype = Template.prototype; 
})