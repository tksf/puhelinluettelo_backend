(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,n,t){e.exports=t(38)},20:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(14),c=t.n(u),l=(t(20),t(4)),o=t(2),i=function(e){var n=e.handler,t=e.value;return r.a.createElement("form",null,r.a.createElement("div",null,"filter shown with:",r.a.createElement("input",{value:t,onChange:n})))},m=function(e){var n=e.newPerson,t=e.nameHandler,a=e.numberHandler,u=e.formHandler;return r.a.createElement("form",{onSubmit:u},r.a.createElement("div",null,"name:",r.a.createElement("input",{value:n.name,onChange:t})),r.a.createElement("div",null,"number:",r.a.createElement("input",{value:n.number,onChange:a})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},f=function(e){var n=e.persons,t=e.filter,a=e.func;return r.a.createElement("ul",null,function(e,n){return""===n?e:e.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}))}(n,t).map((function(e,n){return r.a.createElement("li",{key:n},e.name," : ",e.number,r.a.createElement("button",{onClick:function(){return a(e)}},"delete"))})))},d=t(3),s=t.n(d),b="http://localhost:3001/api/persons",h=function(){return s.a.get(b).then((function(e){return e.data}))},v=function(e){return s.a.post(b,e).then((function(e){return e.data}))},E=function(e){return s.a.delete("".concat(b,"/").concat(e)).then((function(e){return e.data}))},p=function(e){return s.a.put("".concat(b,"/").concat(e.id),e).then((function(e){return e.data}))},w=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"error"},n)},g=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"message"},n)},j=function(){var e=Object(a.useState)([]),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),d=Object(o.a)(c,2),s=d[0],b=d[1],j=Object(a.useState)(null),O=Object(o.a)(j,2),k=O[0],C=O[1],H=Object(a.useState)(null),S=Object(o.a)(H,2),y=S[0],N=S[1];Object(a.useEffect)((function(){h().then((function(e){u(e)}))}),[]);var P=Object(a.useState)({name:"new person here",number:""}),x=Object(o.a)(P,2),A=x[0],D=x[1],I=!1;return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(w,{message:k}),r.a.createElement(g,{message:y}),r.a.createElement(i,{value:s,handler:function(e){b(e.target.value)}}),r.a.createElement("h3",null," Add a new"),r.a.createElement(m,{newPerson:A,nameHandler:function(e){D(Object(l.a)({},A,{name:e.target.value}))},numberHandler:function(e){D(Object(l.a)({},A,{number:e.target.value}))},formHandler:function(e){e.preventDefault(),t.forEach((function(e){if(e.name===A.name&&(I=!0,window.confirm("".concat(A.name," is already in the phonebook, replace the old number with the new one?")))){var n={name:A.name,number:A.number,id:e.id};p(n).then((function(e){u(t.map((function(e){return e.id===n.id?n:e}))),D({name:"",number:""})}))}}));var n=t.reduce((function(e,n){return Math.max(e.id,n.id)}));if(!I){var a={name:A.name,number:A.number,id:n+1};v(a).then((function(e){u(t.concat(e)),D({name:"",number:""}),N("Added ".concat(e.name)),setTimeout((function(){N(null)}),2e3)}))}}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(f,{persons:t,filter:s,func:function(e){window.confirm("Delete ".concat(e.name," ?"))&&E(e.id).then((function(n){u(t.filter((function(n){return n.id!==e.id})))})).catch((function(n){C("Information of '".concat(e.name,"' has already been removed from server")),setTimeout((function(){C(null)}),2e3),u(t.filter((function(n){return n.id!==e.id})))}))}}))};c.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.b03a25ad.chunk.js.map