<?php
register_rest_route( 'acme/v1', '/widgets', array() );
register_block_type( 'acme/widget-card' );
do_action( 'acme_widget_saved', $id );
WP_CLI::add_command( 'acme purge', 'Acme_Purge' );
// register_block_type( 'acme/commented-out' );
