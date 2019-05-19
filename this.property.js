//词法作用域：寻找变量a时沿着嵌套作用域逐级查找。
//动态作用域：沿着调用栈在调用a的地方查找。

function bar(){
	var a=3;
	function foo(){
		console.log(this.a);
	}
foo();//undefined，全局对象调用bar()，foo在bar里运行，而不是被bar调用。
}
var a=4;
bar();

function baz(){
	var a='baz()函数';
	console.log(this.a);//全局变量
	bar();//运行bar。全局对象是调用它的对象
}
function bar(){
	var a='orange';
	console.log(this.a);//全局变量
	foo();
}
function foo(){
	var a='banana';
	console.log(this.a);//全局变量
}
var obj={
	a:'object',
	foo:foo,
}
var a='全局变量';
baz();
obj.foo();//object.foo的上下文对象为obj，由obj调用了foo。所以此时obj是foo的this对象


//锁定对象属性----禁止扩展，仍然可删除和修改属性
var obj={
	name:'xiamo',
};
console.log(obj.name);//xiamo
Object.preventExtensions(obj);//禁止扩展
console.log(Object.isExtensible(obj));//false
obj.a="cat";
console.log(obj.a);//undefeated，表示禁止扩展之后不可增加属性
obj.name='cat';
console.log(obj.name);//cat,表示禁止扩展之后仍然可以修改属性
console.log(Object.getOwnPropertyDescriptor(obj,'name'));//属性描述符都为true
delete obj.name;//删除属性name；
console.log(obj.name);//undefined，表示禁止扩展之后属性仍然可以删除


//锁定对象属性----对象封印，只可读写（可以读取、更改属性值，不能增删）
var obj1={
	a:'a',
};
Object.seal(obj1);
console.log(Object.isSealed(obj1));//true，表示已封印
console.log(Object.isExtensible(obj1));//false,表示不可扩展
console.log(Object.getOwnPropertyDescriptor(obj1,'a'));//configurable:false，其他三个属性描述符都为true，表示不可配置
delete obj1.a;
console.log(obj1.a);//a,表示不可删除属性
obj1.b='添加的属性';
console.log(obj.b);//undefined,表示不能添加新属性
obj1.a='b';
console.log(obj1.a);//b,表示可以修改已有属性


//⬇️[[set]]、[[get]]调用隐形函数setter和getter，访问器属性，a为访问描述符
var obj2={
	age:12,
	get a(){
		return this.age + 2;
	},
	set a(val){
		this.a = val*3;
	},
};
console.log(obj2.age);
console.log(obj2.a);
console.log(obj2.a);


//⬇️属性探测和属性枚举
var obj3={
	animal:'pig',
	fruit:'banana',
}
console.log(obj3.animal)
// var property;
// for(property in obj3){
// 	console.log(property);
// }//in进行属性探测

console.log(Object.keys(obj3));//返回可枚举属性组成的数组
console.log(Object.getOwnPropertyNames(obj3));//Object.getOwnPropertyNames()获取属性名称组成的数组，包括可枚举和不可枚举
console.log('animal' in obj3);//属性探测用操作符in，探测自有属性和原型属性


