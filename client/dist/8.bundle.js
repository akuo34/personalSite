(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{227:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(56),i=a(13),l=a.n(i),c=a(65),s=a.n(c);function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var a=[],n=!0,r=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(n=(i=l.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(e){r=!0,o=e}finally{try{n||null==l.return||l.return()}finally{if(r)throw o}}return a}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return m(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return m(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}t.default=function(){var e=d(Object(n.useState)(""),2),t=e[0],a=e[1],i=d(Object(n.useState)([]),2),c=i[0],m=i[1],f=d(Object(n.useState)(null),2),p=f[0],g=f[1],y=d(Object(n.useState)(!1),2),h=y[0],b=y[1];Object(n.useEffect)((function(){l.a.get("/admin/api/gallery").then((function(e){m(e.data)})).catch((function(e){return console.error(e)}))}),[]);var v=function(e){var t=e.target.files[0];a((function(e){return t}))},E=function(){l.a.get("/admin/api/gallery").then((function(e){var t=e.data;m(t),b(!1)})).catch((function(e){return console.error(e)}))},x=function(e){e.preventDefault();var t=e.target.dataset.id,a=e.target.title.value,n=e.target.description.value;l.a.put("/admin/api/gallery/".concat(t),{title:a,description:n,index:""}).then((function(e){E(),console.log(e)})).catch((function(e){return console.error(e)})),document.getElementById(t).reset()},w=function(e){e.preventDefault(),b(!0);var n=e.target.dataset.id,r=e.target.dataset.filename;console.log("start of upload"),""===t&&(console.error("not an image, the image file is a ".concat(u(t))),b(!1)),o.a.ref("/images/".concat(t.name)).put(t).on("state_changed",(function(e){console.log(e)}),(function(e){console.log(e)}),(function(){console.log("uploaded to firebase"),o.a.ref("images").child(t.name).getDownloadURL().then((function(e){o.a.ref("images").child(r).delete().then((function(){return console.log("deleted from firebase")})).catch((function(e){return console.error(e)}));var i={fireBaseUrl:e,filename:r=t.name};l.a.put("/admin/api/gallery/photo/".concat(n),i).then((function(e){console.log(e),E(),a("")})).catch((function(e){return console.error(e)}))}))})),document.getElementById("form-edit-gallery").reset()},S=function(e){var t=e.target.value,a=e.target.dataset.filename,n=parseInt(e.target.dataset.index);l.a.delete("/admin/api/gallery/".concat(t)).then((function(e){console.log(e),E(),o.a.ref("images").child(a).delete().then((function(){return console.log("deleted from firebase")})).catch((function(e){return console.error(e)}))})).catch((function(e){return console.error(e)}));for(var r=n+1;r<c.length;r++){var i=c[r]._id,s={title:"",description:"",index:r-1};l.a.put("/admin/api/gallery/".concat(i),s).then((function(e){return console.log(e)})).catch((function(e){return console.error(e)}))}},N=function(e){var t=e.target.value;g(p===t?null:t)},_=function(e){var t=parseInt(e.target.dataset.index),a=e.target.dataset.id;if(t>0){var n=t-1,r=c[n]._id;l.a.put("/admin/api/gallery/".concat(a),{index:n,title:"",description:""}).then((function(e){console.log(e),l.a.put("/admin/api/gallery/".concat(r),{index:t,title:"",description:""}).then((function(e){console.log(e),E()})).catch((function(e){return console.error(e)}))})).catch((function(e){return console.error(e)}))}},D=function(e){var t=parseInt(e.target.dataset.index),a=e.target.dataset.id;if(t<c.length-1){var n=t+1,r=c[n]._id;l.a.put("/admin/api/gallery/".concat(a),{index:n,title:"",description:""}).then((function(e){console.log(e),l.a.put("/admin/api/gallery/".concat(r),{index:t,title:"",description:""}).then((function(e){console.log(e),E()})).catch((function(e){return console.error(e)}))})).catch((function(e){return console.error(e)}))}};return r.a.createElement("div",{className:"body-gallery"},r.a.createElement("h3",null,"Gallery"),r.a.createElement("div",{className:h?"container-loader":"container-loader-hidden"},r.a.createElement(s.a,{size:75,color:"#645D45",loading:h})),r.a.createElement("form",{id:"form-gallery",className:"form-gallery",onSubmit:function(e){e.preventDefault(),b(!0);var n=e.target.description.value,r=e.target.title.value;console.log("start of upload"),""===t&&(console.error("not an image, the image file is a ".concat(u(t))),b(!1));var i=(Math.floor(999*Math.random())+1).toString(),s=t.name.split("."),d=s[0]+i+s[1];o.a.ref("/images/".concat(d)).put(t).on("state_changed",(function(e){console.log(e)}),(function(e){console.log(e)}),(function(){console.log("uploaded to firebase"),o.a.ref("images").child(d).getDownloadURL().then((function(e){var t=new Date;t=t.toDateString();var o=c.length,i={fireBaseUrl:e,description:n,title:r,date:t,filename:d,index:o};l.a.post("/admin/api/gallery",i).then((function(e){E(),console.log(e),a("")})).catch((function(e){return console.error(e)}))}))})),document.getElementById("form-gallery").reset()}},r.a.createElement("h4",{className:"text-gallery-form-header"},"Upload new photo"),r.a.createElement("input",{className:"input-landing",type:"text",name:"title",placeholder:"Title"}),r.a.createElement("textarea",{className:"input-description",name:"description",placeholder:"Description"}),r.a.createElement("div",{className:"container-gallery-inputs"},r.a.createElement("input",{className:"input-gallery-file",type:"file",onChange:v}),r.a.createElement("button",{className:"button-gallery-post"},"Upload to Gallery"))),c.map((function(e,t){return r.a.createElement("div",{className:"container-gallery-row"},r.a.createElement("div",{className:"container-gallery-img"},r.a.createElement("img",{className:"img-gallery",loading:"lazy",src:e.fireBaseUrl,alt:"gallery img"})),r.a.createElement("div",{className:"wrapper-arrows-form"},r.a.createElement("div",{className:"container-up-down"},r.a.createElement("img",{className:"arrow-up",onClick:_,"data-id":e._id,"data-index":e.index,src:"https://calendar-trips.s3-us-west-1.amazonaws.com/up_arrow.png",alt:"up arrow"}),r.a.createElement("img",{className:"arrow-down",onClick:D,"data-id":e._id,"data-index":e.index,src:"https://calendar-trips.s3-us-west-1.amazonaws.com/down_arrow.png",alt:"down arrow"})),r.a.createElement("div",{className:"container-gallery-title-description"},r.a.createElement("p",null,"Title: ",e.title),r.a.createElement("p",null,"Description: ",e.description),r.a.createElement("p",null,"Date Uploaded: ",e.date),r.a.createElement("div",{className:"container-form-buttons"},r.a.createElement("button",{value:e._id,type:"submit",style:{marginRight:"5px"},onClick:N},"Edit"),r.a.createElement("button",{value:e._id,onClick:S,"data-filename":e.filename,"data-index":e.index},"Delete")),p===e._id?r.a.createElement("div",null,r.a.createElement("form",{id:"form-edit-gallery",onSubmit:w,"data-id":e._id,"data-filename":e.filename},r.a.createElement("div",{style:{marginBottom:"5px",marginTop:"20px"}},"Change photo"),r.a.createElement("div",{style:{marginBottom:"20px"}},r.a.createElement("input",{type:"file",onChange:v,style:{marginBottom:"5px"}}),r.a.createElement("button",null,"Upload photo"))),r.a.createElement("form",{id:e._id,className:"form-gallery-edit",onSubmit:x,"data-id":e._id},r.a.createElement("input",{type:"text",name:"title",placeholder:"Title",style:{marginBottom:"5px",marginTop:"5px",fontSize:"14px"}}),r.a.createElement("textarea",{name:"description",placeholder:"Description",style:{height:"50px",marginBottom:"5px",fontSize:"14px"}}),r.a.createElement("div",{className:"container-form-buttons"},r.a.createElement("button",{type:"submit",style:{marginRight:"5px"}},"Submit Changes")))):null)))})))}},56:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a(55),r=a.n(n);a(57);r.a.initializeApp({apiKey:"AIzaSyAOuLxJrJn2uRls-gLbn3-3Gl3Zhq0QHZY",authDomain:"status-kuo-abc87.firebaseapp.com",databaseURL:"https://status-kuo-abc87.firebaseio.com",projectId:"status-kuo-abc87",storageBucket:"status-kuo-abc87.appspot.com",messagingSenderId:"111200716918",appId:"1:111200716918:web:2bc2bfb30763650773f757",measurementId:"G-YF0JN1MXXQ"});var o=r.a.storage()}}]);