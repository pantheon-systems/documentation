### Platform Considerations

Due to the containerized nature of the platform, connections will change from time to time. For security reasons, using the `$_ENV` superglobal inside PHP applications is not supported. As an alternative, consider using a Bash script and Terminus connection; an example can be found in the [Create Secure Connection to MySQL using TLS](/ssh-tunnels#create-secure-connection-to-mysql-using-tls) documentation.
