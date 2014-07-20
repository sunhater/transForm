(function($) {

    $.fn.transForm = function(options) {

        var tags = "|form|fieldset|legend|input|select|textarea|button|",
            types = "|button|text|file|checkbox|radio|submit|reset|password|",
            o = {
                cssPrefix: "tf-"
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
            return this.outerSpace(selector, 'bottom', mbp);
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

            build = {

                form: function() {
                    $(t).find(tags.substr(1, tags.length - 2).replace(/\|/g, ",")).transForm(options);
                    toggleClass(t, cls(tagName));
                },

                fieldset: function() {
                    this.form();
                },

                legend: function() {
                    toggleClass(t, cls(tagName));
                },

                input: function() {
                    if (types.indexOf("|" + type + "|") != -1)
                        this[type]();
                },

                select: function() {

                    if ($(t).attr('multiple')) {
                        toggleClass(t, cls('selectMultiple'));
                        if (construct && t.disabled)
                            $(t).addClass(cls('disabled'));
                        else if (destruct)
                            $(t).removeClass(cls('disabled'))

                    } else {
                        var el;

                        if (construct) {
                            el = $('<div class="' + cls(tagName) + '"><div class="' + cls('selected') + '"><span></span></div><div class="' + cls('right') + '"><span>&nbsp;</span></div><div class="' + cls('menu') + '"></div></div>');

                            if (t.disabled)
                                el.addClass(cls('disabled'));

                            $(t).after(el).detach().prependTo(el).find('option').each(function() {
                                var opt = $('<div><span>' + this.text + '</span></div>');
                                opt.data({value: this.value}).appendTo(el.find(sel('menu')));
                            });

                            var update = function() {
                                el.find(sel('selected') + ' span').html($(t).find('option:selected').text());
                            };

                            el.click(function() {
                                if (!t.disabled) {
                                    var menu = $(this).find(sel('menu'));
                                    el.toggleClass(cls('opened'));
                                }
                            }).find(sel('menu') + ' div').click(function() {
                                t.value = $(this).data('value');
                                update();
                            });

                            var menu = el.find(sel('menu')),
                                selected = el.find(sel('selected')),
                                right = el.find(sel('right'));

                            selected.css({
                                width: menu.outerWidth() - outerHSpace(selected)
                            });
                            el.css({
                                width: selected.outerWidth() + right.outerWidth()
                            });
                            menu.css({
                                marginTop: el.outerHeight() - 1,
                                width: el.outerWidth() - outerHSpace(menu)
                            });
                            update();

                        } else if (destruct) {
                            el = $(t).parent();
                            $(t).detach();
                            el.after(t).detach();
                        }
                    }
                },

                textarea: function() {
                    toggleClass(t, cls(tagName));
                    return true;
                },

                button: function() {

                },

                text: function() {
                    toggleClass(t, cls("text"));
                    return true;
                },

                file: function() {

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

            if (destruct)
                $(t).removeData('transForm');

            if (construct)
                $(t).data({
                    transForm: {
                        prefix: prefix,
                        transformed: true
                    }
                });

        });

        return $(this);
    };

})(jQuery);