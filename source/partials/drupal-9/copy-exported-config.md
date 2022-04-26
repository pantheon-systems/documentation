<TabList>

<Tab title="With Nested Docroot" id="code-docroot" active={true}>

```bash{promptUser:user}
git checkout existing-8/master -- config
git mv config/* config/
git commit -m "Add site configuration."
```

</Tab>

<Tab title="Without Nested Docroot" id="code-nodocroot">

```bash{promptUser:user}
git checkout existing-8/master -- sites/default/config
git mv sites/default/config/* config/
git commit -m "Add site configuration."
```

</Tab>

</TabList>