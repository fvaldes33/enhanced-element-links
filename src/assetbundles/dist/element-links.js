Craft.EnhancedElementLinks = Garnish.Base.extend({
    $elements: [],
    $fields: [],

    init: function () {
        var _this = this;

        this.createLinks();

        // get all element fields
        this.$fields = $(".field .input .elements");
        this.$categories = $(".categoriesfield");

        // mutation observer to listen for changes
        var config = {
            childList: true,
            subtree: true
        };

        var callback = function (mutationsList) {
            for (var mutation of mutationsList) {
                if (mutation.type == 'childList') {
                    _this.createLinks();
                }
            }
        };

        var observer = new MutationObserver(callback);

        this.$fields.each(function () {
            observer.observe(this, config);
        });

        this.$categories.each(function () {
            observer.observe(this, config);
        });
    },
    
    createLinks: function () {
        var _this = this;

        this.$elements = $(".field .input .element:not(.element-linked)");
        this.$elements.each(function () {
            _this.link(this);
        });
    },

    link: function(el) {
        $(el).addClass('element-linked');

        Craft.queueActionRequest('enhanced-element-links/default/element-url',
            {
                elementType: $(el).data('type'),
                elementId: $(el).data('id'),
                siteId: $(el).data('site-id')
            },
            function (response, textStatus) {
                if (response && textStatus === "success") {
                    var $label = $(el).find('.label');
                    var $g = $('<div>', {
                        class: 'element-link-group'
                    });

                    if (response.elementCpUrl) {
                        var $a = $('<a>', {
                            class: 'element-link edit',
                            target: '_blank',
                            title: 'Edit in new tab',
                            href: response.elementCpUrl,
                            html: '<svg width="15px" height="15px" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g><path d="m87.828 12.117c-4.3164-4.3164-11.859-4.3164-16.188 0l-27.816 27.812c-0.31641 0.31641-0.56641 0.71094-0.69922 1.1406l-6.1133 18.141c-0.37109 1.0586-0.09375 2.2305 0.69922 3.0195 0.56641 0.55859 1.3125 0.85938 2.082 0.85938 0.32422 0 0.62891-0.054688 0.94141-0.15234l18.141-6.125c0.42188-0.14062 0.81641-0.38281 1.1367-0.70703l27.816-27.816c2.1602-2.1602 3.3398-5.0312 3.3398-8.0898 0.003906-3.0586-1.1797-5.9219-3.3398-8.082zm-4.1562 12.02-27.336 27.328-11.855 4 4-11.863 27.324-27.324c2.1016-2.0938 5.7656-2.0938 7.8711 0 1.0469 1.0547 1.6172 2.4453 1.6172 3.9297 0 1.4805-0.58203 2.875-1.6211 3.9297z"/><path d="m77.477 45.766c-1.6172 0-2.9414 1.3164-2.9414 2.9414v27.117c0 5.1953-4.2188 9.418-9.4102 9.418h-41c-5.1953 0-9.4102-4.2227-9.4102-9.418l-0.003906-41c0-5.1875 4.2188-9.418 9.4102-9.418h27.125c1.6172 0 2.9414-1.3164 2.9414-2.9414s-1.3242-2.9414-2.9414-2.9414h-27.121c-8.4336 0-15.293 6.8633-15.293 15.301v41c0 8.4336 6.8594 15.301 15.293 15.301h41.008c8.4336 0 15.293-6.8633 15.293-15.301l-0.003906-27.117c-0.003906-1.6289-1.3164-2.9414-2.9453-2.9414z"/></g></svg>'
                        });
                        $g.append($a)
                    }
                    
                    if (response.elementUrl) {
                        var $v = $('<a>', {
                            class: 'element-link view',
                            target: '_blank',
                            title: 'View in new tab',
                            href: response.elementUrl,
                            html: '<svg width="15px" height="15px" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m60 7v6h22.758l-54.879 54.879 4.2422 4.2422 54.879-54.879v22.758h6v-33zm-53 10v76h76v-43h-6v37h-64v-64h37v-6z"/></svg>'
                        });
                        $g.append($v)
                    }

                    if ($(el).data('type') === "craft\\elements\\Asset") {
                        var $d = $('<a>', {
                            class: 'element-link download',
                            target: '_blank',
                            title: 'Download asset',
                            download: response.elementTitle,
                            href: response.elementUrl,
                            html: '<svg width="15px" height="15px" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g><path d="m64 54.699h-9.3008v-46.598h-9.1992l-0.19922 46.598h-9.3008l14 18.602z"/><path d="m64 53.699h-9.3008l1 1v-46.5c0-0.5-0.5-1-1-1h-9.1992c-0.5 0-1 0.5-1 1 0 15.5-0.10156 31-0.10156 46.5 0.30078-0.30078 0.69922-0.69922 1-1h-9.3008c-0.69922 0-1.3008 0.89844-0.89844 1.5 4.6016 6.1992 9.3008 12.398 13.898 18.602 0.5 0.60156 1.1992 0.60156 1.6992 0 4.6016-6.1992 9.3008-12.398 13.898-18.602 0.80078-1-1-2-1.6992-1-4.6016 6.1992-9.3008 12.398-14 18.602h1.6992c-4.6992-6.1992-9.3008-12.398-14-18.602-0.30078 0.5-0.60156 1-0.89844 1.5h9.3008c0.5 0 1-0.5 1-1 0-15.5 0.10156-31 0.10156-46.5l-1 1h9.1992c-0.30078-0.30078-0.69922-0.69922-1-1v46.5c0 0.5 0.5 1 1 1h9.3008c1.5 0 1.5-2 0.30078-2z"/><path d="m82.602 73.301v9.3008h-65.102v-9.3008h-9.3984v18.5h83.699v-18.5z"/><path d="m81.602 73.301v9.3008c0.30078-0.30078 0.69922-0.69922 1-1h-65.102c0.30078 0.30078 0.69922 0.69922 1 1v-9.3008c0-0.5-0.5-1-1-1h-9.3008c-0.5 0-1 0.5-1 1v18.602c0 0.5 0.5 1 1 1h83.699c0.5 0 1-0.5 1-1v-18.602c0-0.5-0.5-1-1-1h-9.3008c-1.3008 0-1.3008 2 0 2h9.3008c-0.30078-0.30078-0.69922-0.69922-1-1v18.602c0.30078-0.30078 0.69922-0.69922 1-1h-83.699c0.30078 0.30078 0.69922 0.69922 1 1v-18.602l-1 1h9.3008l-1-1v9.3008c0 0.5 0.5 1 1 1h65.102c0.5 0 1-0.5 1-1v-9.3008c0-1.3008-2-1.3008-2 0z"/></g></svg>'
                        });
                        $g.append($d)
                    }

                    if (response.relatedElements && response.relatedElements.length) {
                        var $r = $('<span>', {
                            class: 'element-link relatedto',
                            html: '+' + response.relatedElements.length
                        });
                        
                        var max = 5;
                        var els = response.relatedElements.length > max ? response.relatedElements.slice(0, max) : response.relatedElements;
                        var extra = response.relatedElements.length > max ? response.relatedElements.length - max : null;
                        var $li = els.map(function (e) {
                            return $('<li>', { html: e });
                        });
                        if (extra) {
                            $li.push($('<li>', { html: '+ ' + extra + ' more' }));
                        }
                        $li.unshift($('<li>', { html: '<b>Also related to:</b>' }));

                        var $t = $('<ul>', {
                            class: 'element-link-rel',
                            html: $li
                        })
                        $g.append($r, $t);
                    }

                    $g.insertAfter($label);
                }
            }
        );
    }
});