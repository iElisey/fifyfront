(function(){"use strict";var t={3114:function(t,e,s){var r=s(5471),o=s(8505),i=s(5486),n=function(){var t=this,e=t._self._c;return e(o.A,[e(i.A,[e("WordsComp")],1)],1)},a=[],c=s(2781),l=s(6521),d=s(1689),u=s(8834),h=s(1526),p=s(6278),f=s(1626),m=s(4089),A=s(8230),k=s(9456),w=s(3784),g=s(7614),y=s(8412),b=s(8274),v=s(7410),C=s(9940),T=s(7402),x=function(){var t=this,e=t._self._c;return e(o.A,[e(m.A,{attrs:{persistent:"","max-width":"400px"},model:{value:t.isBlocked,callback:function(e){t.isBlocked=e},expression:"isBlocked"}},[e(d.A,[e(u.ri,{staticClass:"text-h5"},[t._v("Access Blocked")]),e(u.OQ,[e("p",[t._v("You have exceeded the maximum number of login attempts. Your IP is blocked.")])])],1)],1),t.isBlocked?t._e():e(m.A,{attrs:{persistent:"","max-width":"400px"},model:{value:t.showPasswordDialog,callback:function(e){t.showPasswordDialog=e},expression:"showPasswordDialog"}},[e(d.A,[e(u.ri,{staticClass:"text-h5"},[t._v("Login")]),e(u.OQ,[e(C.A,{attrs:{label:"Username",outlined:"",autofocus:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.focusPassword.apply(null,arguments)}},model:{value:t.usernameInput,callback:function(e){t.usernameInput=e},expression:"usernameInput"}}),e(C.A,{ref:"passwordField",attrs:{label:"Password",type:"password",outlined:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.checkCredentials.apply(null,arguments)}},model:{value:t.passwordInput,callback:function(e){t.passwordInput=e},expression:"passwordInput"}}),t.loginError?e(c.A,{attrs:{type:"error",dense:""}},[t._v(" Incorrect username or password. Attempts left: "+t._s(3-t.loginAttempts)+" ")]):t._e()],1),e(u.SL,[e(l.A,{attrs:{color:"primary",block:""},on:{click:t.checkCredentials}},[t._v("Submit")])],1)],1)],1),t.isAuthenticated?e(p.A,{attrs:{fluid:""}},[e(y.A,{staticClass:"mb-4",attrs:{justify:"center"}},[e(l.A,{attrs:{color:"primary",large:""},on:{click:t.openTestDialog}},[e(k.A,{attrs:{left:""}},[t._v("mdi-play")]),t._v(" Start Test ")],1)],1),e(m.A,{attrs:{"max-width":"600px",fullscreen:t.$vuetify.breakpoint.xs,persistent:""},model:{value:t.testDialog,callback:function(e){t.testDialog=e},expression:"testDialog"}},[e(d.A,[e(u.ri,{staticClass:"text-h5"},[t._v(" "+t._s(t.testStarted?"Test in Progress":"Start a Test")+" "),e(v.A),e(l.A,{attrs:{icon:""},on:{click:t.closeTestDialog}},[e(k.A,[t._v("mdi-close")])],1)],1),t.testStarted?t._e():e(u.OQ,[e(b.A,{attrs:{items:["All Topics",...t.uniqueTopics],label:"Select Topic",outlined:"","prepend-icon":"mdi-book-open-variant"},model:{value:t.selectedTopic,callback:function(e){t.selectedTopic=e},expression:"selectedTopic"}}),e(g.A,{attrs:{row:"",dense:""},model:{value:t.testDirection,callback:function(e){t.testDirection=e},expression:"testDirection"}},[e(w.A,{attrs:{label:"Eng → Ukr",value:"engToUkr"}}),e(w.A,{attrs:{label:"Ukr → Eng",value:"ukrToEng"}})],1),e(b.A,{attrs:{items:["Open-ended","Multiple Choice","Word Memory Match"],label:"Test Type",outlined:""},model:{value:t.testType,callback:function(e){t.testType=e},expression:"testType"}}),e(b.A,{attrs:{items:[5,10,20,"All"],label:"Number of Questions",outlined:""},model:{value:t.questionsCount,callback:function(e){t.questionsCount=e},expression:"questionsCount"}})],1),t.testStarted&&"Open-ended"===t.testType?e(u.OQ,[e("p",{staticClass:"text-h6"},[t._v("Translate: "),e("strong",[t._v(t._s(t.questionText))])]),e(C.A,{attrs:{label:"Your answer",outlined:"",autofocus:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.checkAnswer.apply(null,arguments)}},model:{value:t.userAnswer,callback:function(e){t.userAnswer=e},expression:"userAnswer"}}),t.answerChecked?e(c.A,{staticClass:"mt-4",attrs:{type:t.isCorrect?"success":"error",dense:""}},[t._v(" "+t._s(t.isCorrect?"Correct!":`Incorrect. Correct answer: ${t.correctAnswer}`)+" ")]):t._e(),e(y.A,{staticClass:"mt-2"},[e(h.A,{attrs:{cols:"12",sm:"6"}},[e(l.A,{attrs:{color:"primary",large:"",block:""},on:{click:t.checkAnswer}},[e(k.A,{attrs:{left:""}},[t._v("mdi-check")]),t._v(" Submit ")],1)],1),e(h.A,{attrs:{cols:"12",sm:"6"}},[e(l.A,{attrs:{color:"error",large:"",block:""},on:{click:t.stopTest}},[e(k.A,{attrs:{left:""}},[t._v("mdi-stop")]),t._v(" Stop Test ")],1)],1)],1)],1):t._e(),t.testStarted&&"Multiple Choice"===t.testType?e(u.OQ,[e("p",{staticClass:"text-h6"},[t._v("Translate: "),e("strong",[t._v(t._s(t.questionText))])]),e(y.A,{staticClass:"mt-4"},t._l(t.options,(function(s,r){return e(h.A,{key:r,attrs:{cols:"12",sm:"6"}},[e(l.A,{staticClass:"mb-2 clean-btn",attrs:{color:t.selectedOption===s?t.isCorrect?"success":"error":"grey lighten-2",block:""},on:{click:function(e){return t.selectOption(s)}}},[t._v(" "+t._s(s)+" ")])],1)})),1),t.answerChecked?e(c.A,{staticClass:"mt-4",attrs:{type:t.isCorrect?"success":"error",dense:""}},[t._v(" "+t._s(t.isCorrect?"Correct!":`Incorrect. Correct answer: ${t.correctAnswer}`)+" ")]):t._e(),e(l.A,{staticClass:"mt-2",attrs:{color:"error",large:"",block:""},on:{click:t.stopTest}},[e(k.A,{attrs:{left:""}},[t._v("mdi-stop")]),t._v(" Stop Test ")],1)],1):t._e(),t.testStarted&&"Word Memory Match"===t.testType?e(u.OQ,[e(y.A,t._l(t.memoryCards,(function(s,r){return e(h.A,{key:r,attrs:{cols:"6",sm:"3"}},[e(d.A,{staticClass:"memory-card",attrs:{color:s.flipped||s.matched?"primary":"grey lighten-2"},on:{click:function(e){return t.flipCard(r)}}},[e(u.OQ,{staticClass:"text-center"},[t._v(" "+t._s(s.flipped||s.matched?s.text:"???")+" ")])],1)],1)})),1),e(y.A,{staticClass:"mt-4"},[e(h.A,{attrs:{cols:"12",sm:"6"}},[e(l.A,{attrs:{color:"primary",large:"",block:""},on:{click:t.resetMemoryGame}},[e(k.A,{attrs:{left:""}},[t._v("mdi-restart")]),t._v(" Restart ")],1)],1),e(h.A,{attrs:{cols:"12",sm:"6"}},[e(l.A,{attrs:{color:"error",large:"",block:""},on:{click:t.stopTest}},[e(k.A,{attrs:{left:""}},[t._v("mdi-stop")]),t._v(" Stop Test ")],1)],1)],1)],1):t._e(),t.testStarted?t._e():e(u.SL,[e(l.A,{attrs:{color:"grey",text:""},on:{click:function(e){t.testDialog=!1}}},[t._v("Cancel")]),e(l.A,{attrs:{color:"primary",disabled:!t.selectedTopic},on:{click:t.startTest}},[t._v("Start")])],1)],1)],1),e(d.A,{staticClass:"pa-5 clean-card"},[e(u.ri,{staticClass:"text-h5"},[t._v("Word List")]),e(C.A,{staticClass:"mb-4",attrs:{label:"Search words",outlined:"","prepend-inner-icon":"mdi-magnify",clearable:""},model:{value:t.searchQuery,callback:function(e){t.searchQuery=e},expression:"searchQuery"}}),e(A.A,{on:{submit:function(e){return e.preventDefault(),t.addWordsFromInput.apply(null,arguments)}}},[e(y.A,[e(h.A,{attrs:{cols:"12",sm:"9"}},[e(T.A,{attrs:{label:"Enter words (e.g., eng=ukr=topic)",outlined:"",placeholder:"apple=яблуко=food",rows:"2"},model:{value:t.bulkWords,callback:function(e){t.bulkWords=e},expression:"bulkWords"}})],1),e(h.A,{attrs:{cols:"12",sm:"3"}},[e(l.A,{attrs:{color:"primary",block:"",large:""},on:{click:t.addWordsFromInput}},[t._v("Add Bulk")])],1)],1)],1),e(A.A,{on:{submit:function(e){return e.preventDefault(),t.addWord.apply(null,arguments)}}},[e(y.A,[e(h.A,{attrs:{cols:"12",sm:"4"}},[e(C.A,{attrs:{label:"English",outlined:"",required:""},model:{value:t.newWord.english,callback:function(e){t.$set(t.newWord,"english",e)},expression:"newWord.english"}})],1),e(h.A,{attrs:{cols:"12",sm:"4"}},[e(C.A,{attrs:{label:"Ukrainian",outlined:"",required:""},model:{value:t.newWord.ukrainian,callback:function(e){t.$set(t.newWord,"ukrainian",e)},expression:"newWord.ukrainian"}})],1),e(h.A,{attrs:{cols:"12",sm:"2"}},[e(C.A,{attrs:{label:"Topic",outlined:""},model:{value:t.newWord.topic,callback:function(e){t.$set(t.newWord,"topic",e)},expression:"newWord.topic"}})],1),e(h.A,{attrs:{cols:"12",sm:"2"}},[e(l.A,{attrs:{color:"primary",block:"",large:""},on:{click:t.addWord}},[t._v("Add")])],1)],1)],1),e(f.A,{staticClass:"mt-4 clean-table",attrs:{headers:t.headers,items:t.filteredWordsList,"sort-by":"id","sort-desc":!0},scopedSlots:t._u([{key:"item.english",fn:function({item:s}){return[e(C.A,{attrs:{dense:""},model:{value:s.english,callback:function(e){t.$set(s,"english",e)},expression:"item.english"}})]}},{key:"item.ukrainian",fn:function({item:s}){return[e(C.A,{attrs:{dense:""},model:{value:s.ukrainian,callback:function(e){t.$set(s,"ukrainian",e)},expression:"item.ukrainian"}})]}},{key:"item.topic",fn:function({item:s}){return[e(C.A,{attrs:{dense:""},model:{value:s.topic,callback:function(e){t.$set(s,"topic",e)},expression:"item.topic"}})]}},{key:"item.createdAt",fn:function({item:s}){return[e(C.A,{attrs:{value:t.formatDate(s.createdAt),dense:""},model:{value:s.createdAt,callback:function(e){t.$set(s,"createdAt",e)},expression:"item.createdAt"}})]}},{key:"item.actions",fn:function({item:s}){return[e(l.A,{attrs:{color:"success",icon:""},on:{click:function(e){return t.updateWord(s)}}},[e(k.A,[t._v("mdi-content-save")])],1),e(l.A,{attrs:{color:"error",icon:""},on:{click:function(e){return t.deleteWord(s.id)}}},[e(k.A,[t._v("mdi-delete")])],1)]}}],null,!0)})],1)],1):t._e()],1)},_=[],W=(s(4114),s(8111),s(2489),s(1701),s(7642),s(8004),s(3853),s(5876),s(2475),s(5024),s(1698),s(4335)),I={data(){return{showPasswordDialog:!0,usernameInput:"",passwordInput:"",loginError:!1,isAuthenticated:!1,loginAttempts:0,userIP:"",isBlocked:!1,blockedIPs:[],words:[],url:"https://fify-hhc6asgfhsctg0hj.francecentral-01.azurewebsites.net",newWord:{english:"",ukrainian:"",topic:""},bulkWords:"",searchQuery:"",testDialog:!1,selectedTopic:null,testDirection:"engToUkr",testType:"Open-ended",questionsCount:"All",testWords:[],currentQuestion:null,questionText:"",correctAnswer:"",userAnswer:"",selectedOption:null,options:[],testStarted:!1,answerChecked:!1,isCorrect:!1,correctAnswers:0,totalQuestions:0,memoryCards:[],flippedCards:[],matchedPairs:0,headers:[{text:"ID",value:"id",align:"start",sortable:!0},{text:"English",value:"english"},{text:"Ukrainian",value:"ukrainian"},{text:"Topic",value:"topic"},{text:"Created at",value:"createdAt"},{text:"Actions",value:"actions",align:"center",sortable:!1}]}},computed:{uniqueTopics(){const t=this.words.map((t=>t.topic)).filter(Boolean);return[...new Set(t)]},filteredWords(){return"All Topics"===this.selectedTopic?this.words:this.words.filter((t=>t.topic===this.selectedTopic))},filteredWordsList(){if(!this.searchQuery)return this.words;const t=this.searchQuery.toLowerCase();return this.words.filter((e=>e.english.toLowerCase().includes(t)||e.ukrainian.toLowerCase().includes(t)))}},methods:{formatDate(t){if(!t)return"";const e=new Date(t);return e.toLocaleDateString("uk-UA",{day:"2-digit",month:"long",year:"numeric"})},async fetchUserIP(){try{const t=await fetch("https://api.ipify.org?format=json"),e=await t.json();this.userIP=e.ip,this.checkIfBlocked()}catch(t){console.error("Error fetching IP:",t),this.userIP="unknown",this.checkIfBlocked()}},checkIfBlocked(){const t=JSON.parse(localStorage.getItem("blockedIPs")||"[]");this.blockedIPs=t,this.blockedIPs.includes(this.userIP)&&(this.isBlocked=!0,this.showPasswordDialog=!1)},blockIP(){this.blockedIPs.push(this.userIP),localStorage.setItem("blockedIPs",JSON.stringify(this.blockedIPs)),this.isBlocked=!0,this.showPasswordDialog=!1},focusPassword(){this.$refs.passwordField.focus()},async checkCredentials(){try{const t=await W.A.post(`${this.url}/api/login`,{username:this.usernameInput,password:this.passwordInput,ip:this.userIP});t.data.success?(this.isAuthenticated=!0,this.showPasswordDialog=!1,this.loginError=!1,this.loginAttempts=0,this.fetchWords()):(this.loginAttempts++,this.loginError=!0,this.passwordInput="",this.usernameInput="",this.loginAttempts>=3&&this.blockIP())}catch(t){console.error("Login error:",t),this.loginError=!0,this.loginAttempts++,this.loginAttempts>=3&&this.blockIP()}},async addWordsFromInput(){if(!this.bulkWords)return;const t=this.bulkWords.split("\n").filter((t=>t.trim())),e=t.map((t=>{const[e,s,r]=t.split("=");return{english:e?.trim()||"",ukrainian:s?.trim()||"",topic:r?.trim()||"other"}})).filter((t=>t.english&&t.ukrainian));if(0!==e.length)try{await W.A.post(`${this.url}/api/words`,e),this.bulkWords="",this.fetchWords()}catch(s){console.error("Error adding bulk words:",s)}},async fetchWords(){try{const t=await W.A.get(`${this.url}/api`);this.words=t.data,console.log(this.words[1436],this.words[1435])}catch(t){console.error("Error fetching words:",t)}},async addWord(){if(this.newWord.english&&this.newWord.ukrainian)try{await W.A.post(`${this.url}/api`,this.newWord),this.newWord={english:"",ukrainian:"",topic:""},this.fetchWords()}catch(t){console.error("Error adding word:",t)}},async updateWord(t){try{await W.A.put(`${this.url}/api`,t),this.fetchWords()}catch(e){console.error("Error updating word:",e)}},async deleteWord(t){try{await W.A.delete(`${this.url}/api?id=${t}`),this.fetchWords()}catch(e){console.error("Error deleting word:",e)}},openTestDialog(){this.testDialog=!0,this.testStarted=!1,this.resetTestState()},closeTestDialog(){this.testDialog=!1,this.testStarted=!1,this.resetTestState()},startTest(){let t=this.shuffleArray([...this.filteredWords]);if("All"!==this.questionsCount){const e=Math.min(this.questionsCount,t.length);t=t.slice(0,e)}this.testWords=t,this.totalQuestions=this.testWords.length,this.correctAnswers=0,this.testStarted=!0,"Word Memory Match"===this.testType?this.startMemoryGame():this.nextQuestion()},nextQuestion(){if(0===this.testWords.length)return void this.endTest();const t=Math.floor(Math.random()*this.testWords.length);this.currentQuestion=this.testWords[t],this.testWords.splice(t,1),this.questionText="engToUkr"===this.testDirection?this.currentQuestion.english:this.currentQuestion.ukrainian,this.correctAnswer="engToUkr"===this.testDirection?this.currentQuestion.ukrainian:this.currentQuestion.english,this.userAnswer="",this.selectedOption=null,this.answerChecked=!1,"Multiple Choice"===this.testType&&this.generateOptions()},generateOptions(){const t=this.words.map((t=>"engToUkr"===this.testDirection?t.ukrainian:t.english)),e=t.filter((t=>t!==this.correctAnswer)),s=this.shuffleArray(e);this.options=[this.correctAnswer,...s.slice(0,3)].sort((()=>.5-Math.random()))},selectOption(t){this.selectedOption=t,this.answerChecked=!0,this.isCorrect=this.selectedOption===this.correctAnswer,this.isCorrect&&this.correctAnswers++,setTimeout((()=>this.nextQuestion()),1e3)},checkAnswer(){this.answerChecked=!0,this.isCorrect=this.userAnswer.toLowerCase()===this.correctAnswer.toLowerCase(),this.isCorrect&&this.correctAnswers++,setTimeout((()=>this.nextQuestion()),1e3)},stopTest(){this.testStarted=!1,alert(`Test stopped! Results: ${this.correctAnswers} correct out of ${this.totalQuestions}`)},endTest(){this.testStarted=!1,alert(`Test completed! Results: ${this.correctAnswers} correct out of ${this.totalQuestions}`)},startMemoryGame(){const t=this.shuffleArray(this.testWords).slice(0,8),e=[...t.map((t=>({text:t.english,pair:t.ukrainian,flipped:!1,matched:!1}))),...t.map((t=>({text:t.ukrainian,pair:t.english,flipped:!1,matched:!1})))];this.memoryCards=this.shuffleArray(e),this.flippedCards=[],this.matchedPairs=0,this.totalQuestions=this.memoryCards.length/2,this.correctAnswers=0},flipCard(t){const e=this.memoryCards[t];if(!(e.flipped||e.matched||this.flippedCards.length>=2)&&(e.flipped=!0,this.flippedCards.push({index:t,card:e}),this.$forceUpdate(),2===this.flippedCards.length)){const[t,e]=this.flippedCards;t.card.pair===e.card.text&&e.card.pair===t.card.text?(t.card.matched=!0,e.card.matched=!0,this.matchedPairs++,this.correctAnswers++,this.flippedCards=[],this.matchedPairs===this.memoryCards.length/2&&setTimeout((()=>{alert(`Test completed! Results: ${this.correctAnswers} correct out of ${this.totalQuestions}`),this.testStarted=!1}),500)):setTimeout((()=>{t.card.flipped=!1,e.card.flipped=!1,this.flippedCards=[],this.$forceUpdate()}),1e3)}},resetMemoryGame(){this.startMemoryGame()},resetTestState(){this.testWords=[],this.currentQuestion=null,this.questionText="",this.correctAnswer="",this.userAnswer="",this.selectedOption=null,this.options=[],this.answerChecked=!1,this.isCorrect=!1,this.correctAnswers=0,this.totalQuestions=0,this.memoryCards=[],this.flippedCards=[],this.matchedPairs=0},shuffleArray(t){for(let e=t.length-1;e>0;e--){const s=Math.floor(Math.random()*(e+1));[t[e],t[s]]=[t[s],t[e]]}return t}},mounted(){this.fetchUserIP()}},P=I,S=s(1656),O=(0,S.A)(P,x,_,!1,null,"595167f4",null),D=O.exports,Q={name:"App",components:{WordsComp:D},data:()=>({})},$=Q,M=(0,S.A)($,n,a,!1,null,null,null),E=M.exports,q=s(5453);r.Ay.use(q.A);var U=new q.A({});r.Ay.config.productionTip=!1,new r.Ay({vuetify:U,render:t=>t(E)}).$mount("#app")}},e={};function s(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r].call(i.exports,i,i.exports,s),i.exports}s.m=t,function(){var t=[];s.O=function(e,r,o,i){if(!r){var n=1/0;for(d=0;d<t.length;d++){r=t[d][0],o=t[d][1],i=t[d][2];for(var a=!0,c=0;c<r.length;c++)(!1&i||n>=i)&&Object.keys(s.O).every((function(t){return s.O[t](r[c])}))?r.splice(c--,1):(a=!1,i<n&&(n=i));if(a){t.splice(d--,1);var l=o();void 0!==l&&(e=l)}}return e}i=i||0;for(var d=t.length;d>0&&t[d-1][2]>i;d--)t[d]=t[d-1];t[d]=[r,o,i]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var r in e)s.o(e,r)&&!s.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={524:0};s.O.j=function(e){return 0===t[e]};var e=function(e,r){var o,i,n=r[0],a=r[1],c=r[2],l=0;if(n.some((function(e){return 0!==t[e]}))){for(o in a)s.o(a,o)&&(s.m[o]=a[o]);if(c)var d=c(s)}for(e&&e(r);l<n.length;l++)i=n[l],s.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return s.O(d)},r=self["webpackChunkfifyfront"]=self["webpackChunkfifyfront"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=s.O(void 0,[504],(function(){return s(3114)}));r=s.O(r)})();
//# sourceMappingURL=app.05106dcd.js.map