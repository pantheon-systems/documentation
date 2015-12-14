/**
 * Define DOMAIN_CURRENT_SITE conditionally.
 */
if ( ! empty( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
	switch( $_ENV['PANTHEON_ENVIRONMENT'] ) {
		case 'live':
			define( 'DOMAIN_CURRENT_SITE', 'www.example-network.com );
			break;
		case 'test':
			define( 'DOMAIN_CURRENT_SITE', 'www.test.example-network.com' );
			break;
		case 'dev':
			define( 'DOMAIN_CURRENT_SITE', 'www.dev.example-network.com' );
			break;
	}
}
