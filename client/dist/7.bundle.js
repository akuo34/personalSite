(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{238:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(56),o=a(10),l=a.n(o);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function m(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var a=[],n=!0,r=!1,i=void 0;try{for(var o,l=e[Symbol.iterator]();!(n=(o=l.next()).done)&&(a.push(o.value),!t||a.length!==t);n=!0);}catch(e){r=!0,i=e}finally{try{n||null==l.return||l.return()}finally{if(r)throw i}}return a}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return p(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return p(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}t.default=function(e){var t=u(Object(n.useState)(""),2),a=t[0],o=t[1],p=u(Object(n.useState)([]),2),d=p[0],f=p[1],g=u(Object(n.useState)(null),2),v=g[0],b=g[1],h=u(Object(n.useState)({}),2),y=h[0],E=h[1];Object(n.useEffect)((function(){l.a.get("/admin/api/events").then((function(e){var t=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(Object(a),!0).forEach((function(t){m(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},y);e.data.forEach((function(e){t[e._id]=0})),E(t),f(e.data)})).catch((function(e){return console.error(e)}))}),[]);var N=function(e){var t=e.target.files[0];o((function(e){return t}))},w=function(){l.a.get("/admin/api/events").then((function(t){var a=t.data;f(a),e.setLoading(!1)})).catch((function(e){return console.error(e)}))},D=function(e){e.preventDefault();var t=e.target.dataset.id,a=e.target.title.value,n=e.target.description.value,r=e.target.location.value,i=e.target.startDate.value,o=e.target.startTime.value,c=e.target.endTime.value,s=parseInt(i.substring(0,4)),m=parseInt(i.substring(5,7))-1,u=parseInt(i.substring(8,10)),p=s,d=m,f=u,g=parseInt(o.substring(0,2)),v=parseInt(o.substring(3,5)),h=parseInt(c.substring(0,2)),y=parseInt(c.substring(3,5));i=new Date(s,m,u,g,v,0,0);var E=new Date(p,d,f,h,y,0,0);l.a.put("/admin/api/events/".concat(t),{title:a,resource:n,location:r,startDate:i,endDate:E,startTime:o,endTime:c,allDay:!1}).then((function(e){w(),console.log(e),b(null)})).catch((function(e){return console.error(e)})),document.getElementById(t).reset()},x=function(e){var t=e.target.value,a=e.target.dataset.filename;l.a.delete("/admin/api/events/".concat(t)).then((function(e){console.log(e),w(),i.a.ref("events").child(a).delete().then((function(){return console.log("deleted from firebase")})).catch((function(e){return console.error(e)}))})).catch((function(e){return console.error(e)}))},S=function(t){t.preventDefault(),e.setLoading(!0);var n=t.target.dataset.id;console.log("start of upload"),""===a&&(e.setLoading(!1),console.error("not an image, the image file is a ".concat(c(a))));var r=(Math.floor(999*Math.random())+1).toString(),s=a.name.split("."),m=s[0]+r+s[1];i.a.ref("/events/".concat(m)).put(a).on("state_changed",(function(e){console.log(e)}),(function(e){console.log(e)}),(function(){console.log("uploaded to firebase"),i.a.ref("events").child(m).getDownloadURL().then((function(e){var t=d.filter((function(e){return e._id===n})),a={fireBaseUrl:e,filename:m};t[0].images.push(a);var r={images:t[0].images};l.a.put("/admin/api/events/photo/".concat(n),r).then((function(e){w(),console.log(e),o("")})).catch((function(e){return console.error(e)}))}))})),document.getElementById("form-events-edit-photo").reset()},O=function(e){var t=e.target.value,a=y[t],n=d.filter((function(e){return e._id===t}))[0].images,r=n[a].filename;n.splice(a,1),l.a.put("/admin/api/events/photo/".concat(t),{images:n}).then((function(e){if(console.log(e),!n[a]){a--;var o=Object.assign({},y);a<0?delete o[t]:o[t]=a,E(o)}w(),i.a.ref("events").child(r).delete()})).catch((function(e){return console.error(e)}))},I=function(e){var t=e.target.dataset.id,a=Object.assign({},y);a[t]++,E(a)},j=function(e){var t=e.target.dataset.id,a=Object.assign({},y);a[t]--,E(a)},T=function(e){var t=e.target.value;b(v===t?null:t)},_=function(e){var t=parseInt(e.substring(0,2)),a=e.substring(3,5);return t>12?(t-12).toString()+":"+a+" PM":t.toString()+":"+a+" AM"};return r.a.createElement("div",{className:"body-gallery"},r.a.createElement("h3",null,"Events"),r.a.createElement("form",{id:"form-events",className:"form-gallery",onSubmit:function(t){t.preventDefault(),e.setLoading(!0);var n=t.target.description.value,r=t.target.title.value,s=t.target.location.value,m=t.target.startDate.value,u=t.target.startTime.value,p=t.target.endTime.value,d=parseInt(m.substring(0,4)),f=parseInt(m.substring(5,7))-1,g=parseInt(m.substring(8,10)),v=d,b=f,h=g,y=parseInt(u.substring(0,2)),E=parseInt(u.substring(3,5)),N=parseInt(p.substring(0,2)),D=parseInt(p.substring(3,5));m=new Date(d,f,g,y,E,0,0);var x=new Date(v,b,h,N,D,0,0);console.log("start of upload"),""===a&&(e.setLoading(!1),console.error("not an image, the image file is a ".concat(c(a))));var S=(Math.floor(999*Math.random())+1).toString(),O=a.name.split("."),I=O[0]+S+O[1];i.a.ref("/events/".concat(I)).put(a).on("state_changed",(function(e){console.log(e)}),(function(e){console.log(e)}),(function(){console.log("uploaded to firebase"),i.a.ref("events").child(I).getDownloadURL().then((function(e){var t={images:[{fireBaseUrl:e,filename:I}],resource:n,title:r,location:s,startDate:m,endDate:x,startTime:u,endTime:p,allDay:!1};l.a.post("/admin/api/events",t).then((function(e){w(),console.log(e),o("")})).catch((function(e){return console.error(e)}))}))})),document.getElementById("form-events").reset()}},r.a.createElement("h4",{className:"text-gallery-form-header"},"Post new event"),r.a.createElement("input",{className:"input-landing",type:"text",name:"title",placeholder:"Title"}),r.a.createElement("input",{className:"input-landing",type:"text",name:"location",placeholder:"Location"}),r.a.createElement("textarea",{className:"input-description",name:"description",placeholder:"Description"}),r.a.createElement("div",{className:"form-1-events-row"},r.a.createElement("label",{className:"label-1-date-time"},"Date: "),r.a.createElement("div",{className:"container-date-time-column"},r.a.createElement("input",{className:"input-date-time",type:"date",name:"startDate",placeholder:"YYYY-MM-DD"}))),r.a.createElement("div",{className:"form-1-events-row"},r.a.createElement("label",{className:"label-1-date-time"},"Start Time:"),r.a.createElement("div",{className:"container-date-time-column"},r.a.createElement("input",{className:"input-date-time",type:"time",name:"startTime",placeholder:"HH:MM"}))),r.a.createElement("div",{className:"form-1-events-row"},r.a.createElement("label",{className:"label-1-date-time"},"End Time:"),r.a.createElement("div",{className:"container-date-time-column"},r.a.createElement("input",{className:"input-date-time",type:"time",name:"endTime",placeholder:"HH:MM"}))),r.a.createElement("div",{className:"container-gallery-inputs"},r.a.createElement("input",{className:"input-gallery-file",type:"file",onChange:N}),r.a.createElement("button",{className:"button-gallery-post"},"Upload to Events"))),d.map((function(e,t){return r.a.createElement("div",{className:"container-gallery-row"},r.a.createElement("div",{className:"container-store-column"},r.a.createElement("div",{style:{display:"flex",alignItems:"center",marginBottom:"40px"}},r.a.createElement("img",{className:"button-carousel",onClick:j,"data-id":e._id,style:y[e._id]>0?{height:"30px",opacity:"0.2",marginRight:"5px"}:{height:"30px",opacity:"0",marginRight:"5px",visibility:"hidden"},src:"https://calendar-trips.s3-us-west-1.amazonaws.com/left_button.png"}),r.a.createElement("div",{className:"container-store-img"},r.a.createElement("img",{className:"img-store",src:0===e.images.length?"https://calendar-trips.s3-us-west-1.amazonaws.com/unnamed.png":void 0!==y[e._id]?e.images[y[e._id]].fireBaseUrl:e.images[0].fireBaseUrl,alt:"gallery img"})),r.a.createElement("img",{className:"button-carousel",onClick:I,"data-id":e._id,style:y[e._id]<e.images.length-1?{height:"30px",opacity:"0.2",marginLeft:"5px"}:{height:"30px",opacity:"0",marginLeft:"5px",visibility:"hidden"},src:"https://calendar-trips.s3-us-west-1.amazonaws.com/right_button.png"})),v===e._id?r.a.createElement("form",{id:"form-events-edit-photo",onSubmit:S,"data-id":e._id},r.a.createElement("div",{style:{marginBottom:"5px",alignSelf:"flex-start"}},"Add photo"),r.a.createElement("div",{style:{display:"flex",flexWrap:"wrap",justifySelf:"space-between",width:"100%"}},r.a.createElement("input",{type:"file",onChange:N,style:{marginBottom:"5px"}})),r.a.createElement("button",{type:"submit",style:{marginBottom:"5px",alignSelf:"flex-end"}},"Upload Photo"),0!==e.images.length?r.a.createElement("button",{onClick:O,value:e._id,style:{alignSelf:"flex-end"}},"Delete Photo"):null):null),r.a.createElement("div",{className:"container-events-title-description"},r.a.createElement("p",null,"Title: ",e.title),r.a.createElement("p",null,"Location: ",e.location),r.a.createElement("p",null,"Start Date: ",e.startDate),r.a.createElement("p",null,"Start Time: ",_(e.startTime)),r.a.createElement("p",null,"End Date: ",e.endDate),r.a.createElement("p",null,"End Time: ",_(e.endTime)),r.a.createElement("p",null,"Number of Photos: ",e.images.length),r.a.createElement("p",{style:{lineHeight:"28px"}},"Description: ",e.resource),r.a.createElement("div",{className:"container-form-buttons"},r.a.createElement("button",{value:e._id,style:{marginRight:"5px"},onClick:T},"Edit"),r.a.createElement("button",{value:e._id,onClick:x,"data-filename":e.filename},"Delete")),v===e._id?r.a.createElement("form",{id:e._id,className:"form-gallery-edit",onSubmit:D,"data-id":e._id},r.a.createElement("input",{style:{marginBottom:"5px",marginTop:"5px",fontSize:"14px"},type:"text",name:"title",placeholder:"Title"}),r.a.createElement("input",{style:{marginBottom:"5px",fontSize:"14px"},type:"text",name:"location",placeholder:"Location"}),r.a.createElement("textarea",{name:"description",placeholder:"Description",style:{height:"50px",marginBottom:"5px",fontSize:"14px"}}),r.a.createElement("div",{className:"form-2-events-row"},r.a.createElement("p",{className:"label-2-date-time"},"Date: "),r.a.createElement("div",{className:"container-date-time-column"},r.a.createElement("input",{className:"input-date-time",type:"date",name:"startDate",placeholder:"YYYY-MM-DD"}))),r.a.createElement("div",{className:"form-2-events-row"},r.a.createElement("p",{className:"label-2-date-time"},"Start Time: "),r.a.createElement("div",{className:"container-date-time-column"},r.a.createElement("input",{className:"input-date-time",type:"time",name:"startTime",placeholder:"HH:MM"}))),r.a.createElement("div",{className:"form-2-events-row"},r.a.createElement("p",{className:"label-2-date-time"},"End Time: "),r.a.createElement("div",{className:"container-date-time-column"},r.a.createElement("input",{className:"input-date-time",type:"time",name:"endTime",placeholder:"HH:MM"}))),r.a.createElement("div",{className:"container-form-buttons"},r.a.createElement("button",{style:{marginRight:"5px"},type:"submit"},"Submit Changes"))):null))})))}},56:function(e,t,a){"use strict";(function(e){a.d(t,"a",(function(){return o}));var n=a(55),r=a.n(n),i=(a(57),{apiKey:e.env.REACT_APP_GOOGLE_API_KEY,authDomain:"status-kuo-abc87.firebaseapp.com",databaseURL:"https://status-kuo-abc87.firebaseio.com",projectId:"status-kuo-abc87",storageBucket:"status-kuo-abc87.appspot.com",messagingSenderId:"111200716918",appId:"1:111200716918:web:2bc2bfb30763650773f757",measurementId:"G-YF0JN1MXXQ"});r.a.initializeApp(i);var o=r.a.storage()}).call(this,a(26))}}]);