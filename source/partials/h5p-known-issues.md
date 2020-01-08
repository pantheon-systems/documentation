**Issue:** Adding new libraries or content types from the H5P hub through the admin interface (or uploading large files from slow internet connections) can hit our max execution [timeout](/timeouts/), resulting in a 504 error:

<Image alt="H5P Timeout Error" path="h5p-timeout.png" />

While not a solution, re-running the **Install** process multiple times may result in success. You can also attempt to upload `.hp5` files from your local computer. If local uploads hit the timeout, please try from a faster connection.
