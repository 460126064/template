# [Template.js]功能简介
参考underscore模板，进行一些修改，支持commonjs语法引用
### [模板引用]()
标签引用 ： <script type="text/javascript" src="/template.js"></script>
模块引用 : const t = require('template.js');
### [使用方法]()
const t = require('template.js');
传递模板字符串以及参数对象
const d = t(domString,option)
### [配置参数]()
目前支持模板标识的exgExp，默认为<%%>,输出配置<%=%>
const d = t(domString,{
          outExp ： regExp
})
### [后续优化]()
增加配置项，将标识regExp改为字符串标识，方便使用
增加命名空间，防止命名冲突。
