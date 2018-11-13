// Tab Merge Scripts

(function($) {

    acf.add_action("ready", function($el) {

        /* ------------------------------------------- */

        if($('.acf-postbox .acf-tab-wrap')[0]){
            var parentBox = merge_acf_tabs();

            if($('#wpseo_meta')[0] && parentBox){
                merge_yoast_tab('SEO', 'yoast', $('#wpseo_meta'), parentBox['tab'], parentBox['box']); 
            }
        }

        /* ------------------------------------------- */

        function merge_acf_tabs(){

            var tabs = acf.getInstances($('.acf-fields.inside >.acf-tab-wrap'));
            
            for(var i = 0; i < tabs.length; i++){
                var tab = tabs[i];

                if(i == 0){
                    tab.$el.closest('.acf-fields.inside').siblings('h2.hndle').find('span').html('PAGE CONTENTS AND SETTINGS');
                }else{
                    for( var j = 0; j < tab.tabs.length; j++){
                        var element = tab.tabs[j].field.$el;
                        var element_next = element.next();
                        var element_group_field = element.closest('.acf-postbox');
                        element.appendTo(tabs[0].tabs[0].field.$el.closest('.acf-fields.inside'));
                        element_next.appendTo(tabs[0].tabs[0].field.$el.closest('.acf-fields.inside'));
                        tabs[0].addTab(tab.tabs[j].$el.html(), tab.tabs[j].field).close();
                        element_group_field.remove();
                    }
                }
            }

            if(tabs.length > 0){
                return {'tab': tabs[0], 'box': tabs[0].tabs[0].field.$el.closest('.acf-fields.inside')};
            }else{
                return false;
            }
        }

        /* ------------------------------------------- */

        function merge_yoast_tab( component_title, component_slug , component_content_element, parentBoxTab, parentBox ){
            $(window).on('load', function(){
                //Yoast SEO Tab
                var component_content_element_inside = component_content_element.find('>.inside')
                var a = "<a href='' class='acf-tab-button' data-placement='top' data-endpoint='0' data-key='" + component_slug + "'>" + component_title + "</a>";
                var field = "<div class='acf-field acf-field-tab' data-key='" + component_slug + "'></div>" + "<div class='acf-field' data-key='" + component_slug + "-content'></div>";
                var field_instance;

                parentBox.append(field);
                field_instance = $('.acf-field-tab[data-key="' + component_slug + '"]');
                $('.acf-field[data-key="' + component_slug + '-content"]').append(component_content_element_inside);
                field = new acf.models.TabField(field_instance);
                parentBoxTab.addTab(a, field).close();
                component_content_element.remove();
            });
        }
 

        /* ------------------------------------------- */

    });

}(jQuery));
