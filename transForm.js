(function($) {

    $.fn.transForm = function(options) {

        // Get scrollbar width
        var div = $('<div></div>')
            .css({width: 100, height: 100, overflow: 'auto', position: 'absolute', top: -1000, left: -1000})
            .prependTo('body').append('<div></div>').find('div').css({width: '100%', height: 200}),
        scrollbarWidth = 100 - div.width();
        div.parent().remove();


        var tags = "|form|fieldset|input|select|textarea|button|label|",
            types = "|button|text|file|checkbox|radio|submit|reset|password|",
            o = {
                cssPrefix: "tf-",
                file: {
                    noFile: "No file chosen",
                    browse: "Browse",
                    count: "{count} files"
                },
                textarea: {
                    autoExpand: false,
                    maxLength: 0
                }
            },

        outerSpace = function(selector, type, mbp) {
            var r = 0, x;

            if (!mbp) mbp = "mbp";

            if (/m/i.test(mbp)) {
                x = parseInt($(selector).css('margin-' + type));
                if (x) r += x;
            }

            if (/b/i.test(mbp)) {
                x = parseInt($(selector).css('border-' + type + '-width'));
                if (x) r += x;
            }

            if (/p/i.test(mbp)) {
                x = parseInt($(selector).css('padding-' + type));
                if (x) r += x;
            }

            return r;
        },

        outerLeftSpace = function(selector, mbp) {
            return outerSpace(selector, 'left', mbp);
        },

        outerTopSpace = function(selector, mbp) {
            return outerSpace(selector, 'top', mbp);
        },

        outerRightSpace = function(selector, mbp) {
            return outerSpace(selector, 'right', mbp);
        },

        outerBottomSpace = function(selector, mbp) {
            return outerSpace(selector, 'bottom', mbp);
        },

        outerHSpace = function(selector, mbp) {
            return (outerLeftSpace(selector, mbp) + outerRightSpace(selector, mbp));
        },

        outerVSpace = function(selector, mbp) {
            return (outerTopSpace(selector, mbp) + outerBottomSpace(selector, mbp));
        };

        $.extend(true, o, options);

        $(this).each(function() {

            var t = this,
                tagName = $(t).prop("tagName").toLowerCase();

            // Skip non-form tags
            if (tags.indexOf("|" + tagName + "|") == -1)
                return;

            var destroy = (options === false),
                transForm = $(t).data('transForm'),
                construct = (!destroy && !transForm),
                destruct = (destroy && transForm),
                prefix = transForm ? transForm.prefix : o.cssPrefix,
                type = $(t).attr('type'),
                type = type ? type : "text",
                el, store = {},

            toggleClass = function(el, cssClass) {
                if (construct)
                    $(el).addClass(cssClass);
                else if (destruct)
                    $(el).removeClass(cssClass);
            },

            cls = function(pClass) {
                return prefix + pClass;
            },

            sel = function(pClass) {
                return '.' + cls(pClass);
            },

            data = { // target parameter may be removed in the future
                set: function(object, target) {
                    if (typeof target == 'undefined')
                        target = t;
                    var d = $(target).data('transForm');
                    if (!d) d = {};
                    $.extend(true, d, object);
                    $(target).data('transForm', d);
                },
                get: function(key, target) {
                    if (typeof target == 'undefined')
                        target = t;
                    var d = $(target).data('transForm');
                    if (typeof key == 'undefined')
                        return d;
                    if (!d) d = {};
                    return d[key];
                },
                remove: function(key, target) {
                    if (typeof target == 'undefined')
                        target = t;
                    var d = $(target).data('transForm');
                    if (!d) d = {};
                    if (typeof d[key] == 'undefined')
                        return;
                    delete d[key];
                }
            },

            build = {

                form: function() {
                    $(t).find(tags.substr(1, tags.length - 2).replace(/\|/g, ",")).transForm(options);
                    toggleClass(t, cls(tagName));
                },

                fieldset: function() {
                    this.form();
                },

                label: function() {
                    if ($(t).is('[for]'))
                        toggleClass(t, cls('label'));
                },

                input: function() {
                    if (types.indexOf("|" + type + "|") != -1)
                        this[type]();
                },

                select: function() {

                    if ($(t).attr('multiple')) {
                        this.multiple();
                        return;
                    }

                    if (!construct) {
                        el = $(t).parent();
                        return;
                    }

                    el = $('<div class="' + cls(tagName) + '"><div class="' + cls('selected') + '"><span></span></div><div class="' + cls('right') + '"><span>&nbsp;</span></div><div class="' + cls('menu') + '"></div></div>');

                    var menu = el.find(sel('menu')),
                        selected = el.find(sel('selected')),
                        right = el.find(sel('right')),
                        clicked = false;

                    if (t.disabled)
                        el.addClass(cls('disabled'));

                    $(t).keydown(function(e) {
                        var code = e.keyCode,
                            up = (code == 38),
                            down = (code == 40),
                            enter = (code == 13),
                            space = (code == 32),
                            tab = (code == 9),
                            esc = (code == 27);

                        if ((e.metaKey && (code == 82)) || (code == 116))
                            return true;

                        if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey)
                            return false;

                        if (up || down) {
                            var current = selectCurrent();

                            var i = parseInt(current.attr('class').split(cls('index-'))[1].split(/\s/)[0]),
                                opts = menu.find('div'),
                                count = menu.data('count');

                            if (up) {
                                var prev = (i == 0) ? (count - 1) : (i - 1);
                                prev = opts[prev];
                                current.removeClass(cls('hover'));
                                current = $(prev);

                            } else {
                                var next = (i == count - 1) ? 0 : (i + 1);
                                next = opts[next];
                                current.removeClass(cls('hover'));
                                current = $(next);
                            }

                            opts.removeClass(cls('hover'));
                            current.addClass(cls('hover'));
                            data.set({current: current});

                            $(t).find('option').removeAttr('selected');
                            current.data('option').selected = true;
                            update();
                        }

                        if (space || enter) {
                            el.toggleClass(cls('opened'));
                            selectCurrent();
                        }

                        if (esc)
                            el.removeClass(cls('opened'));

                        if (!tab)
                            return false;
                    }).focus(function() {
                        el.addClass(cls('focused'));
                    }).blur(function() {
                        setTimeout(function() {
                            if (!clicked)
                                el.removeClass(cls('focused')).removeClass(cls('opened'));
                            else {
                                clicked = false;
                                t.focus();
                            }
                        }, 100);
                        return false;
                    }).after(el).detach().prependTo(el);

                    var count = 0,
                        optgroup = $(t).find('optgroup').get(0);

                    if (optgroup)
                        menu.html('<ul></ul>');

                    $(t).find('option, optgroup').each(function() {
                        if ($(this).is('option')) {
                            var opt = $('<div class="' + cls('index-') + count++ + '"><span>' + this.text + '</span></div>'),
                                target = $(this).parent().is('optgroup')
                                    ? optgroup
                                    : (optgroup ? menu.find('ul') : menu);
                            opt.data({option: this}).appendTo(target);
                        } else {
                            optgroup = $('<li><span>' + $(this).attr('label') + '</span></li>');
                            $(menu).find('ul').append(optgroup);
                        }
                    });
                    menu.data({count: count});

                    var update = function() {
                        var text = $(t).find('option:selected').text();
                        el.find(sel('selected') + ' span').html(text);
                    },

                    selectCurrent = function() {
                        var current = false;
                        menu.find('div').each(function() {
                            if ($(this).data('option') === $(t).find('option:selected').get(0)) {
                                $(this).addClass(cls('hover'));
                                data.set({current: $(this)});
                                current = $(this);
                                return false;
                            }
                        });
                        return current;
                    },

                    fClick = function() {
                        if (!t.disabled) {
                            clicked = true;
                            $(sel('focused')).removeClass(cls('focused'));
                            selectCurrent();

                            setTimeout(function() {
                                t.focus();
                                el.toggleClass(cls('opened'));
                                var div = menu.get(0);
                                if (el.hasClass(cls('opened')) && (div.scrollHeight > div.clientHeight)) {
                                    menu.css({borderBottomRightRadius: 0});
                                    menu.find(sel('last')).css({borderBottomRightRadius: 0});
                                }
                                clicked = false;
                            }, 200);
                        }

                    };

                    selected.mousedown(fClick);
                    right.mousedown(fClick);

                    menu.find('div').mousedown(function() {
                        $(t).find('option').removeAttr('selected');
                        $(this).data('option').selected = true;
                        update();
                        clicked = true;
                        el.removeClass(cls('opened'));
                        setTimeout(function() {
                            t.focus();
                            clicked = false;
                        }, 200);
                    }).mouseover(function() {
                        menu.find('div').removeClass(cls('hover'));
                        $(this).addClass(cls('hover'));
                    }).mouseout(function() {
                        $(this).removeClass(cls('hover'));
                    });

                    selected.css({
                        width: menu.outerWidth() - outerHSpace(selected)
                    });
                    el.css({
                        width: selected.outerWidth() + right.outerWidth()
                    });
                    menu.css({
                        marginTop: el.outerHeight() - 1,
                        width: el.outerWidth() - outerHSpace(menu)
                    }).find('li').first().addClass(cls('first'));
                    menu.find('li').last().addClass(cls('last'));
                    menu.find('li').each(function() {
                        $(this).find('div').first().addClass(cls('group-first')).parent().find('div').last().addClass(cls('group-last'));
                    });
                    menu.find('div').first().addClass(cls('first'));
                    menu.find('div').last().addClass(cls('last'));
                    var firstLi = menu.find('li').first(),
                        lastLi = menu.find('li').last();
                    if (firstLi.get(0) && firstLi.prev().get(0))
                        firstLi.removeClass(cls('first'));
                    if (lastLi.get(0) && lastLi.next().get(0))
                        lastLi.removeClass(cls('last'));


                    update();
                },

                multiple: function() {

                    if (!construct) {
                        el = $(t).parent();
                        return;
                    }

                    el = $('<div class="' + cls('multiple') + '"></div>');

                    var count = 0,
                        optgroup = $(t).find('optgroup').get(0);

                    if (optgroup)
                        el.html('<ul></ul>');

                    $(t).find('option, optgroup').each(function() {
                        if ($(this).is('option')) {
                            var opt = $('<div class="' + cls('index-') + count++ + '"><span>' + this.text + '</span></div>'),
                                inGroup = $(this).parent().is('optgroup'),
                                target = inGroup
                                    ? optgroup
                                    : (optgroup ? el.find('ul') : el);
                            opt.data({option: this}).appendTo(target);

                            if (this.selected)
                                opt.addClass(cls('selected'));
                            if (this === $(t).find('option').last().get(0))
                                opt.addClass(cls('last'));
                            if (!inGroup && (this === $(t).find('option').first().get(0)))
                                opt.addClass(cls('first'));
                            if (inGroup) {
                                if (this === $(this).parent().find('option').last().get(0))
                                    opt.addClass(cls('group-last'));
                                if (this === $(this).parent().find('option').first().get(0))
                                    opt.addClass(cls('group-first'));
                            }

                        } else {
                            optgroup = $('<li><span>' + $(this).attr('label') + '</span></li>');
                            if (this === $(t).find('optgroup, option').first().get(0))
                                optgroup.addClass(cls('first'));
                            if (this === $(t).find('optgroup').last().get(0))
                                optgroup.addClass(cls('last'));
                            el.find('ul').append(optgroup);
                        }
                    });

                    el.data({count: count});
                    $(t).after(el).detach().prependTo(el);

                    var div = el.get(0);
                    if (div.scrollHeight > div.clientHeight) {
                        el.css({
                            width: el.innerWidth() + scrollbarWidth,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0
                        });
                        el.find('div' + sel('first')).css({borderTopRightRadius: 0});
                        el.find('div' + sel('last')).css({borderBottomRightRadius: 0});
                        el.find('li' + sel('last')).css({borderBottomRightRadius: 0});
                    }

                    var liLast = el.find('li' + sel('last'));
                    if (liLast.get(0) && liLast.next().get(0))
                        liLast.removeClass(cls('last'));

                    el.find('div').mouseenter(function() {
                        $(this).addClass(cls('hover'));
                    }).mouseleave(function() {
                        $(this).removeClass(cls('hover'));
                    }).click(function(e) {
                        if (t.disabled)
                            return false;
                        var option = $(this).data('option');
                        if (option.selected) {
                            $(this).removeClass(cls('selected'));
                            option.selected = false;
                        } else {
                            $(this).addClass(cls('selected'));
                            option.selected = true
                        }
                        if (e.shiftKey && option.selected) {
                            var elm, next = true,
                                index = parseInt($(this).attr('class').split(cls('index-'))[1].split(/\s/)[0]);
                            while(index && next) {
                                index--;
                                elm = el.find(sel('index-') + index);
                                if (elm.hasClass(cls('selected')))
                                    next = false;
                                else {
                                    elm.addClass(cls('selected'));
                                    elm.data('option').selected = true;
                                }
                            }
                        }
                    });

                    el.click(function() {
                        var top = el.scrollTop();
                        t.focus();
                        el.scrollTop(top);
                    });

                    $(t).focus(function() {
                        el.addClass(cls('focused'));
                    }).blur(function() {
                        el.removeClass(cls('focused'))
                    }).change(function() {
                        $(t).find('option').each(function(i) {
                            var div = el.find(sel('index-') + i);
                            if (this.selected)
                                div.addClass(cls('selected'));
                            else
                                div.removeClass(cls('selected'));

                        });
                    });
                },

                textarea: function() {
                    toggleClass(t, cls(tagName));

                    if (t.readOnly)
                        toggleClass(t, cls('readOnly'));

                    if (!construct)
                        return;

                    var update;

                    if (o.textarea.autoExpand) {
                        $(t).css({overflow: 'hidden'});

                        update = function() {
                            $(t).scrollTop(0);

                            if (t.clientHeight >= t.scrollHeight)
                                $(t).css({height: 1});

                            $(t).css({height: t.scrollHeight + outerVSpace($(t), 'b')});
                        };

                    } else
                        update = function() {

                            var vScroll = (t.clientHeight < t.scrollHeight),
                                hScroll = (t.clientWidth < t.scrollWidth);

                            if (!store.r)
                                store.r = {
                                    tr: $(t).css('borderTopRightRadius'),
                                    br: $(t).css('borderBottomRightRadius'),
                                    bl: $(t).css('borderBottomLeftRadius')
                                };

                            $(t).css({
                                borderBottomRightRadius: (vScroll || hScroll) ? 0 : store.r.br,
                                borderTopRightRadius: vScroll ? 0 : store.r.tr,
                                borderBottomLeftRadius: hScroll ? 0 : store.r.bl
                            });
                        };

                    var u = function() {
                        update();
                        var maxLength = o.textarea.maxLength;
                        if (maxLength && (t.value.length > maxLength))
                            t.value = t.value.substr(0, maxLength);
                    };

                    u(); $(t).keyup(u).keydown(u).change(u).scroll(u);
                },

                button: function() {

                },

                text: function() {
                    toggleClass(t, cls("text"));
                    if (t.readOnly)
                        toggleClass(t, cls('readOnly'));
                },

                file: function() {

                    if (!construct) {
                        el = $(t).parent();
                        return;
                    }

                    el = $('<div class="' + cls('file') + '"><div class="' + cls('button') + '"><span>' + o.file.browse + '</span></div><div class="' + cls('info') + '"><span>&nbsp;</span></div></div>');

                    $(t).after(el).detach().prependTo(el);
                    var info = el.find(sel('info')),
                        button = el.find(sel('button')),
                        input = el.find('input'),
                        u = function() {
                            var files = this.files;
                            if (!files || (files.length <= 0))
                                info.find('span').html(o.file.noFile);
                            else
                                info.find('span').text((files.length == 1) ? files[0]['name'] : o.file.count.replace('{count}', files.length));
                        };

                    info.css({
                        width: el.innerWidth() - button.outerWidth() - outerHSpace(info)
                    })

                    input.css({
                        width: el.outerWidth(),
                        height: el.outerHeight()
                    }).focus(function() {
                        el.addClass(cls('focused'));
                    }).blur(function() {
                        el.removeClass(cls('focused'));
                    }).change(u).click(function() {
                        el.addClass(cls('focused'))
                    });

                    u();
                },

                checkbox: function() {

                },

                radio: function() {

                },

                submit: function() {
                    return this.button();
                },

                reset: function() {
                    return this.button();
                },

                password: function() {
                    return this.text();
                }
            };

            build[tagName]();

            // Common Construct
            if (construct) {
                data.set({
                    prefix: prefix,
                    transformed: true
                });
            }

            // Common Destruct
            if (destruct) {
                $(t).removeData('transForm');
                if (el) {
                    $(t).detach();
                    el.after(t).detach();
                }
            }

            // Toggle disabled
            if (typeof o.disabled != 'undefined') {
                t.disabled = !!o.disabled;
                if (!el)
                    el = $(t);
                if (o.disabled)
                    el.addClass(cls('disabled'));
                else
                    el.removeClass(cls('disabled'));
            }
        });
        return $(this);
    };

})(jQuery);