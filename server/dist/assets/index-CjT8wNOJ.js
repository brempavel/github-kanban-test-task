var E=Object.defineProperty;var M=(O,e,a)=>e in O?E(O,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):O[e]=a;var D=(O,e,a)=>(M(O,typeof e!="symbol"?e+"":e,a),a);import{C as N,E as k,s as y,t,b as C,L as Z,i as j,j as q,f as A,k as H,a as g,r as F}from"./index-_cx-7tmY.js";const c=63,Y=64,I=1,K=2,z=3,J=4,V=5,OO=6,eO=7,G=65,aO=66,rO=8,nO=9,tO=10,oO=11,PO=12,_=13,QO=19,sO=20,lO=29,cO=33,fO=34,XO=47,dO=0,p=1,m=2,d=3,x=4,i=class i{constructor(e,a,r){this.parent=e,this.depth=a,this.type=r,this.hash=(e?e.hash+e.hash<<8:0)+a+(a<<4)+r}};D(i,"top",new i(null,-1,dO));let s=i;function X(O,e){for(let a=0,r=e-O.pos-1;;r--,a++){let o=O.peek(r);if(P(o)||o==-1)return a}}function $(O){return O==32||O==9}function P(O){return O==10||O==13}function w(O){return $(O)||P(O)}function l(O){return O<0||w(O)}const RO=new N({start:s.top,reduce(O,e){return O.type==d&&(e==sO||e==fO)?O.parent:O},shift(O,e,a,r){if(e==z)return new s(O,X(r,r.pos),p);if(e==G||e==V)return new s(O,X(r,r.pos),m);if(e==c)return O.parent;if(e==QO||e==cO)return new s(O,0,d);if(e==_&&O.type==x)return O.parent;if(e==XO){let o=/[1-9]/.exec(r.read(r.pos,a.pos));if(o)return new s(O,O.depth+ +o[0],x)}return O},hash(O){return O.hash}});function f(O,e,a=0){return O.peek(a)==e&&O.peek(a+1)==e&&O.peek(a+2)==e&&l(O.peek(a+3))}const SO=new k((O,e)=>{if(O.next==-1&&e.canShift(Y))return O.acceptToken(Y);let a=O.peek(-1);if((P(a)||a<0)&&e.context.type!=d){if(f(O,45))if(e.canShift(c))O.acceptToken(c);else return O.acceptToken(I,3);if(f(O,46))if(e.canShift(c))O.acceptToken(c);else return O.acceptToken(K,3);let r=0;for(;O.next==32;)r++,O.advance();(r<e.context.depth||r==e.context.depth&&e.context.type==p&&(O.next!=45||!l(O.peek(1))))&&O.next!=-1&&!P(O.next)&&O.next!=35&&O.acceptToken(c,-r)}},{contextual:!0}),iO=new k((O,e)=>{if(e.context.type==d){O.next==63&&(O.advance(),l(O.next)&&O.acceptToken(eO));return}if(O.next==45)O.advance(),l(O.next)&&O.acceptToken(e.context.type==p&&e.context.depth==X(O,O.pos-1)?J:z);else if(O.next==63)O.advance(),l(O.next)&&O.acceptToken(e.context.type==m&&e.context.depth==X(O,O.pos-1)?OO:V);else{let a=O.pos;for(;;)if($(O.next)){if(O.pos==a)return;O.advance()}else if(O.next==33)L(O);else if(O.next==38)T(O);else if(O.next==42){T(O);break}else if(O.next==39||O.next==34){if(h(O,!0))break;return}else if(O.next==91||O.next==123){if(!bO(O))return;break}else{B(O,!0,!1,0);break}for(;$(O.next);)O.advance();if(O.next==58){if(O.pos==a&&e.canShift(lO))return;let r=O.peek(1);l(r)&&O.acceptTokenTo(e.context.type==m&&e.context.depth==X(O,a)?aO:G,a)}}},{contextual:!0});function kO(O){return O>32&&O<127&&O!=34&&O!=37&&O!=44&&O!=60&&O!=62&&O!=92&&O!=94&&O!=96&&O!=123&&O!=124&&O!=125}function W(O){return O>=48&&O<=57||O>=97&&O<=102||O>=65&&O<=70}function U(O,e){return O.next==37?(O.advance(),W(O.next)&&O.advance(),W(O.next)&&O.advance(),!0):kO(O.next)||e&&O.next==44?(O.advance(),!0):!1}function L(O){if(O.advance(),O.next==60){for(O.advance();;)if(!U(O,!0)){O.next==62&&O.advance();break}}else for(;U(O,!1););}function T(O){for(O.advance();!l(O.next)&&S(O.tag)!="f";)O.advance()}function h(O,e){let a=O.next,r=!1,o=O.pos;for(O.advance();;){let n=O.next;if(n<0)break;if(O.advance(),n==a)if(n==39)if(O.next==39)O.advance();else break;else break;else if(n==92&&a==34)O.next>=0&&O.advance();else if(P(n)){if(e)return!1;r=!0}else if(e&&O.pos>=o+1024)return!1}return!r}function bO(O){for(let e=[],a=O.pos+1024;;)if(O.next==91||O.next==123)e.push(O.next),O.advance();else if(O.next==39||O.next==34){if(!h(O,!0))return!1}else if(O.next==93||O.next==125){if(e[e.length-1]!=O.next-2)return!1;if(e.pop(),O.advance(),!e.length)return!0}else{if(O.next<0||O.pos>a||P(O.next))return!1;O.advance()}}const gO="iiisiiissisfissssssssssssisssiiissssssssssssssssssssssssssfsfssissssssssssssssssssssssssssfif";function S(O){return O<33?"u":O>125?"s":gO[O-33]}function b(O,e){let a=S(O);return a!="u"&&!(e&&a=="f")}function B(O,e,a,r){if(S(O.next)=="s"||(O.next==63||O.next==58||O.next==45)&&b(O.peek(1),a))O.advance();else return!1;let o=O.pos;for(;;){let n=O.next,Q=0,R=r+1;for(;w(n);){if(P(n)){if(e)return!1;R=0}else R++;n=O.peek(++Q)}if(!(n>=0&&(n==58?b(O.peek(Q+1),a):n==35?O.peek(Q-1)!=32:b(n,a)))||!a&&R<=r||R==0&&!a&&(f(O,45,Q)||f(O,46,Q)))break;if(e&&S(n)=="f")return!1;for(let v=Q;v>=0;v--)O.advance();if(e&&O.pos>o+1024)return!1}return!0}const mO=new k((O,e)=>{if(O.next==33)L(O),O.acceptToken(PO);else if(O.next==38||O.next==42){let a=O.next==38?tO:oO;T(O),O.acceptToken(a)}else O.next==39||O.next==34?(h(O,!1),O.acceptToken(nO)):B(O,!1,e.context.type==d,e.context.depth)&&O.acceptToken(rO)}),xO=new k((O,e)=>{let a=e.context.type==x?e.context.depth:-1,r=O.pos;O:for(;;){let o=0,n=O.next;for(;n==32;)n=O.peek(++o);if(!o&&(f(O,45,o)||f(O,46,o))||!P(n)&&(a<0&&(a=Math.max(e.context.depth+1,o)),o<a))break;for(;;){if(O.next<0)break O;let Q=P(O.next);if(O.advance(),Q)continue O;r=O.pos}}O.acceptTokenTo(_,r)}),$O=y({DirectiveName:t.keyword,DirectiveContent:t.attributeValue,"DirectiveEnd DocEnd":t.meta,QuotedLiteral:t.string,BlockLiteralHeader:t.special(t.string),BlockLiteralContent:t.content,Literal:t.content,"Key/Literal Key/QuotedLiteral":t.definition(t.propertyName),"Anchor Alias":t.labelName,Tag:t.typeName,Comment:t.lineComment,": , -":t.separator,"?":t.punctuation,"[ ]":t.squareBracket,"{ }":t.brace}),TO=C.deserialize({version:14,states:"5lQ!ZQgOOO#PQfO'#CpO#uQfO'#DOOOQR'#Dv'#DvO$qQgO'#DRO%gQdO'#DUO%nQgO'#DUO&ROaO'#D[OOQR'#Du'#DuO&{QgO'#D^O'rQgO'#D`OOQR'#Dt'#DtO(iOqO'#DbOOQP'#Dj'#DjO(zQaO'#CmO)YQgO'#CmOOQP'#Cm'#CmQ)jQaOOQ)uQgOOQ]QgOOO*PQdO'#CrO*nQdO'#CtOOQO'#Dw'#DwO+]Q`O'#CxO+hQdO'#CwO+rQ`O'#CwOOQO'#Cv'#CvO+wQdO'#CvOOQO'#Cq'#CqO,UQ`O,59[O,^QfO,59[OOQR,59[,59[OOQO'#Cx'#CxO,eQ`O'#DPO,pQdO'#DPOOQO'#Dx'#DxO,zQdO'#DxO-XQ`O,59jO-aQfO,59jOOQR,59j,59jOOQR'#DS'#DSO-hQcO,59mO-sQgO'#DVO.TQ`O'#DVO.YQcO,59pOOQR'#DX'#DXO#|QfO'#DWO.hQcO'#DWOOQR,59v,59vO.yOWO,59vO/OOaO,59vO/WOaO,59vO/cQgO'#D_OOQR,59x,59xO0VQgO'#DaOOQR,59z,59zOOQP,59|,59|O0yOaO,59|O1ROaO,59|O1aOqO,59|OOQP-E7h-E7hO1oQgO,59XOOQP,59X,59XO2PQaO'#DeO2_QgO'#DeO2oQgO'#DkOOQP'#Dk'#DkQ)jQaOOO3PQdO'#CsOOQO,59^,59^O3kQdO'#CuOOQO,59`,59`OOQO,59c,59cO4VQdO,59cO4aQdO'#CzO4kQ`O'#CzOOQO,59b,59bOOQU,5:Q,5:QOOQR1G.v1G.vO4pQ`O1G.vOOQU-E7d-E7dO4xQdO,59kOOQO,59k,59kO5SQdO'#DQO5^Q`O'#DQOOQO,5:d,5:dOOQU,5:R,5:ROOQR1G/U1G/UO5cQ`O1G/UOOQU-E7e-E7eO5kQgO'#DhO5xQcO1G/XOOQR1G/X1G/XOOQR,59q,59qO6TQgO,59qO6eQdO'#DiO6lQgO'#DiO7PQcO1G/[OOQR1G/[1G/[OOQR,59r,59rO#|QfO,59rOOQR1G/b1G/bO7_OWO1G/bO7dOaO1G/bOOQR,59y,59yOOQR,59{,59{OOQP1G/h1G/hO7lOaO1G/hO7tOaO1G/hO8POaO1G/hOOQP1G.s1G.sO8_QgO,5:POOQP,5:P,5:POOQP,5:V,5:VOOQP-E7i-E7iOOQO,59_,59_OOQO,59a,59aOOQO1G.}1G.}OOQO,59f,59fO8oQdO,59fOOQR7+$b7+$bP,XQ`O'#DfOOQO1G/V1G/VOOQO,59l,59lO8yQdO,59lOOQR7+$p7+$pP9TQ`O'#DgOOQR'#DT'#DTOOQR,5:S,5:SOOQR-E7f-E7fOOQR7+$s7+$sOOQR1G/]1G/]O9YQgO'#DYO9jQ`O'#DYOOQR,5:T,5:TO#|QfO'#DZO9oQcO'#DZOOQR-E7g-E7gOOQR7+$v7+$vOOQR1G/^1G/^OOQR7+$|7+$|O:QOWO7+$|OOQP7+%S7+%SO:VOaO7+%SO:_OaO7+%SOOQP1G/k1G/kOOQO1G/Q1G/QOOQO1G/W1G/WOOQR,59t,59tO:jQgO,59tOOQR,59u,59uO#|QfO,59uOOQR<<Hh<<HhOOQP<<Hn<<HnO:zOaO<<HnOOQR1G/`1G/`OOQR1G/a1G/aOOQPAN>YAN>Y",stateData:";S~O!fOS!gOS^OS~OP_OQbORSOTUOWROXROYYOZZO[XOcPOqQO!PVO!V[O!cTO~O`cO~P]OVkOWROXROYeOZfO[dOcPOmhOqQO~OboO~P!bOVtOWROXROYeOZfO[dOcPOmrOqQO~OpwO~P#WORSOTUOWROXROYYOZZO[XOcPOqQO!PVO!cTO~OSvP!avP!bvP~P#|OWROXROYeOZfO[dOcPOqQO~OmzO~P%OOm!OOUzP!azP!bzP!dzP~P#|O^!SO!b!QO!f!TO!g!RO~ORSOTUOWROXROcPOqQO!PVO!cTO~OY!UOP!QXQ!QX!V!QX!`!QXS!QX!a!QX!b!QXU!QXm!QX!d!QX~P&aO[!WOP!SXQ!SX!V!SX!`!SXS!SX!a!SX!b!SXU!SXm!SX!d!SX~P&aO^!ZO!W![O!b!YO!f!]O!g!YO~OP!_O!V[OQaX!`aX~OPaXQaX!VaX!`aX~P#|OP!bOQ!cO!V[O~OP_O!V[O~P#|OWROXROY!fOcPOqQObfXmfXofXpfX~OWROXRO[!hOcPOqQObhXmhXohXphX~ObeXmlXoeX~ObkXokX~P%OOm!kO~Om!lObnPonP~P%OOb!pOo!oO~Ob!pO~P!bOm!sOosXpsX~OosXpsX~P%OOm!uOotPptP~P%OOo!xOp!yO~Op!yO~P#WOS!|O!a#OO!b#OO~OUyX!ayX!byX!dyX~P#|Om#QO~OU#SO!a#UO!b#UO!d#RO~Om#WOUzX!azX!bzX!dzX~O]#XO~O!b#XO!g#YO~O^#ZO!b#XO!g#YO~OP!RXQ!RX!V!RX!`!RXS!RX!a!RX!b!RXU!RXm!RX!d!RX~P&aOP!TXQ!TX!V!TX!`!TXS!TX!a!TX!b!TXU!TXm!TX!d!TX~P&aO!b#^O!g#^O~O^#_O!b#^O!f#`O!g#^O~O^#_O!W#aO!b#^O!g#^O~OPaaQaa!Vaa!`aa~P#|OP#cO!V[OQ!XX!`!XX~OP!XXQ!XX!V!XX!`!XX~P#|OP_O!V[OQ!_X!`!_X~P#|OWROXROcPOqQObgXmgXogXpgX~OWROXROcPOqQObiXmiXoiXpiX~Obkaoka~P%OObnXonX~P%OOm#kO~Ob#lOo!oO~Oosapsa~P%OOotXptX~P%OOm#pO~Oo!xOp#qO~OSwP!awP!bwP~P#|OS!|O!a#vO!b#vO~OUya!aya!bya!dya~P#|Om#xO~P%OOm#{OU}P!a}P!b}P!d}P~P#|OU#SO!a$OO!b$OO!d#RO~O]$QO~O!b$QO!g$RO~O!b$SO!g$SO~O^$TO!b$SO!g$SO~O^$TO!b$SO!f$UO!g$SO~OP!XaQ!Xa!V!Xa!`!Xa~P#|Obnaona~P%OOotapta~P%OOo!xO~OU|X!a|X!b|X!d|X~P#|Om$ZO~Om$]OU}X!a}X!b}X!d}X~O]$^O~O!b$_O!g$_O~O^$`O!b$_O!g$_O~OU|a!a|a!b|a!d|a~P#|O!b$cO!g$cO~O",goto:",]!mPPPPPPPPPPPPPPPPP!nPP!v#v#|$`#|$c$f$j$nP%VPPP!v%Y%^%a%{&O%a&R&U&X&_&b%aP&e&{&e'O'RPP']'a'g'm's'y(XPPPPPPPP(_)e*X+c,VUaObcR#e!c!{ROPQSTUXY_bcdehknrtvz!O!U!W!_!b!c!f!h!k!l!s!u!|#Q#R#S#W#c#k#p#x#{$Z$]QmPR!qnqfPQThknrtv!k!l!s!u#R#k#pR!gdR!ieTlPnTjPnSiPnSqQvQ{TQ!mkQ!trQ!vtR#y#RR!nkTsQvR!wt!RWOSUXY_bcz!O!U!W!_!b!c!|#Q#S#W#c#x#{$Z$]RySR#t!|R|TR|UQ!PUR#|#SR#z#RR#z#SyZOSU_bcz!O!_!b!c!|#Q#S#W#c#x#{$Z$]R!VXR!XYa]O^abc!a!c!eT!da!eQnPR!rnQvQR!{vQ!}yR#u!}Q#T|R#}#TW^Obc!cS!^^!aT!aa!eQ!eaR#f!eW`Obc!cQxSS}U#SQ!`_Q#PzQ#V!OQ#b!_Q#d!bQ#s!|Q#w#QQ$P#WQ$V#cQ$Y#xQ$[#{Q$a$ZR$b$]xZOSU_bcz!O!_!b!c!|#Q#S#W#c#x#{$Z$]Q!VXQ!XYQ#[!UR#]!W!QWOSUXY_bcz!O!U!W!_!b!c!|#Q#S#W#c#x#{$Z$]pfPQThknrtv!k!l!s!u#R#k#pQ!gdQ!ieQ#g!fR#h!hSgPn^pQTkrtv#RQ!jhQ#i!kQ#j!lQ#n!sQ#o!uQ$W#kR$X#pQuQR!zv",nodeNames:"⚠ DirectiveEnd DocEnd - - ? ? ? Literal QuotedLiteral Anchor Alias Tag BlockLiteralContent Comment Stream BOM Document ] [ FlowSequence Item Tagged Anchored Anchored Tagged FlowMapping Pair Key : Pair , } { FlowMapping Pair Pair BlockSequence Item Item BlockMapping Pair Pair Key Pair Pair BlockLiteral BlockLiteralHeader Tagged Anchored Anchored Tagged Directive DirectiveName DirectiveContent Document",maxTerm:74,context:RO,nodeProps:[["isolate",-3,8,9,14,""],["openedBy",18,"[",32,"{"],["closedBy",19,"]",33,"}"]],propSources:[$O],skippedNodes:[0],repeatNodeCount:6,tokenData:"-Y~RnOX#PXY$QYZ$]Z]#P]^$]^p#Ppq$Qqs#Pst$btu#Puv$yv|#P|}&e}![#P![!]'O!]!`#P!`!a'i!a!}#P!}#O*g#O#P#P#P#Q+Q#Q#o#P#o#p+k#p#q'i#q#r,U#r;'S#P;'S;=`#z<%l?HT#P?HT?HU,o?HUO#PQ#UU!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PQ#kTOY#PZs#Pt;'S#P;'S;=`#z<%lO#PQ#}P;=`<%l#P~$VQ!f~XY$Qpq$Q~$bO!g~~$gS^~OY$bZ;'S$b;'S;=`$s<%lO$b~$vP;=`<%l$bR%OX!WQOX%kXY#PZ]%k]^#P^p%kpq#hq;'S%k;'S;=`&_<%lO%kR%rX!WQ!VPOX%kXY#PZ]%k]^#P^p%kpq#hq;'S%k;'S;=`&_<%lO%kR&bP;=`<%l%kR&lUoP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR'VUmP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR'p[!PP!WQOY#PZp#Ppq#hq{#P{|(f|}#P}!O(f!O!R#P!R![)p![;'S#P;'S;=`#z<%lO#PR(mW!PP!WQOY#PZp#Ppq#hq!R#P!R![)V![;'S#P;'S;=`#z<%lO#PR)^U!PP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR)wY!PP!WQOY#PZp#Ppq#hq{#P{|)V|}#P}!O)V!O;'S#P;'S;=`#z<%lO#PR*nUcP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR+XUbP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR+rUqP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR,]UpP!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#PR,vU`P!WQOY#PZp#Ppq#hq;'S#P;'S;=`#z<%lO#P",tokenizers:[SO,iO,mO,xO,0,1],topRules:{Stream:[0,15]},tokenPrec:0}),pO=C.deserialize({version:14,states:"!vOQOPOOO]OPO'#C_OhOPO'#C^OOOO'#Cc'#CcOpOPO'#CaQOOOOOO{OPOOOOOO'#Cb'#CbO!WOPO'#C`O!`OPO,58xOOOO-E6a-E6aOOOO-E6`-E6`OOOO'#C_'#C_OOOO1G.d1G.d",stateData:"!h~OXPOYROWTP~OWVXXRXYRX~OYVOXSP~OXROYROWTX~OXROYROWTP~OYVOXSX~OX[O~OXY~",goto:"vWPPX[beioRUOQQOR]XRXQTTOUQWQRZWSSOURYS",nodeNames:"⚠ Document Frontmatter DashLine FrontmatterContent Body",maxTerm:10,skippedNodes:[0],repeatNodeCount:2,tokenData:"$z~RXOYnYZ!^Z]n]^!^^}n}!O!i!O;'Sn;'S;=`!c<%lOn~qXOYnYZ!^Z]n]^!^^;'Sn;'S;=`!c<%l~n~On~~!^~!cOY~~!fP;=`<%ln~!lZOYnYZ!^Z]n]^!^^}n}!O#_!O;'Sn;'S;=`!c<%l~n~On~~!^~#bZOYnYZ!^Z]n]^!^^}n}!O$T!O;'Sn;'S;=`!c<%l~n~On~~!^~$WXOYnYZ$sZ]n]^$s^;'Sn;'S;=`!c<%l~n~On~~$s~$zOX~Y~",tokenizers:[0],topRules:{Document:[0,1]},tokenPrec:67}),u=Z.define({name:"yaml",parser:TO.configure({props:[j.add({Stream:O=>{for(let e=O.node.resolve(O.pos,-1);e&&e.to>=O.pos;e=e.parent){if(e.name=="BlockLiteralContent"&&e.from<e.to)return O.baseIndentFor(e);if(e.name=="BlockLiteral")return O.baseIndentFor(e)+O.unit;if(e.name=="BlockSequence"||e.name=="BlockMapping")return O.column(e.from,1);if(e.name=="QuotedLiteral")return null;if(e.name=="Literal"){let a=O.column(e.from,1);if(a==O.lineIndent(e.from,1))return a;if(e.to>O.pos)return null}}return null},FlowMapping:q({closing:"}"}),FlowSequence:q({closing:"]"})}),A.add({"FlowMapping FlowSequence":H,"BlockSequence Pair BlockLiteral":(O,e)=>({from:e.doc.lineAt(O.from).to,to:O.to})})]}),languageData:{commentTokens:{line:"#"},indentOnInput:/^\s*[\]\}]$/}});function YO(){return new g(u)}const hO=Z.define({name:"yaml-frontmatter",parser:pO.configure({props:[y({DashLine:t.meta})]})});function WO(O){let{language:e,support:a}=O.content instanceof g?O.content:{language:O.content,support:[]};return new g(hO.configure({wrap:F(r=>r.name=="FrontmatterContent"?{parser:u.parser}:r.name=="Body"?{parser:e.parser}:null)}),a)}export{YO as yaml,WO as yamlFrontmatter,u as yamlLanguage};
