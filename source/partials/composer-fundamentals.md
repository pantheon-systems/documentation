<p>Composer is a PHP dependency manager that provides an alternative, more modern way to manage the external code used by a WordPress or Drupal site. At its primary level, Composer needs:
  <ul>
    <li>A list of dependencies</li>
    <li>A place to put the dependencies</li>
  </ul>
</p>
<p>Understanding how Composer can be used independent of Drupal or WordPress is a good place to learn more about the general concepts. For a summary of basic usage, see <a href="https://getcomposer.org/doc/01-basic-usage.md" class="external">Composer's own documentation</a>.</p>
<div class="enablement">
  <h4 class="info" markdown="1"><a href="https://pantheon.io/agencies/learn-pantheon?docs" class="external">Automation Training</a></h4>
  <p>Master Composer concepts with help from our experts. Pantheon delivers custom workshops to help development teams master the platform and improve internal DevOps.</p>
</div>
<h2>Dependencies</h2>
<p>Composer encourages a mental model where code not written specifically for a given project is a dependency. Only files unique to the project are tracked as part of the project's main source repository, also referred to as the canonical site repository. Dependencies for WordPress and Drupal include core, plugins, contrib modules, themes, and libraries. A single dependency, such as a theme, is referred to as a package.</p>

<p>Composer looks within <a href="https://packagist.org/" class="external">The PHP Package Repository</a> for dependencies to install, which does not include Drupal or WordPress packages by default. Additional repositories must be configured for Composer to use packages not found in the default repository. Each framework provides it's own respective package repository so dependencies can be managed with Composer:
<ul>
<li>WordPress: <a href="https://wpackagist.org" class="external">https://wpackagist.org</a></li>
<li>Drupal 8: <a href="https://packages.drupal.org/8" class="external">https://packages.drupal.org/8</a></li>
<li>Drupal 7: <a href="https://packages.drupal.org/7" class="external">https://packages.drupal.org/7</a></li>
</ul>
</p>
