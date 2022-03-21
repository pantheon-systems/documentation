### Potential Wordpress Multisite with Composer Subdirectory Solution

We support WordPress multisites with subdirectories. However, if you are working with a composer-based Multisite ​setup, your sub sites might produce redirect errors. Your reference URLs might be incorrect if your WordPress core file path looks like this: `/code/web/wp`.

<Alert title="Note"  type="info" >

The solution outlined below has worked for select customers, and may not work for your specific configuration / environment.

</Alert>

Move your WordPress core files from `/code/web/wp` to the `/code/web` root by using the [example WordPress Composer script](https://github.com/pantheon-systems/example-wordpress-composer/blob/f73fe27153ba6a772e7b316edd3442ed1de7c29d/scripts/composer/cleanup-composer).

 Note that this script is only intended as an example to help you get started. You will most likely need to make changes to match your current configuration.

 

 