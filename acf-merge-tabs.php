<?php
/**
 * Plugin Name: ACF Merge Tabs
 * Description: Merges ACF tabs across field groups into a single tab list
 * Version: 1.0.0
 * Author: Kelvin
*/

/**
 * Merge Advanced Custom Fields tab groups into a single group.
 *
 * @since 1.0.0
 */

Class AcfTabMerge{
	static function tab_merge_admin_enqueue_scripts(){

		wp_enqueue_script( 'tab-merge-script', plugins_url( 'acf-merge-tabs.js', __FILE__ ), array(), '1.0.0', true );

	}
}

add_action( 'acf/input/admin_enqueue_scripts', array('AcfTabMerge' , 'tab_merge_admin_enqueue_scripts') );