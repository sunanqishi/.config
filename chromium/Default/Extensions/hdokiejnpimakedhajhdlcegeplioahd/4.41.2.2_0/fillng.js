function LPNG_humanize_fill(e,t){if(!(e=e||LP_derive_doc())||!t)return!1;var r=101;return!o(e,t)&&(void 0!==t.beforeJS&&t.beforeJS&&LPNG_javascript_beforefield(e,t),"number"==typeof t.quant&&50<t.quant&&(r=t.quant),void 0===t.send_keyevents&&(t.send_keyevents=!0),setTimeout(function(){LPNG_moveto_field(e,t),setTimeout(function(){LPNG_setval(e,t),setTimeout(function(){LPNG_moveout_field(e,t),void 0!==t.afterJS&&t.afterJS&&LPNG_javascript_afterfield(e,t)},r)},r)},r),!0);function o(e,t){if(!(e=e||LP_derive_doc())||!t)return!0;var r=t.field;if(!r)return!0;var o=t.type,n=t.value,i=t.allowforce,u=t.reqinfo,s=t.realurl,a=gettldcached(get_doc_location_href(e)),_;if(skip_filling_field(r,a))return!0;if(!(t.is_launch?1:0)&&should_ignore_autocompleteoff_bypref(e,r))return!0;if(r.form&&!lpCheckWarnInsecure(r.form,r.form.ownerDocument,!1,i))return!0;var l=LP_iscrossdomainok(e,a,r,o,n,u,s);return"calldelayed"==l?(console_warn("you lose"),!0):!l||!chkoriginok(e,s)}}function LPNG_moveto_field(e,t){if(!(e=e||LP_derive_doc())||!t||!t.field)return!1;var r=t.field,o={},n=LP_getAbsolutePos(e,r);if(!n)return!1;if(o.target=r,o.posx=n.left,o.posy=n.top,LPNG_mouse_moveto(e,o),o.bubble=!1,LP_fireEvent(r,"mouseenter","MouseEvent",o),o.bubble=!0,LP_fireEvent(r,"mouseenter","MouseEvent",o),LPNG_do_focus(e,o),lp_in_array(r.type,["select","select-one"])){var i=r.selectedIndex,u=r.options;if(u.length>=i){var s=u[i];s&&s.value===t.value?pass:LP_humanizeClick(e,r,o)}}else lp_in_array(r.type,["radio","checkbox"])||LP_humanizeClick(e,r,o)}function LPNG_javascript_beforefield(e,t){return!!((e=e||LP_derive_doc())&&t&&t.beforeJS)}function LPNG_setval(e,t){if(!(e=e||LP_derive_doc())||!t)return!1;var r=t.field,o=t.type,n=t.value,i=t.checked,u=t.sharedsite,s=t.keyevents;if(!r||!o)return!1;var a={};if(d(e,t))return!1;var _=!1;switch(t.type){case"tel":case"number":case"url":case"text":r.value!=t.value&&("function"==typeof sendkey&&s&&(sendKey(KeyEvent.DOM_VK_SHIFT,r),sendKey(KeyEvent.DOM_VK_SPACE,r),sendKey(KeyEvent.DOM_VK_BACKSPACE,r)),r.value=t.value,_=!0),LP_getform_for_input(e,r);break;case"password":r.value!=t.value&&(r.value=t.value,_=!0),LP_getform_for_input(e,r),u&&("undefined"!=typeof g_isie&&g_isie||(lpsharedpasswordfills[lpsharedpasswordfills.length]=r));break;case"checkbox":case"radio":var l,f;if(r.checked&&!i||!r.checked&&i)(l={}).target=r,(f=LP_getAbsolutePos(e,r))&&(l.posx=f.left,l.posy=f.top),LP_humanizeClick(e,r,l),_=!0;break;case"select":case"select-one":if(r.value!=t.value){var v=r.options;if(v){for(var c=0;c<v.length;c++)if(v[c].value===t.value){var l,f;(l={}).target=v[c],(f=LP_getAbsolutePos(e,v[c]))&&(l.posx=f.left,l.posy=f.top),LP_humanizeClick(e,v[c],l);break}}else;_=!0,r.value=t.value}break;case"textarea":r.value!=t.value&&(r.value=t.value,_=!0),LP_getform_for_input(e,r);break;default:console_warn("unsupported type "+t.type)}return _&&LPNG_do_input(e,t),!0;function d(e,t){if(!(e=e||LP_derive_doc())||!t)return!0;var r=t.field;return!(!LP_fieldIsDisabled(r)&&!LP_fieldIsReadOnly(r))}}function LPNG_do_input(e,t){if(!(e=e||LP_derive_doc())||!t)return!1;var r=t.field,o=LP_getAbsolutePos(e,r);if(o){var n=o.posx,i=o.posy,u;LP_fireEvent(r,"input","Event",{evt_class:"Event",posx:n,posy:i})}return!0}function LPNG_moveout_field(e,t){if(!(e=e||LP_derive_doc())||!t)return!1;var r=t.field;if(!r)return!1;var o={},n=LP_getAbsolutePos(e,r);if(!n)return!1;o.target=r,o.posx=n.left,o.posy=n.top,LPNG_mouse_moveto(e,o),LPNG_do_unfocus(e,o),o.target=null,o.posx=n.left+2,o.posy=n.top+2,LPNG_mouse_moveto(e,o),o.bubble=!1,LP_fireEvent(r,"mouseleave","MouseEvent",o),o.bubble=!0,LP_fireEvent(r,"mouseout","MouseEvent",o)}function LPNG_javascript_afterfield(e,t){return!!((e=e||LP_derive_doc())&&t&&t.afterJS)}function LPNG_customjs(e,t){}function LPNG_mouse_moveto(e,t){if(!(e=e||LP_derive_doc())||!t)return!1;var r=t.target;r=r||e.documentElement;var o=t.posx,n=t.posy,i;return LP_fireEvent(r,"mousemove","MouseEvent",{evt_class:"MouseEvent",posx:o,posy:n}),!0}function LPNG_do_focus(e,t){if(!(e=e||LP_derive_doc())||!t)return!1;var r=t.target;r=r||e.documentElement;try{var o=t.posx,n=t.posy,i={evt_class:g_isie?"FocusEvent":"UIEvent",posx:o,posy:n};LP_fireEvent(r,"focus",g_isie?"FocusEvent":"UIEvent",i),i.bubble=!1,LP_fireEvent(r,"focusin",g_isie?"FocusEvent":"UIEvent",i)}catch(e){r.focus()}return!0}function LPNG_do_unfocus(e,t){if(!(e=e||LP_derive_doc())||!t)return!1;var r=t.target;r=r||e.documentElement;try{var o=t.posx,n=t.posy,i={evt_class:g_isie?"FocusEvent":"UIEvent",posx:o,posy:n};LP_fireEvent(r,"blur",g_isie?"FocusEvent":"UIEvent",i),i.bubble=!1,LP_fireEvent(r,"focusout",g_isie?"FocusEvent":"UIEvent",i)}catch(e){r.blur()}return!0}function fillfield_handler(e){}function LPNG_pick_field(e,t){if(!(e=e||LP_derive_doc())||!t)return null;var r=null,o=t.name,n=t.type,i=t.formname,u=t.otherfield;if(i){var s="INPUT";n&&("select-one"==n.toLowerCase()?s="SELECT":"textarea"==n.toLowerCase()&&(s="TEXTAREA")),r=LP_getElementByIdOrName(e,o,s,i)}if(r)return r;if(r=LP_getElementByIdOrName(e,o))return r;if(u){var a=e.getElementsByTagName("select-one"==n?"select":"textarea"==n?"textarea":"input"),_=o.match(/^(input|select|textarea)(\d+)$/);if(_){var l=parseInt(_[2]);l>a.length&&(l=a.length-1),r=a[l]}}return r}
//# sourceMappingURL=sourcemaps/fillng.js.map
