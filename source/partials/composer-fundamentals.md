Composer is a PHP dependency manager that provides an alternative, more modern way to manage the external code used by a WordPress or Drupal site. At its primary level, Composer needs:

- A list of dependencies
- A place to put the dependencies

Understanding how Composer can be used independent of Drupal or WordPress is a good place to learn more about the general concepts. For a summary of basic usage, see [Composer's own documentation](https://getcomposer.org/doc/01-basic-usage.md).

<Callout title="Automation Training" link="https://pantheon.io/learn-pantheon?docs">

Learn Composer concepts with help from our experts. Pantheon delivers on-demand training to help development teams navigate the platform and improve internal WebOps.

</Callout>

## Dependencies

Composer encourages a mental model where code not written specifically for a given project is a dependency. Only files unique to the project are tracked as part of the project's main source repository, also referred to as the canonical site repository. Dependencies for WordPress and Drupal include core, plugins, contrib modules, themes, and libraries. A single dependency, such as a theme, is referred to as a package.

Composer looks within [The PHP Package Repository](https://packagist.org/) for dependencies to install, which does not include Drupal or WordPress packages by default. Additional repositories must be configured for Composer to use packages not found in the default repository. Each framework provides it's own respective package repository so dependencies can be managed with Composer:

- WordPress: [https://wpackagist.org](https://wpackagist.org)
- Drupal 8: [https://packages.drupal.org/8](https://packages.drupal.org/8)
- Drupal 7: [https://packages.drupal.org/7](https://packages.drupal.org/7)
