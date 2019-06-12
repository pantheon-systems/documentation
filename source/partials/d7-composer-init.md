<li><p>Initialize composer to create a <code>composer.json</code> file with the Drupal 7 package repository:</p>
  <pre><code class="command">composer init --repository=https://packages.drupal.org/7 --no-interaction</code></pre>
</li>
<li><p>Edit the <code>composer.json</code> to add extra configuration that specifies installation paths for Drupal modules, libraries, and themes.</p>
 <div class="alert alert-info" role="alert">
   <h4 class="info">Note</h4>
   <p>Since Pantheon does not support Git submodules <a class="pop" rel="popover" data-proofer-ignore data-toggle="popover" data-html="true" data-title="Git submodules" data-content="Some Composer packages are added as Git submodules, which place a Git repository within a subdirectory of your site’s repository."><em class="fa fa-info-circle"></em></a>, we recommend using the provided script <code>remove-git-submodules</code> to remove any <code>.git</code> directories upon install and update.</p>
 </div>
 <pre><code class="json">{
  "repositories": [
    {
      "type": "composer",
      "url": "https://packages.drupal.org/7"
    }
  ],
  "require": {},
  "extra": {
    "installer-paths": {
      "sites/all/modules/{$name}/": ["type:drupal-module"],
      "sites/all/themes/{$name}/": ["type:drupal-theme"],
      "sites/all/libraries/{$name}/": ["type:drupal-library"]
    }
  },
  "scripts": {
    "remove-git-submodules": "find . -mindepth 2 -type d -name .git | xargs rm -rf",
    "post-install-cmd": [
      "@remove-git-submodules"
    ],
    "post-update-cmd": [
      "@remove-git-submodules"
    ]
  },
  "config": {
    "vendor-dir": "sites/all/vendor"
  }
}</code></pre>
</li>
