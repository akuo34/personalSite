(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{241:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(10),o=a.n(l);function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var a=[],n=!0,r=!1,l=void 0;try{for(var o,c=e[Symbol.iterator]();!(n=(o=c.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{n||null==c.return||c.return()}finally{if(r)throw l}}return a}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return i(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}t.default=function(){var e=c(Object(n.useState)([]),2),t=e[0],a=e[1],l=c(Object(n.useState)(!1),2),i=l[0],m=l[1];Object(n.useEffect)((function(){o.a.get("/admin/api/contact").then((function(e){array.length||m(!0),a(e.data)})).catch((function(e){return console.error(e)}))}),[]);var u=function(){o.a.get("/admin/api/contact").then((function(e){var t=e.data;a(t)})).catch((function(e){return console.error(e)}))},p=function(e){e.preventDefault();var t=e.target.dataset.id,a={name:e.target.name.value,email:e.target.email.value,phone:e.target.phone.value,instagram:e.target.instagram.value};o.a.put("/admin/api/contact/".concat(t),a).then((function(e){u(),console.log(e)})).catch((function(e){return console.error(e)})),document.getElementById(t).reset()},s=function(e){var t=e.target.value;o.a.delete("/admin/api/contact/".concat(t)).then((function(e){console.log(e),u(),m(!0)})).catch((function(e){return console.error(e)}))};return r.a.createElement("div",null,r.a.createElement("h3",null,"Contact"),i?r.a.createElement("form",{id:"form-contact",className:"form-gallery",onSubmit:function(e){e.preventDefault();var t={name:e.target.name.value,email:e.target.email.value,phone:e.target.phone.value,instagram:e.target.instagram.value};o.a.post("/admin/api/contact",t).then((function(e){u(),m(!1),console.log(e)})).catch((function(e){return console.error(e)})),document.getElementById("form-contact").reset()}},r.a.createElement("h4",{className:"text-gallery-form-header"},"Create your contact"),r.a.createElement("input",{className:"input-gallery-title",type:"text",name:"name",placeholder:"Name"}),r.a.createElement("input",{className:"input-gallery-title",type:"email",name:"email",placeholder:"Email"}),r.a.createElement("input",{className:"input-gallery-title",type:"tel",name:"phone",pattern:"[0-9]{3}-[0-9]{3}-[0-9]{4}",placeholder:"Phone XXX-XXX-XXXX"}),r.a.createElement("input",{className:"input-gallery-title",type:"url",name:"instagram",placeholder:"Instagram link"}),r.a.createElement("button",{className:"button-gallery-post",type:"submit"},"Upload to Contact")):null,t.map((function(e){return r.a.createElement("div",{className:"container-contact-row"},r.a.createElement("div",null,r.a.createElement("p",{style:{width:"380px"}},"Name: ",e.name),r.a.createElement("p",{style:{width:"380px"}},"Email: ",e.email),r.a.createElement("p",{style:{width:"380px"}},"Phone: ",e.phone),r.a.createElement("p",{style:{width:"380px"}},"Instagram: ",e.instagram)),r.a.createElement("form",{id:e._id,className:"form-gallery-edit",onSubmit:p,"data-id":e._id,style:{"margin-left":"15px"}},r.a.createElement("input",{type:"text",name:"name",placeholder:"Name"}),r.a.createElement("input",{type:"email",name:"email",placeholder:"Email"}),r.a.createElement("input",{type:"tel",name:"phone",pattern:"[0-9]{3}-[0-9]{3}-[0-9]{4}",placeholder:"Phone XXX-XXX-XXXX"}),r.a.createElement("input",{type:"url",name:"instagram",placeholder:"Instagram link"}),r.a.createElement("div",{className:"container-form-buttons"},r.a.createElement("button",{type:"submit"},"Edit"),r.a.createElement("button",{value:e._id,onClick:s},"Delete"))))})))}}}]);