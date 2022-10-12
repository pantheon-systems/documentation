To find the maximum connections available to the site’s database, connect to the site’s database and run:

```sql{promptUser: sql}
SHOW VARIABLES LIKE "max_connections";
```

There are many other factors that you should consider if you have concerns about maximum database connections. Contact your [CSM](/guides/professional-services#customer-success-management) or [Sales](https://pantheon.io/contact-sales?docs) for more information.
