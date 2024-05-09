import{a as pt,g as Et,j as E,r as $e,i as He,c as bt,u as _t,C as ae,B as Ee,b as Ce,s as xt,d as Ge,e as St,L as Nt,A as Rt,N as At,S as Fe,f as Mt,h as yt}from"./index-D-HWJ5dw.js";async function wt(e,t){return(await pt.get(`/${e}/animate/${t}`)).data}function ze(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach(t=>{const n=e[t],c=typeof n;(c==="object"||c==="function")&&!Object.isFrozen(n)&&ze(n)}),e}class ke{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function Ke(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function L(e,...t){const n=Object.create(null);for(const c in e)n[c]=e[c];return t.forEach(function(c){for(const b in c)n[b]=c[b]}),n}const Ot="</span>",me=e=>!!e.scope,Tt=(e,{prefix:t})=>{if(e.startsWith("language:"))return e.replace("language:","language-");if(e.includes(".")){const n=e.split(".");return[`${t}${n.shift()}`,...n.map((c,b)=>`${c}${"_".repeat(b+1)}`)].join(" ")}return`${t}${e}`};class vt{constructor(t,n){this.buffer="",this.classPrefix=n.classPrefix,t.walk(this)}addText(t){this.buffer+=Ke(t)}openNode(t){if(!me(t))return;const n=Tt(t.scope,{prefix:this.classPrefix});this.span(n)}closeNode(t){me(t)&&(this.buffer+=Ot)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}}const Le=(e={})=>{const t={children:[]};return Object.assign(t,e),t};class xe{constructor(){this.rootNode=Le(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){const n=Le({scope:t});this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,n){return typeof n=="string"?t.addText(n):n.children&&(t.openNode(n),n.children.forEach(c=>this._walk(t,c)),t.closeNode(n)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(n=>typeof n=="string")?t.children=[t.children.join("")]:t.children.forEach(n=>{xe._collapse(n)}))}}class It extends xe{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,n){const c=t.root;n&&(c.scope=`language:${n}`),this.add(c)}toHTML(){return new vt(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function X(e){return e?typeof e=="string"?e:e.source:null}function We(e){return U("(?=",e,")")}function Ct(e){return U("(?:",e,")*")}function kt(e){return U("(?:",e,")?")}function U(...e){return e.map(n=>X(n)).join("")}function mt(e){const t=e[e.length-1];return typeof t=="object"&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}function Se(...e){return"("+(mt(e).capture?"":"?:")+e.map(c=>X(c)).join("|")+")"}function Ze(e){return new RegExp(e.toString()+"|").exec("").length-1}function Lt(e,t){const n=e&&e.exec(t);return n&&n.index===0}const Bt=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Ne(e,{joinWith:t}){let n=0;return e.map(c=>{n+=1;const b=n;let d=X(c),r="";for(;d.length>0;){const i=Bt.exec(d);if(!i){r+=d;break}r+=d.substring(0,i.index),d=d.substring(i.index+i[0].length),i[0][0]==="\\"&&i[1]?r+="\\"+String(Number(i[1])+b):(r+=i[0],i[0]==="("&&n++)}return r}).map(c=>`(${c})`).join(t)}const Dt=/\b\B/,Xe="[a-zA-Z]\\w*",Re="[a-zA-Z_]\\w*",Ye="\\b\\d+(\\.\\d+)?",qe="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Ve="\\b(0b[01]+)",Pt="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",jt=(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=U(t,/.*\b/,e.binary,/\b.*/)),L({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(n,c)=>{n.index!==0&&c.ignoreMatch()}},e)},Y={begin:"\\\\[\\s\\S]",relevance:0},Ut={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[Y]},$t={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[Y]},Ht={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},oe=function(e,t,n={}){const c=L({scope:"comment",begin:e,end:t,contains:[]},n);c.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});const b=Se("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return c.contains.push({begin:U(/[ ]+/,"(",b,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),c},Gt=oe("//","$"),Ft=oe("/\\*","\\*/"),zt=oe("#","$"),Kt={scope:"number",begin:Ye,relevance:0},Wt={scope:"number",begin:qe,relevance:0},Zt={scope:"number",begin:Ve,relevance:0},Xt={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[Y,{begin:/\[/,end:/\]/,relevance:0,contains:[Y]}]},Yt={scope:"title",begin:Xe,relevance:0},qt={scope:"title",begin:Re,relevance:0},Vt={begin:"\\.\\s*"+Re,relevance:0},Jt=function(e){return Object.assign(e,{"on:begin":(t,n)=>{n.data._beginMatch=t[1]},"on:end":(t,n)=>{n.data._beginMatch!==t[1]&&n.ignoreMatch()}})};var re=Object.freeze({__proto__:null,APOS_STRING_MODE:Ut,BACKSLASH_ESCAPE:Y,BINARY_NUMBER_MODE:Zt,BINARY_NUMBER_RE:Ve,COMMENT:oe,C_BLOCK_COMMENT_MODE:Ft,C_LINE_COMMENT_MODE:Gt,C_NUMBER_MODE:Wt,C_NUMBER_RE:qe,END_SAME_AS_BEGIN:Jt,HASH_COMMENT_MODE:zt,IDENT_RE:Xe,MATCH_NOTHING_RE:Dt,METHOD_GUARD:Vt,NUMBER_MODE:Kt,NUMBER_RE:Ye,PHRASAL_WORDS_MODE:Ht,QUOTE_STRING_MODE:$t,REGEXP_MODE:Xt,RE_STARTERS_RE:Pt,SHEBANG:jt,TITLE_MODE:Yt,UNDERSCORE_IDENT_RE:Re,UNDERSCORE_TITLE_MODE:qt});function Qt(e,t){e.input[e.index-1]==="."&&t.ignoreMatch()}function en(e,t){e.className!==void 0&&(e.scope=e.className,delete e.className)}function tn(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=Qt,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,e.relevance===void 0&&(e.relevance=0))}function nn(e,t){Array.isArray(e.illegal)&&(e.illegal=Se(...e.illegal))}function sn(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function rn(e,t){e.relevance===void 0&&(e.relevance=1)}const an=(e,t)=>{if(!e.beforeMatch)return;if(e.starts)throw new Error("beforeMatch cannot be used with starts");const n=Object.assign({},e);Object.keys(e).forEach(c=>{delete e[c]}),e.keywords=n.keywords,e.begin=U(n.beforeMatch,We(n.begin)),e.starts={relevance:0,contains:[Object.assign(n,{endsParent:!0})]},e.relevance=0,delete n.beforeMatch},cn=["of","and","for","in","not","or","if","then","parent","list","value"],on="keyword";function Je(e,t,n=on){const c=Object.create(null);return typeof e=="string"?b(n,e.split(" ")):Array.isArray(e)?b(n,e):Object.keys(e).forEach(function(d){Object.assign(c,Je(e[d],t,d))}),c;function b(d,r){t&&(r=r.map(i=>i.toLowerCase())),r.forEach(function(i){const u=i.split("|");c[u[0]]=[d,ln(u[0],u[1])]})}}function ln(e,t){return t?Number(t):un(e)?0:1}function un(e){return cn.includes(e.toLowerCase())}const Be={},j=e=>{console.error(e)},De=(e,...t)=>{console.log(`WARN: ${e}`,...t)},F=(e,t)=>{Be[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Be[`${e}/${t}`]=!0)},ce=new Error;function Qe(e,t,{key:n}){let c=0;const b=e[n],d={},r={};for(let i=1;i<=t.length;i++)r[i+c]=b[i],d[i+c]=!0,c+=Ze(t[i-1]);e[n]=r,e[n]._emit=d,e[n]._multi=!0}function fn(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw j("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),ce;if(typeof e.beginScope!="object"||e.beginScope===null)throw j("beginScope must be object"),ce;Qe(e,e.begin,{key:"beginScope"}),e.begin=Ne(e.begin,{joinWith:""})}}function gn(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw j("skip, excludeEnd, returnEnd not compatible with endScope: {}"),ce;if(typeof e.endScope!="object"||e.endScope===null)throw j("endScope must be object"),ce;Qe(e,e.end,{key:"endScope"}),e.end=Ne(e.end,{joinWith:""})}}function hn(e){e.scope&&typeof e.scope=="object"&&e.scope!==null&&(e.beginScope=e.scope,delete e.scope)}function dn(e){hn(e),typeof e.beginScope=="string"&&(e.beginScope={_wrap:e.beginScope}),typeof e.endScope=="string"&&(e.endScope={_wrap:e.endScope}),fn(e),gn(e)}function pn(e){function t(r,i){return new RegExp(X(r),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(i?"g":""))}class n{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(i,u){u.position=this.position++,this.matchIndexes[this.matchAt]=u,this.regexes.push([u,i]),this.matchAt+=Ze(i)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);const i=this.regexes.map(u=>u[1]);this.matcherRe=t(Ne(i,{joinWith:"|"}),!0),this.lastIndex=0}exec(i){this.matcherRe.lastIndex=this.lastIndex;const u=this.matcherRe.exec(i);if(!u)return null;const x=u.findIndex((T,O)=>O>0&&T!==void 0),S=this.matchIndexes[x];return u.splice(0,x),Object.assign(u,S)}}class c{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(i){if(this.multiRegexes[i])return this.multiRegexes[i];const u=new n;return this.rules.slice(i).forEach(([x,S])=>u.addRule(x,S)),u.compile(),this.multiRegexes[i]=u,u}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(i,u){this.rules.push([i,u]),u.type==="begin"&&this.count++}exec(i){const u=this.getMatcher(this.regexIndex);u.lastIndex=this.lastIndex;let x=u.exec(i);if(this.resumingScanAtSamePosition()&&!(x&&x.index===this.lastIndex)){const S=this.getMatcher(0);S.lastIndex=this.lastIndex+1,x=S.exec(i)}return x&&(this.regexIndex+=x.position+1,this.regexIndex===this.count&&this.considerAll()),x}}function b(r){const i=new c;return r.contains.forEach(u=>i.addRule(u.begin,{rule:u,type:"begin"})),r.terminatorEnd&&i.addRule(r.terminatorEnd,{type:"end"}),r.illegal&&i.addRule(r.illegal,{type:"illegal"}),i}function d(r,i){const u=r;if(r.isCompiled)return u;[en,sn,dn,an].forEach(S=>S(r,i)),e.compilerExtensions.forEach(S=>S(r,i)),r.__beforeBegin=null,[tn,nn,rn].forEach(S=>S(r,i)),r.isCompiled=!0;let x=null;return typeof r.keywords=="object"&&r.keywords.$pattern&&(r.keywords=Object.assign({},r.keywords),x=r.keywords.$pattern,delete r.keywords.$pattern),x=x||/\w+/,r.keywords&&(r.keywords=Je(r.keywords,e.case_insensitive)),u.keywordPatternRe=t(x,!0),i&&(r.begin||(r.begin=/\B|\b/),u.beginRe=t(u.begin),!r.end&&!r.endsWithParent&&(r.end=/\B|\b/),r.end&&(u.endRe=t(u.end)),u.terminatorEnd=X(u.end)||"",r.endsWithParent&&i.terminatorEnd&&(u.terminatorEnd+=(r.end?"|":"")+i.terminatorEnd)),r.illegal&&(u.illegalRe=t(r.illegal)),r.contains||(r.contains=[]),r.contains=[].concat(...r.contains.map(function(S){return En(S==="self"?r:S)})),r.contains.forEach(function(S){d(S,u)}),r.starts&&d(r.starts,i),u.matcher=b(u),u}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=L(e.classNameAliases||{}),d(e)}function et(e){return e?e.endsWithParent||et(e.starts):!1}function En(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(function(t){return L(e,{variants:null},t)})),e.cachedVariants?e.cachedVariants:et(e)?L(e,{starts:e.starts?L(e.starts):null}):Object.isFrozen(e)?L(e):e}var bn="11.9.0";class _n extends Error{constructor(t,n){super(t),this.name="HTMLInjectionError",this.html=n}}const be=Ke,Pe=L,je=Symbol("nomatch"),xn=7,tt=function(e){const t=Object.create(null),n=Object.create(null),c=[];let b=!0;const d="Could not find the language '{}', did you forget to load/include a language module?",r={disableAutodetect:!0,name:"Plain text",contains:[]};let i={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:It};function u(s){return i.noHighlightRe.test(s)}function x(s){let o=s.className+" ";o+=s.parentNode?s.parentNode.className:"";const g=i.languageDetectRe.exec(o);if(g){const p=I(g[1]);return p||(De(d.replace("{}",g[1])),De("Falling back to no-highlight mode for this block.",s)),p?g[1]:"no-highlight"}return o.split(/\s+/).find(p=>u(p)||I(p))}function S(s,o,g){let p="",R="";typeof o=="object"?(p=s,g=o.ignoreIllegals,R=o.language):(F("10.7.0","highlight(lang, code, ...args) has been deprecated."),F("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),R=s,p=o),g===void 0&&(g=!0);const y={code:p,language:R};G("before:highlight",y);const v=y.result?y.result:T(y.language,y.code,g);return v.code=y.code,G("after:highlight",v),v}function T(s,o,g,p){const R=Object.create(null);function y(a,l){return a.keywords[l]}function v(){if(!f.keywords){A.addText(N);return}let a=0;f.keywordPatternRe.lastIndex=0;let l=f.keywordPatternRe.exec(N),h="";for(;l;){h+=N.substring(a,l.index);const _=k.case_insensitive?l[0].toLowerCase():l[0],M=y(f,_);if(M){const[m,ht]=M;if(A.addText(h),h="",R[_]=(R[_]||0)+1,R[_]<=xn&&(ie+=ht),m.startsWith("_"))h+=l[0];else{const dt=k.classNameAliases[m]||m;C(l[0],dt)}}else h+=l[0];a=f.keywordPatternRe.lastIndex,l=f.keywordPatternRe.exec(N)}h+=N.substring(a),A.addText(h)}function ne(){if(N==="")return;let a=null;if(typeof f.subLanguage=="string"){if(!t[f.subLanguage]){A.addText(N);return}a=T(f.subLanguage,N,!0,Ie[f.subLanguage]),Ie[f.subLanguage]=a._top}else a=$(N,f.subLanguage.length?f.subLanguage:null);f.relevance>0&&(ie+=a.relevance),A.__addSublanguage(a._emitter,a.language)}function w(){f.subLanguage!=null?ne():v(),N=""}function C(a,l){a!==""&&(A.startScope(l),A.addText(a),A.endScope())}function we(a,l){let h=1;const _=l.length-1;for(;h<=_;){if(!a._emit[h]){h++;continue}const M=k.classNameAliases[a[h]]||a[h],m=l[h];M?C(m,M):(N=m,v(),N=""),h++}}function Oe(a,l){return a.scope&&typeof a.scope=="string"&&A.openNode(k.classNameAliases[a.scope]||a.scope),a.beginScope&&(a.beginScope._wrap?(C(N,k.classNameAliases[a.beginScope._wrap]||a.beginScope._wrap),N=""):a.beginScope._multi&&(we(a.beginScope,l),N="")),f=Object.create(a,{parent:{value:f}}),f}function Te(a,l,h){let _=Lt(a.endRe,h);if(_){if(a["on:end"]){const M=new ke(a);a["on:end"](l,M),M.isMatchIgnored&&(_=!1)}if(_){for(;a.endsParent&&a.parent;)a=a.parent;return a}}if(a.endsWithParent)return Te(a.parent,l,h)}function ot(a){return f.matcher.regexIndex===0?(N+=a[0],1):(pe=!0,0)}function lt(a){const l=a[0],h=a.rule,_=new ke(h),M=[h.__beforeBegin,h["on:begin"]];for(const m of M)if(m&&(m(a,_),_.isMatchIgnored))return ot(l);return h.skip?N+=l:(h.excludeBegin&&(N+=l),w(),!h.returnBegin&&!h.excludeBegin&&(N=l)),Oe(h,a),h.returnBegin?0:l.length}function ut(a){const l=a[0],h=o.substring(a.index),_=Te(f,a,h);if(!_)return je;const M=f;f.endScope&&f.endScope._wrap?(w(),C(l,f.endScope._wrap)):f.endScope&&f.endScope._multi?(w(),we(f.endScope,a)):M.skip?N+=l:(M.returnEnd||M.excludeEnd||(N+=l),w(),M.excludeEnd&&(N=l));do f.scope&&A.closeNode(),!f.skip&&!f.subLanguage&&(ie+=f.relevance),f=f.parent;while(f!==_.parent);return _.starts&&Oe(_.starts,a),M.returnEnd?0:l.length}function ft(){const a=[];for(let l=f;l!==k;l=l.parent)l.scope&&a.unshift(l.scope);a.forEach(l=>A.openNode(l))}let se={};function ve(a,l){const h=l&&l[0];if(N+=a,h==null)return w(),0;if(se.type==="begin"&&l.type==="end"&&se.index===l.index&&h===""){if(N+=o.slice(l.index,l.index+1),!b){const _=new Error(`0 width match regex (${s})`);throw _.languageName=s,_.badRule=se.rule,_}return 1}if(se=l,l.type==="begin")return lt(l);if(l.type==="illegal"&&!g){const _=new Error('Illegal lexeme "'+h+'" for mode "'+(f.scope||"<unnamed>")+'"');throw _.mode=f,_}else if(l.type==="end"){const _=ut(l);if(_!==je)return _}if(l.type==="illegal"&&h==="")return 1;if(de>1e5&&de>l.index*3)throw new Error("potential infinite loop, way more iterations than matches");return N+=h,h.length}const k=I(s);if(!k)throw j(d.replace("{}",s)),new Error('Unknown language: "'+s+'"');const gt=pn(k);let he="",f=p||gt;const Ie={},A=new i.__emitter(i);ft();let N="",ie=0,P=0,de=0,pe=!1;try{if(k.__emitTokens)k.__emitTokens(o,A);else{for(f.matcher.considerAll();;){de++,pe?pe=!1:f.matcher.considerAll(),f.matcher.lastIndex=P;const a=f.matcher.exec(o);if(!a)break;const l=o.substring(P,a.index),h=ve(l,a);P=a.index+h}ve(o.substring(P))}return A.finalize(),he=A.toHTML(),{language:s,value:he,relevance:ie,illegal:!1,_emitter:A,_top:f}}catch(a){if(a.message&&a.message.includes("Illegal"))return{language:s,value:be(o),illegal:!0,relevance:0,_illegalBy:{message:a.message,index:P,context:o.slice(P-100,P+100),mode:a.mode,resultSoFar:he},_emitter:A};if(b)return{language:s,value:be(o),illegal:!1,relevance:0,errorRaised:a,_emitter:A,_top:f};throw a}}function O(s){const o={value:be(s),illegal:!1,relevance:0,_top:r,_emitter:new i.__emitter(i)};return o._emitter.addText(s),o}function $(s,o){o=o||i.languages||Object.keys(t);const g=O(s),p=o.filter(I).filter(ee).map(w=>T(w,s,!1));p.unshift(g);const R=p.sort((w,C)=>{if(w.relevance!==C.relevance)return C.relevance-w.relevance;if(w.language&&C.language){if(I(w.language).supersetOf===C.language)return 1;if(I(C.language).supersetOf===w.language)return-1}return 0}),[y,v]=R,ne=y;return ne.secondBest=v,ne}function q(s,o,g){const p=o&&n[o]||g;s.classList.add("hljs"),s.classList.add(`language-${p}`)}function H(s){let o=null;const g=x(s);if(u(g))return;if(G("before:highlightElement",{el:s,language:g}),s.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",s);return}if(s.children.length>0&&(i.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(s)),i.throwUnescapedHTML))throw new _n("One of your code blocks includes unescaped HTML.",s.innerHTML);o=s;const p=o.textContent,R=g?S(p,{language:g,ignoreIllegals:!0}):$(p);s.innerHTML=R.value,s.dataset.highlighted="yes",q(s,g,R.language),s.result={language:R.language,re:R.relevance,relevance:R.relevance},R.secondBest&&(s.secondBest={language:R.secondBest.language,relevance:R.secondBest.relevance}),G("after:highlightElement",{el:s,result:R,text:p})}function V(s){i=Pe(i,s)}const ye=()=>{B(),F("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function K(){B(),F("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let W=!1;function B(){if(document.readyState==="loading"){W=!0;return}document.querySelectorAll(i.cssSelector).forEach(H)}function Z(){W&&B()}typeof window<"u"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",Z,!1);function D(s,o){let g=null;try{g=o(e)}catch(p){if(j("Language definition for '{}' could not be registered.".replace("{}",s)),b)j(p);else throw p;g=r}g.name||(g.name=s),t[s]=g,g.rawDefinition=o.bind(null,e),g.aliases&&Q(g.aliases,{languageName:s})}function le(s){delete t[s];for(const o of Object.keys(n))n[o]===s&&delete n[o]}function J(){return Object.keys(t)}function I(s){return s=(s||"").toLowerCase(),t[s]||t[n[s]]}function Q(s,{languageName:o}){typeof s=="string"&&(s=[s]),s.forEach(g=>{n[g.toLowerCase()]=o})}function ee(s){const o=I(s);return o&&!o.disableAutodetect}function ue(s){s["before:highlightBlock"]&&!s["before:highlightElement"]&&(s["before:highlightElement"]=o=>{s["before:highlightBlock"](Object.assign({block:o.el},o))}),s["after:highlightBlock"]&&!s["after:highlightElement"]&&(s["after:highlightElement"]=o=>{s["after:highlightBlock"](Object.assign({block:o.el},o))})}function fe(s){ue(s),c.push(s)}function ge(s){const o=c.indexOf(s);o!==-1&&c.splice(o,1)}function G(s,o){const g=s;c.forEach(function(p){p[g]&&p[g](o)})}function te(s){return F("10.7.0","highlightBlock will be removed entirely in v12.0"),F("10.7.0","Please use highlightElement now."),H(s)}Object.assign(e,{highlight:S,highlightAuto:$,highlightAll:B,highlightElement:H,highlightBlock:te,configure:V,initHighlighting:ye,initHighlightingOnLoad:K,registerLanguage:D,unregisterLanguage:le,listLanguages:J,getLanguage:I,registerAliases:Q,autoDetection:ee,inherit:Pe,addPlugin:fe,removePlugin:ge}),e.debugMode=function(){b=!1},e.safeMode=function(){b=!0},e.versionString=bn,e.regex={concat:U,lookahead:We,either:Se,optional:kt,anyNumberOfTimes:Ct};for(const s in re)typeof re[s]=="object"&&ze(re[s]);return Object.assign(e,re),e},z=tt({});z.newInstance=()=>tt({});var Sn=z;z.HighlightJS=z;z.default=z;const nt=Et(Sn),Ue="[A-Za-z$_][0-9A-Za-z$_]*",Nn=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],Rn=["true","false","null","undefined","NaN","Infinity"],st=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],it=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],rt=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],An=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],Mn=[].concat(rt,st,it);function yn(e){const t=e.regex,n=(o,{after:g})=>{const p="</"+o[0].slice(1);return o.input.indexOf(p,g)!==-1},c=Ue,b={begin:"<>",end:"</>"},d=/<[A-Za-z0-9\\._:-]+\s*\/>/,r={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(o,g)=>{const p=o[0].length+o.index,R=o.input[p];if(R==="<"||R===","){g.ignoreMatch();return}R===">"&&(n(o,{after:p})||g.ignoreMatch());let y;const v=o.input.substring(p);if(y=v.match(/^\s*=/)){g.ignoreMatch();return}if((y=v.match(/^\s+extends\s+/))&&y.index===0){g.ignoreMatch();return}}},i={$pattern:Ue,keyword:Nn,literal:Rn,built_in:Mn,"variable.language":An},u="[0-9](_?[0-9])*",x=`\\.(${u})`,S="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",T={className:"number",variants:[{begin:`(\\b(${S})((${x})|\\.)?|(${x}))[eE][+-]?(${u})\\b`},{begin:`\\b(${S})\\b((${x})\\b|\\.)?|(${x})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},O={className:"subst",begin:"\\$\\{",end:"\\}",keywords:i,contains:[]},$={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,O],subLanguage:"xml"}},q={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,O],subLanguage:"css"}},H={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,O],subLanguage:"graphql"}},V={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,O]},K={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:c+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},W=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,$,q,H,V,{match:/\$\d+/},T];O.contains=W.concat({begin:/\{/,end:/\}/,keywords:i,contains:["self"].concat(W)});const B=[].concat(K,O.contains),Z=B.concat([{begin:/\(/,end:/\)/,keywords:i,contains:["self"].concat(B)}]),D={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:i,contains:Z},le={variants:[{match:[/class/,/\s+/,c,/\s+/,/extends/,/\s+/,t.concat(c,"(",t.concat(/\./,c),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,c],scope:{1:"keyword",3:"title.class"}}]},J={relevance:0,match:t.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...st,...it]}},I={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},Q={variants:[{match:[/function/,/\s+/,c,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[D],illegal:/%/},ee={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function ue(o){return t.concat("(?!",o.join("|"),")")}const fe={match:t.concat(/\b/,ue([...rt,"super","import"]),c,t.lookahead(/\(/)),className:"title.function",relevance:0},ge={begin:t.concat(/\./,t.lookahead(t.concat(c,/(?![0-9A-Za-z$_(])/))),end:c,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},G={match:[/get|set/,/\s+/,c,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},D]},te="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",s={match:[/const|var|let/,/\s+/,c,/\s*/,/=\s*/,/(async\s*)?/,t.lookahead(te)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[D]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:i,exports:{PARAMS_CONTAINS:Z,CLASS_REFERENCE:J},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),I,e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,$,q,H,V,K,{match:/\$\d+/},T,J,{className:"attr",begin:c+t.lookahead(":"),relevance:0},s,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[K,e.REGEXP_MODE,{className:"function",begin:te,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:i,contains:Z}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:b.begin,end:b.end},{match:d},{begin:r.begin,"on:begin":r.isTrulyOpeningTag,end:r.end}],subLanguage:"xml",contains:[{begin:r.begin,end:r.end,skip:!0,contains:["self"]}]}]},Q,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[D,e.inherit(e.TITLE_MODE,{begin:c,className:"title.function"})]},{match:/\.\.\./,relevance:0},ge,{match:"\\$"+c,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[D]},fe,ee,le,G,{match:/\$[(.]/}]}}nt.registerLanguage("javascript",yn);function _e(e){const{text:t,hlLines:n=[]}=e,d=nt.highlight(t,{language:"javascript"}).value.split(`
`).map(r=>r||" ").map((r,i)=>{const u=n.includes(i);return E.jsx("p",{dangerouslySetInnerHTML:{__html:r},className:u?"highlighted-code-line font-ubuntu":"code-line font-ubuntu"},i+r)});return E.jsx("pre",{className:"no-scrollbar m-0 flex font-ubuntu",children:E.jsx("code",{className:"flex-1",children:d})})}var Ae={},wn=He;Object.defineProperty(Ae,"__esModule",{value:!0});var at=Ae.default=void 0,On=wn($e()),Tn=E;at=Ae.default=(0,On.default)((0,Tn.jsx)("path",{d:"m7.58 16.89 5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82M16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1"}),"SkipNextRounded");var Me={},vn=He;Object.defineProperty(Me,"__esModule",{value:!0});var ct=Me.default=void 0,In=vn($e()),Cn=E;ct=Me.default=(0,In.default)((0,Cn.jsx)("path",{d:"M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1m3.66 6.82 5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64"}),"SkipPreviousRounded");const kn=bt(E.jsx("path",{d:"M8 6h8c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2"}),"StopRounded");function mn(){const e=_t(),t=()=>{e(Ce(-1))},n=()=>{e(xt())},c=()=>{e(Ce(1))};return E.jsxs(ae,{className:"flex",children:[E.jsxs(Ee,{className:"flex-1",onClick:t,children:[E.jsx(ct,{})," Previous"]}),E.jsxs(Ee,{className:"flex-1",color:"error",onClick:n,children:["Stop",E.jsx(kn,{})]}),E.jsxs(Ee,{className:"flex-1",onClick:c,children:["Next ",E.jsx(at,{})]})]})}function Ln(){return{frames:[],stack:[],highlight:[]}}function Bn(e){const{code:t}=e;let n=Ge(d=>d.steps[d.currentStep]);n||(n=Ln());const c=n.stack.map((d,r)=>E.jsx(_e,{text:d,hlLines:r===0?[0]:[]},r)),b=n.highlight;return E.jsxs(E.Fragment,{children:[E.jsx(mn,{}),E.jsx(ae,{className:"flex-1 !overflow-auto font-ubuntu",children:E.jsx(_e,{text:t,hlLines:b})}),E.jsx(ae,{className:"h-1/6 !overflow-auto p-2 font-ubuntu",children:c})]})}function Dn(e){var T;const{structureId:t,algorithmId:n}=e,c=Ge(O=>O.isRunning),{data:b,isLoading:d,isError:r,error:i,refetch:u}=St({queryKey:["animate-algorithm",t,n],queryFn:()=>wt(t,n)});if(d)return E.jsx(Nt,{});if(r&&i instanceof Rt&&((T=i.response)==null?void 0:T.status)===404)return E.jsx(At,{target:"algorithm"});if(!b||r)return E.jsx(Fe,{onRetry:u});const{algorithm:x,code:S}=b;return E.jsx("div",{className:"flex min-h-0 flex-1 flex-col gap-4 p-2",children:c?E.jsx(Bn,{code:S}):E.jsxs(E.Fragment,{children:[E.jsx(Mt,{structureId:t,algorithmId:n,name:x.name,isModify:!1,parameters:x.parameters}),E.jsx(ae,{className:"flex-1 !overflow-auto font-ubuntu",children:E.jsx(_e,{text:S})})]})})}function jn(){const{structureId:e,algorithmId:t}=yt();return!e||!t?E.jsx(Fe,{}):E.jsx(Dn,{structureId:e,algorithmId:t})}export{jn as default};
