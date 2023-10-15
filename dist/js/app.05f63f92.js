(()=>{"use strict";var e={2865:(e,t,a)=>{a(6992),a(8674),a(9601),a(7727);var o=a(144),r=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"app"}},[t("router-view"),t("title",[e._v("Mmerge")])],1)},i=[],l=a(1001),s={},n=(0,l.Z)(s,r,i,!1,null,null,null);const u=n.exports;var c=a(8345),d=function(){var e=this,t=e._self._c;return t("div",{staticClass:"sections"},[t("el-tabs",{on:{"tab-click":e.handleTabClick},model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[t("el-tab-pane",{attrs:{label:"Configuration",name:"Configuration"}},[t("Configuration")],1),t("el-tab-pane",{attrs:{label:"Chatbot",name:"Chatbot"}},[t("Chatbot")],1),t("el-tab-pane",{attrs:{label:"CourseInput",name:"CourseInput"}},[t("CourseInput")],1)],1)],1)},f=[],p=(a(8309),function(){var e=this,t=e._self._c;return t("div",{staticClass:"header"},[t("div",{staticClass:"progress-bar"},[t("el-progress",{attrs:{percentage:e.percentage}})],1),t("div",{staticClass:"CourseSelect"},[t("el-select",{staticStyle:{width:"50%",float:"left"},attrs:{multiple:"",filterable:"","allow-create":"","default-first-option":"",placeholder:"Choose courses that you have already taken, example: pmath340, cs246"},on:{change:function(t){return e.handleCourseChange(this.value)}},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.options,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),t("div",{staticClass:"MajorSelect",staticStyle:{"margin-left":"10px"}},[t("el-select",{staticStyle:{width:"50%",float:"right"},attrs:{filterable:"","allow-create":"","default-first-option":"",placeholder:"Choose your major(s) / your self-defined major"},on:{change:e.handelMajorChange},model:{value:e.major,callback:function(t){e.major=t},expression:"major"}},e._l(e.Majoroptions,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1)])}),h=[],v=(a(6699),a(2023),a(7658),a(7042),a(4916),a(5306),a(561),new o["default"]);const b={data:function(){return{possibleCourseRoute:[],CourseData:null,percentage:0,custonColor:"#409eff",options:[{value:"CS246",label:"CS246"},{value:"CS245",label:"CS245"}],value:[],Majoroptions:[{value:"ComputerScience",label:"ComputerScience"},{value:"CombinatoricsAndOptimization",label:"CombinatoricsAndOptimization"},{value:"ComputationalMathetics",label:"ComputationalMathetics"}],major:"",courseRequirements:{ComputationalMathematics:[{Number_required:1,requirement_type:"i of",Course:"Math 237, Math 247",Edit:!1},{Number_required:1,requirement_type:"i of",Course:"Math 239, Math 249",Edit:!1},{Number_required:3,requirement_type:"i of",Course:"CS371, CS230, CS234"}]}}},created:function(){var e=this;v.$on("DataSend",(function(t){e.CourseData=t,console.log("received!")})),this.InitRoute(),console.log(this.possibleCourseRoute)},methods:{InitRoute:function(){var e=[];for(var t in this.courseRequirements){var a=[];for(var o in e[t]=[],this.courseRequirements[t]){var r=this.courseRequirements[t][o].requirement_type,i=this.courseRequirements[t][o].Course.split(","),l=this.courseRequirements[t][o].Number_required,s=this.NCourseChooseK(i,l,r.includes("differentSubjectCodes"),r.includes("additionalCourse"));a=this.Sumroutes(s,a)}e[t]=a}this.possibleCourseRoute=e},Sumroutes:function(e,t){if(0==t.length)return e;var a=[];for(var o in t)a.push(this.generateCombinations(e,t[o]));var r=[];for(var i in a)for(var l in a[i])r.push(a[i][l]);return r},NCourseChooseK:function(e,t,a,o){var r=[],i=function a(o,i){return function(){if(i.length!=t)for(var l=o;l<e.length;l++)i.push(e[l]),a(l+1,i),i.pop();else r.push(i.slice())}};if(i(0,[]),!a)return r;for(var l in r){var s=[];for(var n in l)s.includes(n.replace(/\d+/g,""))?r.splice(l,1):s.push(n.replace(/\d+/g,""))}o&&r.push("additionalCourse")},generateCombinations:function(e,t){var a=[];if(e.includes("additionalCourse"))for(var o=e.slice(0,-1),r=0;r<o.length;r++){for(var i=0;i<t.length;i++)this.dictinctCourseSet(o[r],t[i])&&a.push([e[r],t[i]]);return a}else if(t.includes("additionalCourse"))for(var l=e.slice(0,-1),s=0;s<l.length;s++){for(var n=0;n<t.length;n++)this.dictinctCourseSet(l[s],t[n])&&a.push([e[s],t[n]]);return a}else for(var u=0;u<e.length;u++){for(var c=0;c<t.length;c++)a.push([e[u],t[c]]);return a}},dictinctCourseSet:function(e,t){for(var a in e)if(t.includes(e[a]))return!1;return!0},handleCourseChange:function(e){console.log(e),this.$notify({title:"Success",message:"Course updated",type:"success"}),this.UpdateProgressStatus(e,this.major)},handelMajorChange:function(e){console.log(e),this.$notify({title:"Success",message:"Major updated",type:"success"}),this.UpdateProgressStatus(this.value,e)},UpdateProgressStatus:function(e,t){if(console.log(this.possibleCourseRoute),""!=t){var a=[0,[]];for(var o in this.possibleCourseRoute[t]){var r=0;for(var i in e)this.possibleCourseRoute[t][o].includes(e[i])&&r++,r>a[0]&&(a[0]=r,a[1]=o)}this.precentage=a[0]/this.possibleCourseRoute[t][a[1]]*100,this.FindMaxRouteOtherThanCurrentMajor(e,t)}},FindMaxRouteOtherThanCurrentMajor:function(e,t){var a=["Major","Route",0];for(var o in this.possibleCourseRoute){var r=[0,[]];if(o!=t)for(var i in this.possibleCourseRoute[o]){var l=0;for(var s in e)this.possibleCourseRoute[o][i].includes(e[s])&&l++,l>r[0]&&(r[0]=l,r[1]=i)}r[1]>a[2]&&(a[0]=o,a[1]=r[1],a[2]=r[2]),this.SecondMajorPrecentage=a[0]/a[1].length*100}return a}}},m=b;var C=(0,l.Z)(m,p,h,!1,null,null,null);const g=C.exports;var y=function(){var e=this,t=e._self._c;return t("div",{staticClass:"header"},[e._v("Chatbot")])},_=[],S={},w=(0,l.Z)(S,y,_,!1,null,null,null);const M=w.exports;var x=function(){var e=this,t=e._self._c;return t("div",{staticClass:"total",staticStyle:{display:"inline-block",float:"left"}},[t("div",{staticClass:"init",staticStyle:{display:"inline-block",float:"left"}},[t("el-select",{staticStyle:{width:"500px",float:"left"},attrs:{placeholder:"Select a major you meant to configurate",filterable:"","allow-create":""},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}},e._l(e.Majoroptions,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1),t("el-button",{staticStyle:{width:"100px","margin-left":"10px"},attrs:{type:"primary"},on:{click:e.initializeTable}},[e._v(" Init / Enter ")]),t("div",{staticClass:"divider"},[t("span",{staticStyle:{float:"left"}},[e._v(" Editing: "+e._s(this.tableValue)+" ")]),t("el-button",{staticStyle:{float:"right"},on:{click:function(t){return e.addRow()}}},[e._v("add_Row")]),t("el-divider")],1)],1),t("div",{staticClass:"table",staticStyle:{"margin-top":"10px"}},[t("el-table",{attrs:{data:this.tableData[this.tableValue]}},[t("el-table-column",{attrs:{prop:"requirement_type",label:"requirement_type","max-height":"70px"},scopedSlots:e._u([{key:"default",fn:function(a){return[a.row.Edit?t("el-select",{attrs:{placeholder:"Select"},model:{value:a.row.requirement_type,callback:function(t){e.$set(a.row,"requirement_type",t)},expression:"scope.row.requirement_type"}},[t("el-option",{staticStyle:{width:"100px",float:"left"},attrs:{label:"i of (one of, two of)",value:"i of (one of, two of)"}}),t("el-option",{staticStyle:{width:"100px",float:"left"},attrs:{label:"i of additional",value:"i of additional"}}),t("el-option",{staticStyle:{width:"100px",float:"left"},attrs:{label:"i of additional (with different subject code)",value:"i of additional (with different subject code)"}})],1):t("p",[e._v(e._s(a.row.requirement_type))])]}}])}),t("el-table-column",{attrs:{prop:"Number_required",label:"Number_required"},scopedSlots:e._u([{key:"default",fn:function(a){return[a.row.Edit?t("el-input",{class:{"is-error":e.inputCheck(a.row.Number_required)},staticStyle:{width:"100px",float:"left"},on:{input:function(t){return e.inputCheck(a.row.Number_required)}},model:{value:a.row.Number_required,callback:function(t){e.$set(a.row,"Number_required",t)},expression:"scope.row.Number_required"}}):t("p",[e._v(e._s(a.row.Number_required))])]}}])}),t("el-table-column",{attrs:{prop:"Course",label:"Course"},scopedSlots:e._u([{key:"default",fn:function(a){return[a.row.Edit?t("el-input",{staticStyle:{width:"100px",float:"left"},model:{value:a.row.Course,callback:function(t){e.$set(a.row,"Course",t)},expression:"scope.row.Course"}}):t("p",[e._v(e._s(a.row.Course))])]}}])}),t("el-table-column",{attrs:{label:"addSection/Delete"},scopedSlots:e._u([{key:"default",fn:function(a){return[t("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.handleEdit(a.$index,a.row)}}},[e._v("Edit")]),t("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){return e.handleDelete(a.$index,a.row)}}},[e._v("Delete")])]}}])})],1),t("div",{staticClass:"footer",staticStyle:{display:"flex","margin-top":"10px"}},[t("el-button",{staticStyle:{width:"100px",float:"right"},attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.saveConfiguration()}}},[e._v("Save")])],1)],1)])},q=[],j=a(2434);a(7601);const k={data:function(){return{value:"CM",tableValue:"CM",Majoroptions:[{value:"CS",label:"Computer_Science"},{value:"CM",label:"Computational_Mathematics"},{value:"CO",label:"Combinatorics_and_Optimization"},{value:"PMath",label:"Pure_Mathematics"}],tableData:{CM:[{Number_required:1,requirement_type:"i of",Course:"Math 237, Math 247",Edit:!1}],CO:[{Number_required:1,requirement_type:"i of",Course:"Math 239, Math 249",Edit:!1}]},DataSend:{}}},created:function(){this.initializeTable(),console.log((0,j.Z)(this.tableData))},methods:{initializeTable:function(){console.log(this.value),this.tableValue=this.value,console.log(this.tableValue),this.$message({message:"Table updated",type:"success",showClose:!0});var e=0;for(var t in this.Majoroptions)if(this.value==this.Majoroptions[t].value){e=1;break}1===e?this.tableValue=this.value:(this.$message({message:"Major created",type:"warning",showClose:!0}),this.tableData[this.tableValue]=[{Number_required:0,requirement_type:"i of",Course:"",Edit:!1}],console.log(this.tableData),this.Majoroptions.push({value:this.value,label:this.value}))},handleEdit:function(e,t){t.Edit=!t.Edit},addRow:function(){var e=this.tableData;e[this.tableValue].push({Number_required:0,requirement_type:"i of",Course:"",Edit:!1}),this.tableData=e,this.$message({message:"Add successfully",type:"success",showClose:!0})},handleDelete:function(e,t){this.tableData[this.tableValue].splice(e,1),this.$message({message:"Delete successfully",type:"success",showClose:!0})},inputCheck:function(e){var t=/^[0-9]+$/;return!t.test(e)},saveConfiguration:function(){this.DataSend=this.tableData,v.$emit("DataSend",this.DataSend)}}},N=k;var R=(0,l.Z)(N,x,q,!1,null,null,null);const D=R.exports,O={components:{CourseInput:g,Chatbot:M,Configuration:D},data:function(){return{activeName:"CourseInput"}},created:function(){console.log(this.activeName)},methods:{handleTabClick:function(e,t){this.activeName=e.name,console.log(e,t)}}},E=O;var $=(0,l.Z)(E,d,f,!1,null,null,null);const P=$.exports;o["default"].use(c.ZP);var T=[{path:"",name:"popup",component:P}],Z=new c.ZP({mode:"history",base:"/",routes:T});const z=Z;var V=a(629);o["default"].use(V.ZP);const I=new V.ZP.Store({state:{},getters:{},mutations:{},actions:{},modules:{}});var A=a(4720),F=a.n(A);o["default"].use(F()),o["default"].config.productionTip=!1,new o["default"]({el:"#app",router:z,store:I,render:function(e){return e(u)}}).$mount("#app")}},t={};function a(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={id:o,loaded:!1,exports:{}};return e[o].call(i.exports,i,i.exports,a),i.loaded=!0,i.exports}a.m=e,(()=>{a.amdO={}})(),(()=>{var e=[];a.O=(t,o,r,i)=>{if(!o){var l=1/0;for(c=0;c<e.length;c++){for(var[o,r,i]=e[c],s=!0,n=0;n<o.length;n++)(!1&i||l>=i)&&Object.keys(a.O).every((e=>a.O[e](o[n])))?o.splice(n--,1):(s=!1,i<l&&(l=i));if(s){e.splice(c--,1);var u=r();void 0!==u&&(t=u)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[o,r,i]}})(),(()=>{a.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return a.d(t,{a:t}),t}})(),(()=>{a.d=(e,t)=>{for(var o in t)a.o(t,o)&&!a.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}})(),(()=>{a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{a.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{a.nmd=e=>(e.paths=[],e.children||(e.children=[]),e)})(),(()=>{var e={143:0};a.O.j=t=>0===e[t];var t=(t,o)=>{var r,i,[l,s,n]=o,u=0;if(l.some((t=>0!==e[t]))){for(r in s)a.o(s,r)&&(a.m[r]=s[r]);if(n)var c=n(a)}for(t&&t(o);u<l.length;u++)i=l[u],a.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return a.O(c)},o=self["webpackChunkmy_dev"]=self["webpackChunkmy_dev"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var o=a.O(void 0,[998],(()=>a(2865)));o=a.O(o)})();
//# sourceMappingURL=app.05f63f92.js.map