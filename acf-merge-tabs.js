// Tab Merge Scripts

(function($) {

    acf.add_action("ready", function($el) {

        /* ------------------------------------------- */

        if($('.acf-postbox .acf-tab-wrap')[0]){
            var parentBox = merge_acf_tabs();

            if($('#wpseo_meta')[0]){
                merge_yoast_tab('SEO', 'yoast', $('#wpseo_meta'), parentBox['tab'], parentBox['box']); 
            }
        }

        /* ------------------------------------------- */

        function merge_acf_tabs(){
            var tab_groups = $('.acf-postbox:not(.acf-hidden) > .acf-fields > .acf-tab-wrap');
            var tab_wraps = $(".acf-postbox:not(.acf-hidden) > .acf-fields > .acf-tab-wrap").parent(".inside");
            var firstBoxTab = tab_groups.first();
            var firstBox = tab_wraps.first();

            // Merge the tabs
            if (tab_groups.length > 1) {
                firstBoxTab.closest('.acf-fields.inside').siblings('h2.hndle').find('span').html('PAGE CONTENTS AND SETTINGS');
                firstBoxInstance = acf.getInstance(firstBoxTab);

                tab_groups.not(firstBoxTab).find('.acf-tab-group >li').each(function() {
                    var a = $(this).find('.acf-tab-button');
                    var field = acf.getInstance($('.acf-field[data-key='+a.data('key')+']'));
                    firstBoxInstance.addTab(a, field).close();
                });

                // Merge the tab content
                if (tab_wraps.length > 1) {      

                    tab_wraps.not(firstBox).each(function() {
                        $(this).children().appendTo(firstBox);
                        $(this).parents(".acf-postbox").remove();
                    });
                }
                return {'tab': firstBoxInstance, 'box': firstBox};
            }else if(tab_groups.length == 1){
                firstBoxTab.closest('.acf-fields.inside').siblings('h2.hndle').find('span').html('PAGE CONTENTS AND SETTINGS');
                firstBoxInstance = acf.getInstance(firstBoxTab); 
                return {'tab': firstBoxInstance, 'box': firstBox};
            }else{
                return false;
            }
        }

        /* ------------------------------------------- */

        function merge_yoast_tab( component_title, component_slug , component_content_element, parentBoxTab, parentBox ){

            var component_content_element_inside = component_content_element.find('>.inside')

            //Yoast SEO Tab
            var a = "<a href='' class='acf-tab-button' data-placement='top' data-endpoint='0' data-key='" + component_slug + "'>" + component_title + "</a>";
            var field = "<div class='acf-field acf-field-tab' data-key='" + component_slug + "'></div>" + "<div class='acf-field' data-key='" + component_slug + "-content'></div>";

            //Yoast SEO Content
            parentBox.append(field);
            $('.acf-field[data-key="' + component_slug + '-content"]').append(component_content_element);

            var field_instance = $('.acf-field-tab[data-key="' + component_slug + '"]');
            field = new acf.models.TabField(field_instance);
            parentBoxTab.addTab(a, field).close();
        }
 

        /* ------------------------------------------- */

    });

}(jQuery));
