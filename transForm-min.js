/*!
 * jQuery TransForm plugin v1.0
 * http://jquery.sunhater.com/transForm
 * 2014-08-01
 *
 * Copyright (c) 2014 Pavel Tzonkov <sunhater@sunhater.com>
 * Dual licensed under the MIT and GPL licenses.
 */
(function(b){var a;b.fn.transForm=function(p){if(!a){var d=b("<div></div>").css({display:"block",visibility:"visible",position:"absolute",overflow:"auto",width:100,height:100,top:-1000,left:-1000}).prependTo("body").append("<div></div>").find("div").css({display:"block",visibility:"visible",width:"100%",height:200});a=100-d.width();d.parent().remove()}var q="|form|fieldset|input|select|textarea|button|label|",i="|text|password|color|datetime|datetime-local|email|month|number|range|search|tel|time|url|week|",e={cssPrefix:"tf-",file:{noFile:"No file chosen",browse:"Browse",count:"{count} files"},textarea:{autoExpand:false,maxLength:0}},n=function(s,t,v){var u=0,o;if(!v){v="mbp"}if(/m/i.test(v)){o=parseInt(b(s).css("margin-"+t));if(o){u+=o}}if(/b/i.test(v)){o=parseInt(b(s).css("border-"+t+"-width"));if(o){u+=o}}if(/p/i.test(v)){o=parseInt(b(s).css("padding-"+t));if(o){u+=o}}return u},h=function(o,r){return n(o,"left",r)},j=function(o,r){return n(o,"top",r)},g=function(o,r){return n(o,"right",r)},m=function(o,r){return n(o,"bottom",r)},l=function(o,r){return(h(o,r)+g(o,r))},f=function(o,r){return(j(o,r)+m(o,r))},c=function(o){var r="mousewheel.tf DOMMouseScroll.tf";b(o).unbind(r).bind(r,function(s){var u=s.originalEvent,t=u.wheelDelta||-u.detail;this.scrollTop+=((t<0)?1:-1)*30;s.preventDefault()})},k=function(o){b(o).each(function(){var r="selectstart.tf";b(this).css("MozUserSelect","none");b(this).unbind(r).bind(r,function(){return false})})};b.extend(true,e,p);b(this).each(function(){var y=this,u=b(y).prop("tagName").toLowerCase();if(q.indexOf("|"+u+"|")==-1){return}var G=(p===false),D=b(y).data("transForm"),A=(!G&&!D),z=(G&&D),E=D?D.prefix:e.cssPrefix,v=b(y).attr("type"),v=v?v:"text",s,w={},F=function(J,t){if(A){b(J).addClass(t)}else{if(z){b(J).removeClass(t)}}},r=function(t){return E+t},C=function(t){return"."+r(t)},I={set:function(t,J){if(typeof J=="undefined"){J=y}var K=b(J).data("transForm");if(!K){K={}}b.extend(true,K,t);b(J).data("transForm",K)},get:function(t,J){if(typeof J=="undefined"){J=y}var K=b(J).data("transForm");if(typeof t=="undefined"){return K}if(!K){K={}}return K[t]},remove:function(t,J){if(typeof J=="undefined"){J=y}var K=b(J).data("transForm");if(!K){K={}}if(typeof K[t]=="undefined"){return}delete K[t]}},B={form:function(){b(y).find(q.substr(1,q.length-2).replace(/\|/g,",")).transForm(p);F(y,r(u))},fieldset:function(){this.form()},label:function(){if(b(y).is("[for]")){F(y,r("label"))}},input:function(){if(v=="button"){this.button()}else{if(this[v]){this[v]()}if(!s){F(y,r("input"));F(y,r(v))}y.transForm.readOnly=function(t){y.readOnly=t;if(t){b(y).addClass(r("readOnly"))}else{b(y).removeClass(r("readOnly"))}}}},select:function(){if(b(y).attr("multiple")){this.multiple();return}if(!A){s=b(y).parent();return}s=b('<div class="'+r(u)+'"><div class="'+r("selected")+'"><span></span></div><div class="'+r("button")+'"><span>&nbsp;</span></div><div class="'+r("menu")+'"></div></div>');var J=s.find(C("menu")),M=s.find(C("selected")),N=s.find(C("button")),Q=false;b(y).bind("keydown.tf",function(ad){var V=ad.keyCode,Z=(V==38),ag=(V==40),ae=(V==13),U=(V==32),W=(V==9),af=(V==27);if((ad.metaKey&&(V==82))||(V==116)){return true}if(ad.ctrlKey||ad.shiftKey||ad.altKey||ad.metaKey){return false}if(Z||ag){var ac=P();var Y=parseInt(ac.attr("class").split(r("index-"))[1].split(/\s/)[0]),T=J.find("div"),ab=J.data("count");if(Z){var X=(Y==0)?(ab-1):(Y-1);X=T[X];ac.removeClass(r("hover"));ac=b(X)}else{var aa=(Y==ab-1)?0:(Y+1);aa=T[aa];ac.removeClass(r("hover"));ac=b(aa)}T.removeClass(r("hover"));ac.addClass(r("hover"));I.set({current:ac});b(y).find("option").removeAttr("selected");ac.data("option").selected=true;L()}if(U||ae){s.toggleClass(r("opened"));P()}if(af){s.removeClass(r("opened"))}if(!W){return false}}).bind("focus.tf",function(){s.addClass(r("focused"))}).bind("blur.tf",function(){setTimeout(function(){if(!Q){s.removeClass(r("focused")).removeClass(r("opened"))}else{Q=false;y.focus()}},100);return false}).after(s).detach().prependTo(s);var O=0,K=b(y).find("optgroup").get(0);if(K){J.html("<ul></ul>")}b(y).find("option, optgroup").each(function(){if(b(this).is("option")){var T=b('<div class="'+r("index-")+O+++'"><span>'+this.text+"</span></div>"),U=b(this).parent().is("optgroup")?K:(K?J.find("ul"):J);T.data({option:this}).appendTo(U)}else{K=b("<li><span>"+b(this).attr("label")+"</span></li>");b(J).find("ul").append(K)}});J.data({count:O});var L=function(){var T=b(y).find("option:selected").text();s.find(C("selected")+" span").html(T)},P=function(){var T=false;J.find("div").each(function(){if(b(this).data("option")===b(y).find("option:selected").get(0)){b(this).addClass(r("hover"));I.set({current:b(this)});T=b(this);return false}});return T},t=function(){if(!y.disabled){Q=true;b(C("focused")).removeClass(r("focused"));P();setTimeout(function(){y.focus();s.toggleClass(r("opened"));var T=J.get(0);if(s.hasClass(r("opened"))&&(T.scrollHeight>T.clientHeight)){J.css({borderBottomRightRadius:0});J.find(C("last")).css({borderBottomRightRadius:0});c(J)}Q=false},200)}return true};M.mousedown(t);N.mousedown(t);J.find("div").mousedown(function(){b(y).find("option").removeAttr("selected");b(this).data("option").selected=true;L();Q=true;s.removeClass(r("opened"));setTimeout(function(){y.focus();Q=false},200)}).mouseover(function(){J.find("div").removeClass(r("hover"));b(this).addClass(r("hover"))}).mouseout(function(){b(this).removeClass(r("hover"))});M.css({width:J.outerWidth()-l(M)});s.css({width:M.outerWidth()+N.outerWidth()});J.css({marginTop:s.outerHeight()-1,width:s.outerWidth()-l(J)}).find("li").first().addClass(r("first"));J.find("li").last().addClass(r("last"));J.find("li").each(function(){b(this).find("div").first().addClass(r("group-first")).parent().find("div").last().addClass(r("group-last"))});J.find("div").first().addClass(r("first"));J.find("div").last().addClass(r("last"));var R=J.find("li").first(),S=J.find("li").last();if(R.get(0)&&R.prev().get(0)){R.removeClass(r("first"))}if(S.get(0)&&S.next().get(0)){S.removeClass(r("last"))}L();k(s);y.transForm.value=function(T){if(typeof T=="undefined"){return y.value}y.value=T;L()}},multiple:function(){if(!A){s=b(y).parent();return}s=b('<div class="'+r("multiple")+'"></div>');var J=0,t=b(y).find("optgroup").get(0);if(t){s.html("<ul></ul>")}b(y).find("option, optgroup").each(function(){if(b(this).is("option")){var N=b('<div class="'+r("index-")+J+++'"><span>'+this.text+"</span></div>"),M=b(this).parent().is("optgroup"),O=M?t:(t?s.find("ul"):s);N.data({option:this}).appendTo(O);if(this.selected){N.addClass(r("selected"))}if(this===b(y).find("option").last().get(0)){N.addClass(r("last"))}if(!M&&(this===b(y).find("option").first().get(0))){N.addClass(r("first"))}if(M){if(this===b(this).parent().find("option").last().get(0)){N.addClass(r("group-last"))}if(this===b(this).parent().find("option").first().get(0)){N.addClass(r("group-first"))}}}else{t=b("<li><span>"+b(this).attr("label")+"</span></li>");if(this===b(y).find("optgroup, option").first().get(0)){t.addClass(r("first"))}if(this===b(y).find("optgroup").last().get(0)){t.addClass(r("last"))}s.find("ul").append(t)}});s.data({count:J});b(y).after(s).detach().prependTo(s);k(s);var L=s.get(0);if(L.scrollHeight>L.clientHeight){s.css({width:s.innerWidth()+a,borderTopRightRadius:0,borderBottomRightRadius:0});s.find("div"+C("first")).css({borderTopRightRadius:0});s.find("div"+C("last")).css({borderBottomRightRadius:0});s.find("li"+C("last")).css({borderBottomRightRadius:0});c(s)}var K=s.find("li"+C("last"));if(K.get(0)&&K.next().get(0)){K.removeClass(r("last"))}s.find("div").mouseenter(function(){if(!y.disabled){b(this).addClass(r("hover"))}}).mouseleave(function(){if(!y.disabled){b(this).removeClass(r("hover"))}}).click(function(P){if(y.disabled){return false}var O=b(this).data("option");if(O.selected){b(this).removeClass(r("selected"));O.selected=false}else{b(this).addClass(r("selected"));O.selected=true}if(P.shiftKey&&O.selected){var Q,N=true,M=parseInt(b(this).attr("class").split(r("index-"))[1].split(/\s/)[0]);while(M&&N){M--;Q=s.find(C("index-")+M);if(Q.hasClass(r("selected"))){N=false}else{Q.addClass(r("selected"));Q.data("option").selected=true}}}});s.click(function(){var M=s.scrollTop();y.focus();s.scrollTop(M)});b(y).bind("focus.tf",function(){s.addClass(r("focused"))}).bind("blur.tf",function(){s.removeClass(r("focused"))}).bind("change.tf",function(){b(y).find("option").each(function(M){var N=s.find(C("index-")+M);if(this.selected){N.addClass(r("selected"))}else{N.removeClass(r("selected"))}})});y.transForm.values=function(M){if(typeof M=="undefined"){var N=[];b(y).find("option:selected").each(function(){N.push(this.value)});return N}if(!b.isArray(M)){return}b(y).find("option").attr({selected:false});s.find("div").removeClass(r("selected"));b.each(M,function(P,O){b(y).find("option").each(function(Q){if(this.value===O){this.selected=true;s.find(C("index-")+Q).addClass(r("selected"))}})})}},textarea:function(){if(A||z){b(y).css({overflow:"",height:"",borderTopRightRadius:"",borderBottomRightRadius:"",borderBottomLeftRadius:""})}F(y,r(u));if(!A){return}var J;if(e.textarea.autoExpand){b(y).css({overflow:"hidden"});J=function(){b(y).scrollTop(0);if(y.clientHeight>=y.scrollHeight){b(y).css({height:1})}b(y).css({height:y.scrollHeight+(document.doctype?-f(b(y),"p"):f(b(y),"b"))})}}else{J=function(){var K=(y.clientHeight<y.scrollHeight),L=(y.clientWidth<y.scrollWidth);if(!w.r){w.r={tr:b(y).css("borderTopRightRadius"),br:b(y).css("borderBottomRightRadius"),bl:b(y).css("borderBottomLeftRadius")}}b(y).css({borderBottomRightRadius:(K||L)?0:w.r.br,borderTopRightRadius:K?0:w.r.tr,borderBottomLeftRadius:L?0:w.r.bl})}}var t=function(){J();var K=e.textarea.maxLength;if(K&&(y.value.length>K)){y.value=y.value.substr(0,K)}};t();b(y).bind("keyup.tf",t).bind("keydown.tf",t).bind("change.tf",t).bind("scroll.tf",t);y.transForm.readOnly=function(K){y.readOnly=K;if(K){b(y).addClass(r("readOnly"))}else{b(y).removeClass(r("readOnly"))}}},button:function(){if(!A){s=b(y).parent();return}s=b('<div class="'+r("button")+'"><span></span></div>');b(y).after(s).detach().appendTo(s);s.find("span").text(y.textContent);b(y).css({width:s.innerWidth()+l(s),height:s.innerHeight()+f(s),marginLeft:-parseInt(s.css("borderLeftWidth")),marginTop:-parseInt(s.css("borderTopWidth"))}).bind("focus.tf",function(){s.addClass(r("focused"))}).bind("blur.tf",function(){s.removeClass(r("focused"))}).bind("mousedown.tf",function(){s.addClass(r("focused"))})},file:function(){if(!A){s=b(y).parent();return}s=b('<div class="'+r(v)+'"><div class="'+r("button")+'"><span>'+e.file.browse+'</span></div><div class="'+r("info")+'"><span>&nbsp;</span></div></div>');b(y).after(s).detach().prependTo(s);var K=s.find(C("info")),J=s.find(C("button")),t=function(){var L=y.files;if(!L||(L.length<=0)){K.find("span").html(e.file.noFile)}else{K.find("span").text((L.length==1)?L[0]["name"]:e.file.count.replace("{count}",L.length))}s.attr("label",b(y).attr("label"))};K.css({width:s.innerWidth()-J.outerWidth()-l(K)});b(y).css({width:s.outerWidth(),height:s.outerHeight()}).bind("focus.tf",function(){b(C("focused")).removeClass(r("focused"));s.addClass(r("focused"))}).bind("blur.tf",function(){s.removeClass(r("focused"))}).bind("change.tf",t).bind("click.tf",function(){y.focus()});t()},checkbox:function(){if(!A){s=b(y).parent();return}s=b('<div class="'+r(v)+'"><span></span></div>');var J=function(){if(y.checked){s.addClass(r("checked"))}else{s.removeClass(r("checked"))}},t=b(y).attr("id");if(t){t=b('label[for="'+t+'"]')}k(t);b(y).after(s).detach().appendTo(s).bind("focus.tf",function(){s.addClass(r("focused"));if(t.get(0)){t.addClass(r("focused"))}}).bind("blur.tf",function(){s.removeClass(r("focused"));if(t.get(0)){t.removeClass(r("focused"))}}).bind("click.tf",function(){J();b(C("focused")).removeClass(r("focused"));s.addClass(r("focused"));if(t.get(0)){t.addClass(r("focused"))}y.focus()}).bind("change.tf",J);J();y.transForm.checked=function(K){if(typeof K=="undefined"){return y.checked}y.checked=!!K;J()}},radio:function(){if(!A){s=b(y).parent();return}s=b('<div class="'+r(v)+'"><span></span></div>');var L=b(y).parents("body, form").find('input[type="radio"][name="'+y.name+'"]'),t=function(){b(L).each(function(){if(this.checked){b(this).parent().addClass(r("checked"))}else{b(this).parent().removeClass(r("checked"))}})},J=function(M){if(M){b(L).parent().addClass(r("focused"));b.each(K,function(O,N){N.addClass(r("focused"))})}else{b(L).parent().removeClass(r("focused"));b.each(K,function(O,N){N.removeClass(r("focused"))})}},K=[];b.each(L,function(N,O){var M=b(O).attr("id");if(!M){return}M=b('label[for="'+M+'"]');if(!M.get(0)){return}K.push(M);k(M)});b(y).after(s).detach().appendTo(s).bind("focus.tf",function(){J(true)}).bind("blur.tf",function(){J(false)}).bind("click.tf",function(){t();J(true);y.focus()}).bind("change.tf",t);t();y.transForm.checked=function(M){if(typeof M=="undefined"){return y.checked}y.checked=!!M;t()}},submit:function(){this.button()},reset:function(){this.button()}};if(typeof y.transForm=="undefined"){y.transForm={disable:function(t){var J=s?s:y;y.disabled=!!t;if(!!t){J.addClass(r("disabled"))}else{J.removeClass(r("disabled"))}},destruct:function(){z=true;A=false;B[u]();o()}}}B[u]();if(A){var H=s?s:b(y);if(y.disabled){H.addClass(r("disabled"))}if(y.readOnly){H.addClass(r("readOnly"))}I.set({prefix:E,transformed:true})}var o=function(){b(y).removeData("transForm").unbind(".tf");if(s){b(y).detach();s.after(y).detach()}if(typeof y.transForm!="undefined"){delete y.transForm}var t=b(y).attr("class");if(!t){return}b.each(t.split(/\s+/g),function(J,K){if(K.substr(0,E.length)==E){b(y).removeClass(K)}})};if(z){o()}if(typeof e.disabled!="undefined"){y.disabled=!!e.disabled;var H=s?s:b(y);if(e.disabled){H.addClass(r("disabled"))}else{H.removeClass(r("disabled"))}}if((typeof e.readOnly!="undefined")&&((u=="textarea")||((u=="input")&&(v!="color")&&(i.indexOf("|"+v+"|")!==-1)))){var x=!!e.readOnly;b(y).attr({readonly:x});if(!D){return}if(x){b(y).addClass(r("readOnly"))}else{b(y).removeClass(r("readOnly"))}}});return b(this)}})(jQuery);