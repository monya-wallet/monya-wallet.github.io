(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{1386:function(t,e,s){(function(e){s(127);var n=s(15),i=s(17),a=(s(87),s(154)),o=s(1481).RippleAPI,r=s(542),c=(s(65),s(86)),v=s(109);s(153);t.exports=s(7)({ja:s(1699),en:s(1700)})({data:function(){return{sendAmount:0,sendAddress:"",fiatConv:0,password:"",address:"",qrDataUrl:"",shareable:n.shareable(),incorrect:!1,requirePassword:!0,api:null,connected:!1,loading:!1,plzActivate:!1,balances:null,keyPair:null,sent:!1,histError:!1,history:null,memo:"",destTag:0,server:"wss://s2.ripple.com:443",confirm:!1,price:1,serverDlg:!1,invAmt:""}},store:s(12),methods:{getBalance:function(){var t=this;this.address&&this.connected&&(this.loading=!0,this.api.getBalances(this.address).then(function(e){return t.$set(t,"balances",e),t.loading=!1,t.plzActivate=!1,t.api.request("account_tx",{account:t.address,limit:20})}).then(function(e){var s=e.transactions.map(function(e){var s=e.tx,n={type:"unknown"};return"Payment"===s.TransactionType&&(s.Account===t.address?n.type="send":s.Destination===t.address&&(n.type="receive"),n.srcAddr=s.Account,n.destAddr=s.Destination,s.Amount.currency?n.amount=s.Amount:n.amount={value:s.Amount/1e6,currency:"XRP"}),n});t.$set(t,"history",s)}).catch(function(e){t.loading=!1,e&&e.data&&"actNotFound"===e.data.error?t.plzActivate=!0:t.$store.commit("setError",e.message)}))},copyAddress:function(){n.copy(this.address)},share:function(t){var e=this,s=t.target.getBoundingClientRect(),i=s.left+","+s.top+","+s.width+","+s.height;n.share({url:this.url},i).then(function(){}).catch(function(){e.copyAddress()})},send:function(){var t=this;this.confirm=!1,this.loading=!0;var a=Math.floor(1e6*parseFloat(this.sendAmount)),o={source:{address:this.address,maxAmount:{value:(a/1e6).toString(),currency:"XRP"}},destination:{address:this.sendAddress,amount:{value:(a/1e6).toString(),currency:"XRP"},tag:0|this.destTag},memos:[{data:this.memo}]};Promise.all([this.api.preparePayment(this.address,o,{maxLedgerVersionOffset:5}),i.get("keyPairs")]).then(function(s){var i=r.generateSeed({entropy:e.from(n.decrypt(s[1].entropy,t.password),"hex")}),a=t.api.sign(s[0].txJSON,i);return t.api.submit(a.signedTransaction)}).then(function(e){t.loading=!1,"tesSUCCESS"===e.resultCode?(t.sendAddress="",t.sendAmount=0,t.memo="",t.destTag=0,t.$store.commit("setFinishNextPage",{page:s(184),infoId:"sent",payload:{txId:""}}),t.$emit("replace",s(110))):t.$store.commit("setError",e.resultCode+":"+e.resultMessage)}).catch(function(e){t.loading=!1,t.$store.commit("setError",e.message)})},connect:function(){var t=this;this.loading=!0,this.serverDlg=!1,this.api=new o({server:this.server||"wss://s2.ripple.com:443"}),this.api.connect().then(function(){t.connected=!0,t.loading=!1,t.getBalance()}).catch(function(e){t.loading=!1,t.$store.commit("setError",e.message)}),this.api.on("error",function(e){var s=e.error;e.type,e.value;t.$store.commit("setError",s)})},getPrice:function(){var t=this;c({url:"https://public.bitbank.cc/xrp_jpy/ticker",method:"GET"}).then(function(e){return t.price=e.data.data.last,n.getPrice("jpy",t.$store.state.fiat)}).then(function(e){t.price*=e}).catch(function(){t.price=1})},getQrCode:function(){var t=this;a.toDataURL(this.url,{errorCorrectionLevel:"M",type:"image/png"},function(e,s){t.qrDataUrl=s})}},computed:{url:function(){return n.getBip21("ripple",this.address,{amount:parseFloat(this.invAmt),label:this.invMosaic},"url"===this.addressFormat)}},watch:{fiatConv:function(t){this.sendAmount=parseFloat(t)/this.price},sendAmount:function(t){this.fiatConv=parseFloat(t)*this.price},invAmt:function(){this.getQrCode()}},mounted:function(){var t=this,e=this.$store.state.extensionSend||{},n=parseFloat(e.amount)||0;e.address&&(this.sendAddress=e.address,this.sendAmount=n),this.$store.commit("setExtensionSend",{}),this.connect(),this.getPrice(),v.extStorage("xrp").get("address").then(function(e){e?(t.address=e,t.getBalance(),t.getQrCode(),t.sendAddress&&(t.sendMenu=!0)):t.$emit("push",{extends:s(341),data:function(){return{requirePassword:!0}}})})}})}).call(this,s(4).Buffer)},1493:function(t,e){},1612:function(t,e){},1644:function(t,e){},1699:function(t,e,s){var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-ons-page",{attrs:{"data-page":"xrp"}},[s("custom-bar",{attrs:{title:"Ripple",menu:"true"}},[s("v-ons-toolbar-button",{on:{click:t.getBalance,contextmenu:function(e){t.serverDlg=!0}}},[s("v-ons-icon",{attrs:{icon:"ion-ios-loop-strong"}})],1)],1),t._v(" "),s("div",[s("div",{directives:[{name:"show",rawName:"v-show",value:t.address,expression:"address"}]},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.plzActivate,expression:"plzActivate"}],staticClass:"description"},[s("h1",[t._v("リップル")]),t._v(" "),s("p",[t._v("\n          リップルとは、ビットコインにインスパイヤされた高速な国際送金を実現するために作られた分散型台帳システムです。現在では、その高速な着金のため"),s("b",[t._v("決済システム")]),t._v("としても利用されています。 "),s("br")]),t._v(" "),s("p",[t._v("\n          Q. ビットコインと何が違うの? "),s("br"),t._v("\n          A. ビットコインは、ブロックチェーンを用いています。その書き込み権利はプルーフ・オブ・ワークによって決定されています。この欠点は、時間がかかること、大量のエネルギーを消費することです。それに対してリップルはリップルレジャーというブロックチェーンとは一味違う台帳に書き込んでいます。リップルは、書き込む権限を制限する代わりに、"),s("b",[t._v("エネルギーを無駄にせず、数秒で取引を完了")]),t._v("することができます。")]),t._v(" "),s("p",[t._v("\n          Q. つまり、リップルは中央集権なの？ "),s("br"),t._v("\n          A. はい、まさにその通りです。書き込む権限を持った人たちが裏切ったらネットワークは崩壊します。\n        ")]),t._v(" "),s("p",[t._v("\n          Q. パブリックチェーンなの？プライベートチェーンなの？ "),s("br"),t._v("\n          A. ブロックチェーンじゃないのでどちらでもありません。大事なことなので二回言います。"),s("b",[t._v("リップルはブロックチェーンを使っていません")])]),t._v(" "),s("p",[t._v("\n          リップルを始めるには、下記のリップルアドレスに 20 XRP を送金してアカウントを有効化してください。\n        ")])]),t._v(" "),s("div",{attrs:{id:"simp1le"}},[s("div",{attrs:{id:"qrArea"}},[s("div",{attrs:{id:"qrcode"}},[s("img",{attrs:{src:t.qrDataUrl,alt:"No Address",id:"qrcodeImage"}})]),t._v(" "),s("div",{staticClass:"address"},[t._v(t._s(t.address||"読み込み中"))])]),t._v(" "),s("p",[s("v-ons-input",{attrs:{placeholder:"請求額",type:"number"},model:{value:t.invAmt,callback:function(e){t.invAmt=e},expression:"invAmt"}})],1),t._v(" "),s("v-ons-button",{attrs:{modifier:"quiet"},on:{click:t.copyAddress}},[s("v-ons-icon",{attrs:{icon:"fa-clipboard"}}),t._v("\n          アドレスコピー\n        ")],1),t._v(" "),t.shareable?s("v-ons-button",{attrs:{modifier:"quiet"},on:{click:t.share}},[s("v-ons-icon",{attrs:{icon:"fa-share-square-o"}}),t._v("共有\n        ")],1):t._e()],1),t._v(" "),s("v-ons-list",{directives:[{name:"show",rawName:"v-show",value:!t.plzActivate,expression:"!plzActivate"}]},[s("v-ons-list-header",[t._v("残高")]),t._v(" "),t._l(t.balances,function(e){return s("v-ons-list-item",[s("div",{staticClass:"center"},[t._v(t._s(e.value))]),t._v(" "),s("div",{staticClass:"right"},[t._v(t._s(e.currency))])])}),t._v(" "),s("v-ons-list-header",[t._v("送る")]),t._v(" "),s("v-ons-list-item",[s("v-ons-input",{attrs:{placeholder:"送金先アドレス"},model:{value:t.sendAddress,callback:function(e){t.sendAddress=e},expression:"sendAddress"}})],1),t._v(" "),s("v-ons-list-item",[s("div",{staticClass:"center"},[t._v("相手に送金する金額")]),t._v(" "),s("div",{staticClass:"right"},[s("v-ons-input",{attrs:{type:"number"},model:{value:t.sendAmount,callback:function(e){t.sendAmount=e},expression:"sendAmount"}})],1)]),t._v(" "),s("v-ons-list-item",[s("div",{staticClass:"center"},[t._v("法定通貨換算")]),t._v(" "),s("div",{staticClass:"right"},[s("v-ons-input",{attrs:{type:"number"},model:{value:t.fiatConv,callback:function(e){t.fiatConv=e},expression:"fiatConv"}})],1)]),t._v(" "),s("v-ons-list-item",[s("div",{staticClass:"center"},[t._v("宛先タグ")]),t._v(" "),s("div",{staticClass:"right"},[s("v-ons-input",{attrs:{type:"number"},model:{value:t.destTag,callback:function(e){t.destTag=e},expression:"destTag"}})],1)]),t._v(" "),s("v-ons-list-item",[s("v-ons-input",{attrs:{placeholder:"メモ"},model:{value:t.memo,callback:function(e){t.memo=e},expression:"memo"}})],1),t._v(" "),s("v-ons-list-item",[s("v-ons-input",{attrs:{placeholder:"パスワード",type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),t._v(" "),s("v-ons-list-item",[s("v-ons-button",{attrs:{modifier:"large",disabled:!t.sendAddress||!t.sendAmount},on:{click:function(e){t.confirm=!0}}},[t._v("送信")])],1),t._v(" "),s("v-ons-list-header",[t._v("履歴")]),t._v(" "),t._l(t.history,function(e){return s("v-ons-list-item",["send"===e.type?s("div",{staticClass:"left"},[t._v("送金")]):t._e(),t._v(" "),"receive"===e.type?s("div",{staticClass:"left"},[t._v("受け取り")]):t._e(),t._v(" "),"unknown"===e.type?s("div",{staticClass:"left"},[t._v("非対応のコマンド")]):t._e(),t._v(" "),"send"===e.type?s("div",{staticClass:"center"},[t._v(t._s(e.destAddr))]):t._e(),t._v(" "),"receive"===e.type?s("div",{staticClass:"center"},[t._v(t._s(e.srcAddr))]):t._e(),t._v(" "),"unknown"!==e.type?s("div",{staticClass:"right"},[s("currency-set",{attrs:{amount:e.amount.value,ticker:e.amount.currency,notKnown:!0}})],1):t._e()])}),t._v(" "),s("v-ons-list-item",{on:{click:function(e){t.serverDlg=!0}}},[t._v("\n          サーバー変更\n        ")])],2)],1)]),t._v(" "),s("v-ons-modal",{attrs:{visible:t.loading}},[s("p",{staticStyle:{"text-align":"center"}},[t._v("\n      処理中\n      "),s("br"),s("br")]),s("div",{staticClass:"spinner"}),t._v(" "),s("br"),t._v(" "),s("p")]),t._v(" "),s("v-ons-alert-dialog",{attrs:{modifier:"rowfooter",visible:t.confirm},on:{"update:visible":function(e){t.confirm=e}}},[s("span",{attrs:{slot:"title"},slot:"title"},[t._v("送金確認")]),t._v(" "),s("p",[t._v(t._s(t.sendAddress))]),t._v(" "),s("p",[t._v(t._s(t.sendAmount)+"XRP")]),t._v(" "),s("p",[t._v("失敗しても手数料がかかるときがあるので注意")]),t._v(" "),s("template",{slot:"footer"},[s("div",{staticClass:"alert-dialog-button",on:{click:t.send}},[t._v("送金")]),t._v(" "),s("div",{staticClass:"alert-dialog-button",on:{click:function(e){t.confirm=!1}}},[t._v("戻る")])])],2),t._v(" "),s("v-ons-alert-dialog",{attrs:{modifier:"rowfooter",visible:t.serverDlg},on:{"update:visible":function(e){t.serverDlg=e}}},[s("span",{attrs:{slot:"title"},slot:"title"},[t._v("サーバー変更")]),t._v(" "),s("p",[s("v-ons-input",{attrs:{placeholder:"wss://s2.ripple.com:443"},model:{value:t.server,callback:function(e){t.server=e},expression:"server"}})],1),t._v(" "),s("template",{slot:"footer"},[s("div",{staticClass:"alert-dialog-button",on:{click:function(e){t.serverDlg=!1}}},[t._v("閉じる")]),t._v(" "),s("div",{staticClass:"alert-dialog-button",on:{click:t.connect}},[t._v("接続")])])],2)],1)},i=[];t.exports=function(t){var e="function"==typeof t?t.options:t;return e.render=n,e.staticRenderFns=i,t}},1700:function(t,e,s){var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-ons-page",{attrs:{"data-page":"xrp"}},[s("custom-bar",{attrs:{title:"Ripple",menu:"true"}},[s("v-ons-toolbar-button",{on:{click:t.getBalance,contextmenu:function(e){t.serverDlg=!0}}},[s("v-ons-icon",{attrs:{icon:"ion-ios-loop-strong"}})],1)],1),t._v(" "),s("div",[s("div",{directives:[{name:"show",rawName:"v-show",value:t.address,expression:"address"}]},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.plzActivate,expression:"plzActivate"}],staticClass:"description"},[s("h1",[t._v("Ripple")]),t._v(" "),s("p",[t._v("\n          Ripple is the distributed ledger system to send funds internationally, inspired by bitcoin. But by its fast money reception, it is also used as "),s("b",[t._v("Payment System")]),t._v(".  "),s("br")]),t._v(" "),s("p",[t._v("\n          Q. What is the difference between bitcoin?? "),s("br"),t._v("\n          A. Bitcoin uses the blockchain. The right to write it is decided by Proof of Work. Shortcomings is that it consumes many time and energy. Whereas, transactions of Ripple is written in Ripple Ledger, which is different from blockchain. Instead of restricting write permission, Ripple can "),s("b",[t._v("complete transactions in a moment without wasting energy")]),t._v(". ")]),t._v(" "),s("p",[t._v("\n          Q. In other words, is Ripple centralized solution? "),s("br"),t._v("\n          A. Yes. That's right. When writers betray, this network will break down.\n        ")]),t._v(" "),s("p",[t._v("\n          Q. Is it public chain, or private chain? "),s("br"),t._v("\n          A. Neither is incorrect because Ripple isn't the blockchain. I say repeatedly. "),s("b",[t._v("Ripple does not use blockchain. ")])]),t._v(" "),s("p",[t._v("\n          To begin Ripple, send  20 XRP  and activate this account.\n        ")])]),t._v(" "),s("div",{attrs:{id:"simp1le"}},[s("div",{attrs:{id:"qrArea"}},[s("div",{attrs:{id:"qrcode"}},[s("img",{attrs:{src:t.qrDataUrl,alt:"No Address",id:"qrcodeImage"}})]),t._v(" "),s("div",{staticClass:"address"},[t._v(t._s(t.address||"Loading"))])]),t._v(" "),s("p",[s("v-ons-input",{attrs:{placeholder:"invoice amount",type:"number"},model:{value:t.invAmt,callback:function(e){t.invAmt=e},expression:"invAmt"}})],1),t._v(" "),s("v-ons-button",{attrs:{modifier:"quiet"},on:{click:t.copyAddress}},[s("v-ons-icon",{attrs:{icon:"fa-clipboard"}}),t._v("\n          Copy address\n        ")],1),t._v(" "),t.shareable?s("v-ons-button",{attrs:{modifier:"quiet"},on:{click:t.share}},[s("v-ons-icon",{attrs:{icon:"fa-share-square-o"}}),t._v("Share\n        ")],1):t._e()],1),t._v(" "),s("v-ons-list",{directives:[{name:"show",rawName:"v-show",value:!t.plzActivate,expression:"!plzActivate"}]},[s("v-ons-list-header",[t._v("balance")]),t._v(" "),t._l(t.balances,function(e){return s("v-ons-list-item",[s("div",{staticClass:"center"},[t._v(t._s(e.value))]),t._v(" "),s("div",{staticClass:"right"},[t._v(t._s(e.currency))])])}),t._v(" "),s("v-ons-list-header",[t._v("Send")]),t._v(" "),s("v-ons-list-item",[s("v-ons-input",{attrs:{placeholder:"send address"},model:{value:t.sendAddress,callback:function(e){t.sendAddress=e},expression:"sendAddress"}})],1),t._v(" "),s("v-ons-list-item",[s("div",{staticClass:"center"},[t._v("amount to send")]),t._v(" "),s("div",{staticClass:"right"},[s("v-ons-input",{attrs:{type:"number"},model:{value:t.sendAmount,callback:function(e){t.sendAmount=e},expression:"sendAmount"}})],1)]),t._v(" "),s("v-ons-list-item",[s("div",{staticClass:"center"},[t._v("Legal currency conversion")]),t._v(" "),s("div",{staticClass:"right"},[s("v-ons-input",{attrs:{type:"number"},model:{value:t.fiatConv,callback:function(e){t.fiatConv=e},expression:"fiatConv"}})],1)]),t._v(" "),s("v-ons-list-item",[s("div",{staticClass:"center"},[t._v("Destination Tag")]),t._v(" "),s("div",{staticClass:"right"},[s("v-ons-input",{attrs:{type:"number"},model:{value:t.destTag,callback:function(e){t.destTag=e},expression:"destTag"}})],1)]),t._v(" "),s("v-ons-list-item",[s("v-ons-input",{attrs:{placeholder:"memo"},model:{value:t.memo,callback:function(e){t.memo=e},expression:"memo"}})],1),t._v(" "),s("v-ons-list-item",[s("v-ons-input",{attrs:{placeholder:"Password",type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),t._v(" "),s("v-ons-list-item",[s("v-ons-button",{attrs:{modifier:"large",disabled:!t.sendAddress||!t.sendAmount},on:{click:function(e){t.confirm=!0}}},[t._v("Send")])],1),t._v(" "),s("v-ons-list-header",[t._v("History")]),t._v(" "),t._l(t.history,function(e){return s("v-ons-list-item",["send"===e.type?s("div",{staticClass:"left"},[t._v("Send")]):t._e(),t._v(" "),"receive"===e.type?s("div",{staticClass:"left"},[t._v("Receive")]):t._e(),t._v(" "),"unknown"===e.type?s("div",{staticClass:"left"},[t._v("Unknown command")]):t._e(),t._v(" "),"send"===e.type?s("div",{staticClass:"center"},[t._v(t._s(e.destAddr))]):t._e(),t._v(" "),"receive"===e.type?s("div",{staticClass:"center"},[t._v(t._s(e.srcAddr))]):t._e(),t._v(" "),"unknown"!==e.type?s("div",{staticClass:"right"},[s("currency-set",{attrs:{amount:e.amount.value,ticker:e.amount.currency,notKnown:!0}})],1):t._e()])}),t._v(" "),s("v-ons-list-item",{on:{click:function(e){t.serverDlg=!0}}},[t._v("\n          Change Server\n        ")])],2)],1)]),t._v(" "),s("v-ons-modal",{attrs:{visible:t.loading}},[s("p",{staticStyle:{"text-align":"center"}},[t._v("\n      processing\n      "),s("br"),s("br")]),s("div",{staticClass:"spinner"}),t._v(" "),s("br"),t._v(" "),s("p")]),t._v(" "),s("v-ons-alert-dialog",{attrs:{modifier:"rowfooter",visible:t.confirm},on:{"update:visible":function(e){t.confirm=e}}},[s("span",{attrs:{slot:"title"},slot:"title"},[t._v("Confirm")]),t._v(" "),s("p",[t._v(t._s(t.sendAddress))]),t._v(" "),s("p",[t._v(t._s(t.sendAmount)+"XRP")]),t._v(" "),s("p",[t._v("Please pay attention because fee is collected even failure. ")]),t._v(" "),s("template",{slot:"footer"},[s("div",{staticClass:"alert-dialog-button",on:{click:t.send}},[t._v("Send")]),t._v(" "),s("div",{staticClass:"alert-dialog-button",on:{click:function(e){t.confirm=!1}}},[t._v("Back")])])],2),t._v(" "),s("v-ons-alert-dialog",{attrs:{modifier:"rowfooter",visible:t.serverDlg},on:{"update:visible":function(e){t.serverDlg=e}}},[s("span",{attrs:{slot:"title"},slot:"title"},[t._v("Change Server")]),t._v(" "),s("p",[s("v-ons-input",{attrs:{placeholder:"wss://s2.ripple.com:443"},model:{value:t.server,callback:function(e){t.server=e},expression:"server"}})],1),t._v(" "),s("template",{slot:"footer"},[s("div",{staticClass:"alert-dialog-button",on:{click:function(e){t.serverDlg=!1}}},[t._v("Close")]),t._v(" "),s("div",{staticClass:"alert-dialog-button",on:{click:t.connect}},[t._v("Connect")])])],2)],1)},i=[];t.exports=function(t){var e="function"==typeof t?t.options:t;return e.render=n,e.staticRenderFns=i,t}}}]);