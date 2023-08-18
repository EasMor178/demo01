## 数据类型

基础类型：String number boolean undefined null symbol BigInt
引用类型：Object Function Array Data RegExp ...

## 数据类型检测

##### typeof：能区分除null外的基础数据类型,Null和引用数据类型都返回Object。

原理：基于计算机底层数据类型的值（二进制）进行检测。
​ 错因：Null、Object对象在计算机中都是以000开始的二进存储，所以返回的都是Object。

##### instanceof：检测当前实例是否属于这个类，不能检测基本数据类型。

原理：只要当前类出现在实例的原型链上，结果都是true。
​ 错因：所有的引用函数最终都指向Object，我们也可以肆意修改原型的指向，所以不准。

##### constructor：检测实例的构造函数。（支持基本数据类型）

原理：检测实例的构造函数。
​ 错因：可以随便改，所以不准。

##### Object.prototype.toString.call{[value]}

返回类似`[Object Boolean]`的形式，能使用检测所有的数据类型。

##### Jquery源码中使用typeof检测基本数据类型，Null单拎出来，引用类型使用toString.call检测。

## 循环
