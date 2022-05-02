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

