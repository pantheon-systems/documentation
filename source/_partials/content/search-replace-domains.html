<!-- This partial assumes that you're including a heading in the referring doc. -->

<p>WordPress sites with custom domains configured on multiple environments may see references to the wrong platform domain after cloning the database from one environment to another.</p>

<p>The Site Dashboard runs <code>wp search-replace</code> during the cloning workflow to update environment URLs automatically. This operation, however, only runs once on a single set of URLs. If the target environment has a custom domain (e.g <code>test.example.com</code>), it's used to replace the source environment's custom domain (e.g. <code>www.example.com</code>). This can cause the target environment to have incorrect references to platform domains (e.g. <code>live-example.pantheonsite.io</code>).</p>

<p>You can resolve this using one of two methods:</p>

<!-- Nav tabs -->

<ul class="nav nav-tabs" role="tablist">
<!-- Active tab -->
<li id="terminus-replace" role="presentation" class="active"><a href="#terminus-replace-anchor" aria-controls="terminus-replace-anchor" role="tab" data-toggle="tab">Terminus</a></li>

<!-- 2nd Tab Nav -->
<li id="quicksilver-replace" role="presentation"><a href="#quicksilver-replace-anchor" aria-controls="quicksilver-replace-anchor" role="tab" data-toggle="tab">Quicksilver</a></li>
</ul>

<!-- Tab panes -->

<div class="tab-content">
<!-- Active pane content -->
<div role="tabpanel" class="tab-pane active" id="terminus-replace-anchor">

<p>Using <a href="/docs/terminus">Terminus</a>, you can run an additional <code>wp search-replace</code> command on the target environment after cloning. Set or replace the variables <code>$site</code> and <code>$env</code> with your site name and the correct environment:</p>

<pre><code class="bash">terminus remote:wp $site.$env -- search-replace "://live-example.pantheonsite.io" "://test.example.com" --all-tables --verbose
</code></pre>

<p>The following example also converts the URL from HTTP to HTTPS, for situations where you might have HTTPS in one environment and not another:</p>

<pre><code class="bash">terminus remote:wp $site.$env -- search-replace "http://live-example.pantheonsite.io" "https://test.example.com" --all-tables --verbose
</code></pre>

</div>

<!-- 2nd pane content -->
<div role="tabpanel" class="tab-pane" id="quicksilver-replace-anchor">

<p>For those using <a href="/docs/quicksilver/">Quicksilver</a> scripts, consider the following example. On each <code>passthru</code> line, replace <code>example#.pantheonsite.io</code> and <code>example.com</code> with the domains you want to find and replace, respectively:</p>

<pre><code class="php">&lt;?php
echo "Replacing previous environment urls with new environment urls... \n";

if ( ! empty( $_ENV['PANTHEON_ENVIRONMENT'] ) ) {
  switch( $_ENV['PANTHEON_ENVIRONMENT'] ) {
    case 'live':
      passthru('wp search-replace "://test-example.pantheonsite.io" "://example.com" --all-tables ');
      break;
    case 'test':
      passthru('wp search-replace "://example1.pantheonsite.io" "://test-examplesite.pantheonsite.io" --all-tables ');
      passthru('wp search-replace "://example2.pantheonsite.io" "://test-examplesite.pantheonsite.io" --all-tables ');
      passthru('wp search-replace "://example3.pantheonsite.io" "://test-examplesite.pantheonsite.io" --all-tables ');
      break;
  }
}
?&gt;
</code></pre>

<p>The example above replaces three URLs when cloning to the test environment with <code>test-examplesite.pantheonsite.io</code>, and replaces that domain with the example <a href="/docs/domains/#custom-domains">custom domain</a> <code>example.com</code> when cloning to the live environment.</p>

<p>You can find this example and many others in the <a href="https://github.com/pantheon-systems/quicksilver-examples" title="" class="external">Quicksilver Examples</a> repo.</p>

</div>
</div>

<div class="alert alert-info" role="alert">
  <h4 class="info">Note</h4>
  <p>In addition to the style above, URLs may be stored in an encoded format. If the example above fails to resolve all issues, search for patterns like <code>%3A%2F%2Fexample.com</code> and <code>:\/\/example.com</code>.</p>
</div>
