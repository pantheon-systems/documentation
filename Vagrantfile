unless Vagrant.has_plugin?("vagrant-hostmanager")
    raise "vagrant-hostmanager plugin is not installed. Please install it with vagrant plugin install vagrant-hostmanager"
end
unless Vagrant.has_plugin?("vagrant-auto_network")
    raise "vagrant-auto_network plugin is not installed. Please install it with vagrant plugin install vagrant-auto_network"
end

Vagrant.configure("2") do |config|

  # tunables
  env_prefix  = ENV['DRUPAL_VAGRANT_ENV_PREFIX'] || 'DRUPAL_VAGRANT'
  project     = ENV["#{env_prefix}_PROJECT"] || 'docs'
  # end tunables

  config.vm.box         = "craychee/pantheon-drupal"
  config.vm.box_version = ">=0.2.1"
  path                  = "/vagrant"

  config.vm.synced_folder ".", "/vagrant", :disabled => true
  config.vm.synced_folder ".", path, :nfs => true
  config.vm.network "private_network", :auto_network => true
  config.hostmanager.enabled = true
  config.hostmanager.manage_host = true
  config.hostmanager.aliases = "#{project}.local"

  config.ssh.forward_agent = true
  config.ssh.insert_key = false

  config.vm.provision :shell, inline: <<SCRIPT
  set -ex
  phantomjs --webdriver=8643 &> /dev/null &
  su vagrant -c 'cd #{path} && composer install && bundle && npm install;
  bin/sculpin generate --env=prod && ln -sf #{path}/source #{path}/output_*
  bin/sculpin serve &
  disown'
SCRIPT
end
