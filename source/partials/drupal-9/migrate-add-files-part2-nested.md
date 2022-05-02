1. Navigate to your Drupal site's root directory to run this command:
   <TabList>
 
   <Tab title="With Nested Docroot" id="code-docroot" active={true}>

   ```bash{promptUser:user}
   cd web/sites/default/files
   tar -czf ~/files.tar.gz .
   ```
   </Tab>

   <Tab title="Without Nested Docroot" id="code-nodocroot">

   ```bash{promptUser:user}
   cd sites/default/files
   tar -czf ~/files.tar.gz .
   ```

   </Tab>

   </TabList>
   
    Now you have created an archive file in your user's home directory.
 