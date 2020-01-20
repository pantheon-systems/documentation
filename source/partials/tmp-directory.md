## Using the tmp Directory

**Issue:** Extensions that require the use of the `/tmp` directory are not supported. With multiple application containers, as exists on Live environments, it's assumed the `/tmp` directory will be on the same application container. However, as we run a distributed application container matrix, the `/tmp` directory is not shared.

**Solution:** For more details, see [Temporary File Management](/tmp/).
