(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var r=t(3),a=t(2),c=t(0),u=function(e){var n=e.message;return null===n?null:Object(c.jsx)("div",{className:n.type,children:n.message})},o=function(e){var n=e.text,t=e.value,r=e.handleOnChange;return Object(c.jsxs)("div",{children:[n,": ",Object(c.jsx)("input",{value:t,onChange:r})]})},i=function(e){var n=e.handleOnSubmit,t=e.handleNameChange,r=e.handleNumberChange,a=e.newName,u=e.newPhoneNumber;return Object(c.jsxs)("form",{onSubmit:n,children:[Object(c.jsx)(o,{text:"name",value:a,handleOnChange:t}),Object(c.jsx)(o,{text:"number",value:u,handleOnChange:r}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"add"})})]})},s=function(e){var n=e.person,t=e.handleDelete;return Object(c.jsxs)("div",{children:[Object(c.jsxs)("p",{children:[n.name," ",n.phoneNumber]}),Object(c.jsx)("button",{onClick:function(){return t(n)},children:"delete"})]})},l=function(e){var n=e.persons,t=e.searchInput,r=e.handleDelete;return n.filter((function(e){return""===t||e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return Object(c.jsx)(s,{person:e,handleDelete:r},e.id)}))},h=t(6),d=t(4),b=t.n(d),j="http://127.0.0.1:3001/api/persons",f={getAll:function(){return b.a.get(j).then((function(e){return e.data}))},createPerson:function(e){return b.a.post(j,e).then((function(e){return e.data}))},updatePerson:function(e,n){return b.a.put("".concat(j,"/").concat(e.id),Object(h.a)(Object(h.a)({},e),{},{phoneNumber:n})).then((function(e){return e.data}))},deletePerson:function(e){return b.a.delete("".concat(j,"/").concat(e))}},m=function(e){var n=e.handleFilterChange;return Object(c.jsxs)("div",{children:["filter shown with",Object(c.jsx)("input",{onChange:n})]})},O=function(){var e=Object(a.useState)([]),n=Object(r.a)(e,2),t=n[0],o=n[1],s=Object(a.useState)(""),h=Object(r.a)(s,2),d=h[0],b=h[1],j=Object(a.useState)(""),O=Object(r.a)(j,2),p=O[0],v=O[1],x=Object(a.useState)(""),g=Object(r.a)(x,2),w=g[0],N=g[1],C=Object(a.useState)(null),P=Object(r.a)(C,2),y=P[0],S=P[1];Object(a.useEffect)((function(){f.getAll().then((function(e){o(e)}))}),[]);return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(m,{handleFilterChange:function(e){return N(e.target.value)}}),Object(c.jsx)(u,{message:y}),Object(c.jsx)("h2",{children:"Add a new"}),Object(c.jsx)(i,{handleOnSubmit:function(e){if(e.preventDefault(),t.some((function(e){return e.name===d}))){if(window.confirm("".concat(d," is already added to phonebook,replace old number with new?"))){var n=t.find((function(e){return e.name===d}));f.updatePerson(n,p).then((function(e){o(t.map((function(t){return t!==n?t:e}))),S({message:"Updated ".concat(e.name,"'s number to ").concat(e.phoneNumber),type:"notification"}),setTimeout((function(){return S(null)}),3e3)}))}}else{var r={name:d,phoneNumber:p};f.createPerson(r).then((function(e){o(t.concat(e)),S({message:"Added ".concat(e.name," with number ").concat(e.phoneNumber),type:"notification"}),setTimeout((function(){return S(null)}),3e3)})),b(""),v("")}},handleNameChange:function(e){return b(e.target.value)},handleNumberChange:function(e){return v(e.target.value)},newName:d,newPhoneNumber:p}),Object(c.jsx)("h2",{children:"Numbers"}),Object(c.jsx)(l,{persons:t,searchInput:w,handleDelete:function(e){window.confirm("Delete user?")&&f.deletePerson(e.id).then((function(){o(t.filter((function(n){return n.id!==e.id})))})).catch((function(n){S({message:"Information of ".concat(e.name," has already been removed from the server."),type:"error"}),setTimeout((function(){return S(null)}),3e3)}))}})]})},p=t(15),v=t.n(p);t(39);v.a.render(Object(c.jsx)(O,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.ac88e67e.chunk.js.map