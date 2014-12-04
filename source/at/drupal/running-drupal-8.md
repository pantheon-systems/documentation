---
title: Running Drupal 8 on Pantheon
categories:
    - howto
/running-drupal-8-on-pantheon/
Metadata
filename: source/_tools/running-drupal-8-on-pantheon.md
---

# Coming Soon

Drupal 8 is currently in a feature freeze and will be available again on Pantheon once it is slightly more stable.

<!--


<p>There&#39;s a lot of excitement about Drupal 8 right now, with a number of key development initiatives underway. Pantheon helps more coders get involved by making it a breeze to set up Drupal 8 sandboxes.</p>


<p><strong>Please note: Drupal 8 is a moving target. Using it on Pantheon requires you to be familiar with the state of core development and ready to make additional changes to get the installation working.</strong></p>


<p><img alt="" src="https://pantheon-systems.desk.com/customer/portal/attachments/36400" style="width: 611px; height: 126px; " /></p>


<h2 id="get-the-latest-code">Get the latest code!</h2>
&nbsp;


<p>First of all you&#39;ll need to start with the <strong>Drupal 8 Developer Sandbox</strong> start state for your site. Once that spins up, you&#39;ll want to execute a few handy git commands to make sure you&#39;re fully up to date:</p>


<pre class="terminal">
# Clone the repository from Pantheon
git clone [the git url from the dashboard] drupal-8-sandbox
# Go into your git directory
cd drupal-8-sandbox
# Add drupal.org as a remote upstream
git remote add drupal http://git.drupal.org/project/drupal.git
# Insure you&#39;re up to date with the very latest commits!
git fetch --all
git pull drupal 8.x
# Put it on Pantheon
git push origin master
</pre>


<p><br />
At this point, you&#39;re running on the latest Drupal 8 head. If you were to want to work on a sandbox, you&#39;d then add the info from the Drupal sandbox page. For this example, I&#39;ll use the info from <a href="http://drupal.org/sandbox/johnalbin/1488942">http://drupal.org/sandbox/johnalbin/1488942</a>.</p>


<pre class="terminal">
# Add the sandbox
git remote add mobile_sandbox http://git.drupal.org/sandbox/johnalbin/1488942.git
git fetch --all
# Pull the changes from one of the branches there that I want to test on Pantheon
git pull mobile_sandbox 1468582-mobile-meta-tags
# Put it on Pantheon
git push origin master
</pre>


<p>The git instructions on drupal for creating and applying patches should work as per normal. Just keep in mind that if you&#39;re working off a Pantheon sandbox, the git remote <code>origin</code> is Pantheon and <code>drupal</code> is drupal.org. Happy patching!</p>


<h2 id="installing-drupal-8">Installing</h2>
&nbsp;


<p>Currently you will need to add a &quot;config&quot; directory for the new D8 configuration system. We&#39;re working on making this easier and set up to support git-managed configuration. For now, this command will work form your local installation:</p>


<pre class="terminal">
sftp -oPort=2222 dev.[site-uuid]@appserver.dev.[site-uuid].drush.in
sftp&gt; cd files
sftp&gt; mkdir config
</pre>


<p>Where <code>site uuid</code> is the long unique string that identifies your site&#39;s dashboard after the /sites part (e.g. <code>sites/<strong>34983d44-e913-4279-bdba-ca14de457b61</strong></code>). Your install should then proceed.</p>


<p>Hit <core>/core/install.php to run the installer.</core></p>


<h2 id="troubleshooting">Troubleshooting</h2>


<p>It&#39;s quite possible that at this point the installation isn&#39;t working. We are working on collecting known issues, but since core is constantly evolving we can&#39;t guarantee a specific path to making the installation work. Stay tuned for updates on this as core stabilizes.</p>


<p>At this point you should feel free to dive in and start hacking!</p>
-->
