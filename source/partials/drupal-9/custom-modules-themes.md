To move modules, use the following commands:

<TabList>

<Tab title="With Nested Docroot" id="code-docroot" active={true}>

```bash{promptUser:user}
git checkout master web/modules/custom
git mv web/modules/custom web/modules/
git commit -m "Copy custom modules"
```

</Tab>


<Tab title="Without Nested Docroot" id="code-nodocroot">

<Partial file="drupal-9/custom-modules-themes-no-docroot.md" />

</Tab>

</TabList>

To move themes, use the following commands:

<TabList>

<Tab title="Code for a Nested Docroot" id="code-docroot" active={true}>

```bash{promptUser:user}
git checkout master web/themes/custom
git mv web/themes/custom web/themes/
git commit -m "Copy custom themes"
```
</Tab>


<Tab title="Code if No Nested Docroot" id="code-nodocroot">

```bash{promptUser:user}
git checkout master themes/custom
git mv themes/custom web/themes/
git commit -m "Copy custom themes"
```
</Tab>

</TabList>