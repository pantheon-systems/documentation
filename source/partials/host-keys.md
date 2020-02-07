### Authenticity & Fingerprint Prompts

Your first connection to any remote server over an SSH connection (like Git or SFTP) will prompt you to confirm the host identity:

```none
The authenticity of host '[codeserver.dev.UUID.drush.in]:2222 ([IP.ADDRESS]:2222)' can't be established.
RSA key fingerprint is SHA256:yPEkh1Amd9WFBSP5syXD5rhUByTjaKBxQnlb5CahZZE.
Are you sure you want to continue connecting (yes/no)?
```

You can safely type `yes` and press enter to add the server's SSH key fingerprint to your computer's `known_hosts` file. Additional connections to this specific Pantheon container will complete successfully without prompts. However, you will be prompted to confirm connections following a container migration, which is part of regular maintenance on the platform. See the following Pro Tip to automatically accept all Pantheon connections.

<Accordion title="Pro Tip: Trust All Pantheon Hosts" id="host-keys" icon="lightbulb">

The key fingerprint is a representation of the public key, used by the remote server to identify itself. These public keys, along with private keys, form a **keypair** used by the [Diffie-Hellman key exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) to encrypt communication between you and the server.

On a standard server system, the server administrator would publish their host keys and fingerprints publicly, so clients could match them to the keys presented at these prompts. On Pantheon however, application containers are created and destroyed too rapidly to maintain a public key list.

You can, however, easily tell your machine to automatically trust all Pantheon `*.drush.in` servers by disabling the `StrictHostKeyChecking` option in your SSH configuration file.

<Alert title="Warning" type="danger">

Be aware that you're disabling a security feature, and trusting your DNS system to always point you to the right IP addresses.

</Alert>

Open `~/.ssh/config` (or create a new file if one does not exist) and add the following lines:

```confg:title=~/.ssh/config
Host *.drush.in
    StrictHostKeyChecking no
```

Now, requests to any `*.drush.in` server address should automatically accept the server's SSH key fingerprint without prompting you.

</Accordion>
