/*!
 * jQuery TransForm plugin v1.0
 * http://jquery.sunhater.com/transForm
 * 2014-08-01
 *
 * Copyright (c) 2014 Pavel Tzonkov <sunhater@sunhater.com>
 * Dual licensed under the MIT and GPL licenses.
 */
(function(b){var a;b.fn.transForm=function(q){if(!a){var d=b("<div></div>").css({display:"block",visibility:"visible",position:"absolute",overflow:"auto",width:100,height:100,top:-1000,left:-1000}).prependTo("body").append("<div></div>").find("div").css({display:"block",visibility:"visible",width:"100%",height:200});a=100-d.width();d.parent().remove()}var r="|form|fieldset|input|select|textarea|button|label|",i="|text|password|color|datetime|datetime-local|email|month|number|range|search|tel|time|url|week|",n="|button|submit|reset|",e={cssPrefix:"tf-",file:{noFile:"No file chosen",browse:"Browse",count:"{count} files"},textarea:{autoExpand:false,maxLength:0}},p=function(s,t,v){var u=0,o;if(!v){v="mbp"}if(/m/i.test(v)){o=parseInt(b(s).css("margin-"+t));if(o){u+=o}}if(/b/i.test(v)){o=parseInt(b(s).css("border-"+t+"-width"));if(o){u+=o}}if(/p/i.test(v)){o=parseInt(b(s).css("padding-"+t));if(o){u+=o}}return u},h=function(o,s){return p(o,"left",s)},j=function(o,s){return p(o,"top",s)},g=function(o,s){return p(o,"right",s)},m=function(o,s){return p(o,"bottom",s)},l=function(o,s){return(h(o,s)+g(o,s))},f=function(o,s){return(j(o,s)+m(o,s))},c=function(o){var s="mousewheel.tf DOMMouseScroll.tf";b(o).unbind(s).bind(s,function(t){var v=t.originalEvent,u=v.wheelDelta||-v.detail;this.scrollTop+=((u<0)?1:-1)*30;t.preventDefault()})},k=function(o){b(o).each(function(){var s="selectstart.tf";b(this).css("MozUserSelect","none");b(this).unbind(s).bind(s,function(){return false})})};b.extend(true,e,q);b(this).each(function(){var z=this,v=b(z).prop("tagName").toLowerCase();if(r.indexOf("|"+v+"|")==-1){return}var H=(q===false),E=b(z).data("transForm"),B=(!H&&!E),A=(H&&E),F=E?E.prefix:e.cssPrefix,w=b(z).attr("type"),w=w?w:"text",u,x={},G=function(K,t){if(B){b(K).addClass(t)}else{if(A){b(K).removeClass(t)}}},s=function(t){return F+t},D=function(t){return"."+s(t)},J={set:function(t,K){if(typeof K=="undefined"){K=z}var L=b(K).data("transForm");if(!L){L={}}b.extend(true,L,t);b(K).data("transForm",L)},get:function(t,K){if(typeof K=="undefined"){K=z}var L=b(K).data("transForm");if(typeof t=="undefined"){return L}if(!L){L={}}return L[t]},remove:function(t,K){if(typeof K=="undefined"){K=z}var L=b(K).data("transForm");if(!L){L={}}if(typeof L[t]=="undefined"){return}delete L[t]}},C={form:function(){b(z).find(r.substr(1,r.length-2).replace(/\|/g,",")).transForm(q);G(z,s(v))},fieldset:function(){this.form()},label:function(){if(b(z).is("[for]")){G(z,s("label"))}},input:function(){if(this[w]){this[w]()}if(!u){G(z,s("input"));G(z,s(w))}if(i.indexOf("|"+w+"|")!==-1){z.transForm.readOnly=function(t){z.readOnly=t;if(t){b(z).addClass(s("readOnly"))}else{b(z).removeClass(s("readOnly"))}}}},select:function(){if(b(z).attr("multiple")){this.multiple();return}if(!B){u=b(z).parent();return}u=b('<div class="'+s(v)+'"><div class="'+s("selected")+'"><span></span></div><div class="'+s("button")+'"><span>&nbsp;</span></div><div class="'+s("menu")+'"></div></div>');var K=u.find(D("menu")),N=u.find(D("selected")),O=u.find(D("button")),R=false;b(z).bind("keydown.tf",function(ae){var W=ae.keyCode,aa=(W==38),ah=(W==40),af=(W==13),V=(W==32),X=(W==9),ag=(W==27);if((ae.metaKey&&(W==82))||(W==116)){return true}if(ae.ctrlKey||ae.shiftKey||ae.altKey||ae.metaKey){return false}if(aa||ah){var ad=Q();var Z=parseInt(ad.attr("class").split(s("index-"))[1].split(/\s/)[0]),U=K.find("div"),ac=K.data("count");if(aa){var Y=(Z==0)?(ac-1):(Z-1);Y=U[Y];ad.removeClass(s("hover"));ad=b(Y)}else{var ab=(Z==ac-1)?0:(Z+1);ab=U[ab];ad.removeClass(s("hover"));ad=b(ab)}U.removeClass(s("hover"));ad.addClass(s("hover"));J.set({current:ad});b(z).find("option").removeAttr("selected");ad.data("option").selected=true;M()}if(V||af){u.toggleClass(s("opened"));Q()}if(ag){u.removeClass(s("opened"))}if(!X){return false}}).bind("focus.tf",function(){u.addClass(s("focused"))}).bind("blur.tf",function(){setTimeout(function(){if(!R){u.removeClass(s("focused")).removeClass(s("opened"))}else{R=false;z.focus()}},100);return false}).after(u).detach().prependTo(u);var P=0,L=b(z).find("optgroup").get(0);if(L){K.html("<ul></ul>")}b(z).find("option, optgroup").each(function(){if(b(this).is("option")){var U=b('<div class="'+s("index-")+P+++'"><span>'+this.text+"</span></div>"),V=b(this).parent().is("optgroup")?L:(L?K.find("ul"):K);U.data({option:this}).appendTo(V)}else{L=b("<li><span>"+b(this).attr("label")+"</span></li>");b(K).find("ul").append(L)}});K.data({count:P});var M=function(){var U=b(z).find("option:selected").text();u.find(D("selected")+" span").html(U)},Q=function(){var U=false;K.find("div").each(function(){if(b(this).data("option")===b(z).find("option:selected").get(0)){b(this).addClass(s("hover"));J.set({current:b(this)});U=b(this);return false}});return U},t=function(){if(!z.disabled){R=true;b(D("focused")).removeClass(s("focused"));Q();setTimeout(function(){z.focus();u.toggleClass(s("opened"));var U=K.get(0);if(u.hasClass(s("opened"))&&(U.scrollHeight>U.clientHeight)){K.css({borderBottomRightRadius:0});K.find(D("last")).css({borderBottomRightRadius:0});c(K)}R=false},200)}return true};N.mousedown(t);O.mousedown(t);K.find("div").mousedown(function(){b(z).find("option").removeAttr("selected");b(this).data("option").selected=true;M();R=true;u.removeClass(s("opened"));setTimeout(function(){z.focus();R=false},200)}).mouseover(function(){K.find("div").removeClass(s("hover"));b(this).addClass(s("hover"))}).mouseout(function(){b(this).removeClass(s("hover"))});N.css({width:K.outerWidth()-l(N)});u.css({width:N.outerWidth()+O.outerWidth()});K.css({marginTop:u.outerHeight()-1,width:u.outerWidth()-l(K)}).find("li").first().addClass(s("first"));K.find("li").last().addClass(s("last"));K.find("li").each(function(){b(this).find("div").first().addClass(s("group-first")).parent().find("div").last().addClass(s("group-last"))});K.find("div").first().addClass(s("first"));K.find("div").last().addClass(s("last"));var S=K.find("li").first(),T=K.find("li").last();if(S.get(0)&&S.prev().get(0)){S.removeClass(s("first"))}if(T.get(0)&&T.next().get(0)){T.removeClass(s("last"))}M();k(u);z.transForm.value=function(U){if(typeof U=="undefined"){return z.value}z.value=U;M()}},multiple:function(){if(!B){u=b(z).parent();return}u=b('<div class="'+s("multiple")+'"></div>');var K=0,t=b(z).find("optgroup").get(0);if(t){u.html("<ul></ul>")}b(z).find("option, optgroup").each(function(){if(b(this).is("option")){var O=b('<div class="'+s("index-")+K+++'"><span>'+this.text+"</span></div>"),N=b(this).parent().is("optgroup"),P=N?t:(t?u.find("ul"):u);O.data({option:this}).appendTo(P);if(this.selected){O.addClass(s("selected"))}if(this===b(z).find("option").last().get(0)){O.addClass(s("last"))}if(!N&&(this===b(z).find("option").first().get(0))){O.addClass(s("first"))}if(N){if(this===b(this).parent().find("option").last().get(0)){O.addClass(s("group-last"))}if(this===b(this).parent().find("option").first().get(0)){O.addClass(s("group-first"))}}}else{t=b("<li><span>"+b(this).attr("label")+"</span></li>");if(this===b(z).find("optgroup, option").first().get(0)){t.addClass(s("first"))}if(this===b(z).find("optgroup").last().get(0)){t.addClass(s("last"))}u.find("ul").append(t)}});u.data({count:K});b(z).after(u).detach().prependTo(u);k(u);var M=u.get(0);if(M.scrollHeight>M.clientHeight){u.css({width:u.innerWidth()+a,borderTopRightRadius:0,borderBottomRightRadius:0});u.find("div"+D("first")).css({borderTopRightRadius:0});u.find("div"+D("last")).css({borderBottomRightRadius:0});u.find("li"+D("last")).css({borderBottomRightRadius:0});c(u)}var L=u.find("li"+D("last"));if(L.get(0)&&L.next().get(0)){L.removeClass(s("last"))}u.find("div").mouseenter(function(){if(!z.disabled){b(this).addClass(s("hover"))}}).mouseleave(function(){if(!z.disabled){b(this).removeClass(s("hover"))}}).click(function(Q){if(z.disabled){return false}var P=b(this).data("option");if(P.selected){b(this).removeClass(s("selected"));P.selected=false}else{b(this).addClass(s("selected"));P.selected=true}if(Q.shiftKey&&P.selected){var R,O=true,N=parseInt(b(this).attr("class").split(s("index-"))[1].split(/\s/)[0]);while(N&&O){N--;R=u.find(D("index-")+N);if(R.hasClass(s("selected"))){O=false}else{R.addClass(s("selected"));R.data("option").selected=true}}}});u.click(function(){var N=u.scrollTop();z.focus();u.scrollTop(N)});b(z).bind("focus.tf",function(){u.addClass(s("focused"))}).bind("blur.tf",function(){u.removeClass(s("focused"))}).bind("change.tf",function(){b(z).find("option").each(function(N){var O=u.find(D("index-")+N);if(this.selected){O.addClass(s("selected"))}else{O.removeClass(s("selected"))}})});z.transForm.values=function(N){if(typeof N=="undefined"){var O=[];b(z).find("option:selected").each(function(){O.push(this.value)});return O}if(!b.isArray(N)){return}b(z).find("option").attr({selected:false});u.find("div").removeClass(s("selected"));b.each(N,function(Q,P){b(z).find("option").each(function(R){if(this.value===P){this.selected=true;u.find(D("index-")+R).addClass(s("selected"))}})})}},textarea:function(){if(B||A){b(z).css({overflow:"",height:"",borderTopRightRadius:"",borderBottomRightRadius:"",borderBottomLeftRadius:""})}G(z,s(v));if(!B){return}var K;if(e.textarea.autoExpand){b(z).css({overflow:"hidden"});K=function(){b(z).scrollTop(0);if(z.clientHeight>=z.scrollHeight){b(z).css({height:1})}b(z).css({height:z.scrollHeight+(document.doctype?-f(b(z),"p"):f(b(z),"b"))})}}else{K=function(){var L=(z.clientHeight<z.scrollHeight),M=(z.clientWidth<z.scrollWidth);if(!x.r){x.r={tr:b(z).css("borderTopRightRadius"),br:b(z).css("borderBottomRightRadius"),bl:b(z).css("borderBottomLeftRadius")}}b(z).css({borderBottomRightRadius:(L||M)?0:x.r.br,borderTopRightRadius:L?0:x.r.tr,borderBottomLeftRadius:M?0:x.r.bl})}}var t=function(){K();var L=e.textarea.maxLength;if(L&&(z.value.length>L)){z.value=z.value.substr(0,L)}};t();b(z).bind("keyup.tf",t).bind("keydown.tf",t).bind("change.tf",t).bind("scroll.tf",t);z.transForm.readOnly=function(L){z.readOnly=L;if(L){b(z).addClass(s("readOnly"))}else{b(z).removeClass(s("readOnly"))}}},button:function(){if(!B){u=b(z).parent();return}u=b('<div class="'+s("button")+'"><span></span></div>');b(z).after(u).detach().appendTo(u);u.find("span").text(z.textContent);b(z).css({width:u.innerWidth()+l(u),height:u.innerHeight()+f(u),marginLeft:-parseInt(u.css("borderLeftWidth")),marginTop:-parseInt(u.css("borderTopWidth"))}).bind("focus.tf",function(){u.addClass(s("focused"))}).bind("blur.tf",function(){u.removeClass(s("focused"))}).bind("mousedown.tf",function(){u.addClass(s("focused"))})},file:function(){if(!B){u=b(z).parent();return}u=b('<div class="'+s(w)+'"><div class="'+s("button")+'"><span>'+e.file.browse+'</span></div><div class="'+s("info")+'"><span>&nbsp;</span></div></div>');b(z).after(u).detach().prependTo(u);var L=u.find(D("info")),K=u.find(D("button")),t=function(){var M=z.files;if(!M||(M.length<=0)){L.find("span").html(e.file.noFile)}else{L.find("span").text((M.length==1)?M[0]["name"]:e.file.count.replace("{count}",M.length))}u.attr("label",b(z).attr("label"))};L.css({width:u.innerWidth()-K.outerWidth()-l(L)});b(z).css({width:u.outerWidth(),height:u.outerHeight()}).bind("focus.tf",function(){b(D("focused")).removeClass(s("focused"));u.addClass(s("focused"))}).bind("blur.tf",function(){u.removeClass(s("focused"))}).bind("change.tf",t).bind("click.tf",function(){z.focus()});t()},checkbox:function(){if(!B){u=b(z).parent();return}u=b('<div class="'+s(w)+'"><span></span></div>');var K=function(){if(z.checked){u.addClass(s("checked"))}else{u.removeClass(s("checked"))}},t=b(z).attr("id");if(t){t=b('label[for="'+t+'"]')}k(t);b(z).after(u).detach().appendTo(u).bind("focus.tf",function(){u.addClass(s("focused"));if(t.get(0)){t.addClass(s("focused"))}}).bind("blur.tf",function(){u.removeClass(s("focused"));if(t.get(0)){t.removeClass(s("focused"))}}).bind("click.tf",function(){K();b(D("focused")).removeClass(s("focused"));u.addClass(s("focused"));if(t.get(0)){t.addClass(s("focused"))}z.focus()}).bind("change.tf",K);K();z.transForm.checked=function(L){if(typeof L=="undefined"){return z.checked}z.checked=!!L;K()}},radio:function(){if(!B){u=b(z).parent();return}u=b('<div class="'+s(w)+'"><span></span></div>');var M=b(z).parents("body, form").find('input[type="radio"][name="'+z.name+'"]'),t=function(){b(M).each(function(){if(this.checked){b(this).parent().addClass(s("checked"))}else{b(this).parent().removeClass(s("checked"))}})},K=function(N){if(N){b(M).parent().addClass(s("focused"));b.each(L,function(P,O){O.addClass(s("focused"))})}else{b(M).parent().removeClass(s("focused"));b.each(L,function(P,O){O.removeClass(s("focused"))})}},L=[];b.each(M,function(O,P){var N=b(P).attr("id");if(!N){return}N=b('label[for="'+N+'"]');if(!N.get(0)){return}L.push(N);k(N)});b(z).after(u).detach().appendTo(u).bind("focus.tf",function(){K(true)}).bind("blur.tf",function(){K(false)}).bind("click.tf",function(){t();K(true);z.focus()}).bind("change.tf",t);t();z.transForm.checked=function(N){if(typeof N=="undefined"){return z.checked}z.checked=!!N;t()}},submit:function(){this.button()},reset:function(){this.button()}};if(typeof z.transForm=="undefined"){z.transForm={disable:function(t){var K=u?u:z;z.disabled=!!t;if(!!t){K.addClass(s("disabled"))}else{K.removeClass(s("disabled"))}},destruct:function(){A=true;B=false;C[v]();o()}}}C[v]();if(B){var I=u?u:b(z);if(z.disabled){I.addClass(s("disabled"))}if(z.readOnly){I.addClass(s("readOnly"))}J.set({prefix:F,transformed:true})}var o=function(){b(z).removeData("transForm").unbind(".tf");if(u){b(z).detach();u.after(z).detach()}if(typeof z.transForm!="undefined"){delete z.transForm}var t=b(z).attr("class");if(!t){return}b.each(t.split(/\s+/g),function(K,L){if(L.substr(0,F.length)==F){b(z).removeClass(L)}})};if(A){o()}if(typeof e.disabled!="undefined"){z.disabled=!!e.disabled;var I=u?u:b(z);if(e.disabled){I.addClass(s("disabled"))}else{I.removeClass(s("disabled"))}}if((typeof e.readOnly!="undefined")&&((v=="textarea")||((v=="input")&&(i.indexOf("|"+w+"|")!==-1)))){var y=!!e.readOnly;b(z).attr({readonly:y});if(!E){return}if(y){b(z).addClass(s("readOnly"))}else{b(z).removeClass(s("readOnly"))}}});return b(this)}})(jQuery);