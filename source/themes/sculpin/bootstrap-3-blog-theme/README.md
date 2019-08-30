A Bootstrap 3 Blog Theme for Sculpin
====================================

Requirements
------------

This theme requires Bootstrap 3, font awesome, and jQuery 1.9.*.  Please see
`_includes/custom/head.html` and `_includes/custom/after_footer.html` to see
where we expect these to live by default.

Feel free to create fresh copies of these files in `sources/_includes/custom/`
to override these values if you intend to install these dependencies elsewhere.

Installation
------------

Sculpin can automatically install this theme for you by adding the following to
your `sculpin.json`:

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url": "git@github.com:sculpin/bootstrap-3-blog-theme.git"
        }
    ],
    "require": {
        "sculpin/bootstrap-3-blog-theme": "dev-master"
    }
}
```

Once installed, modify `app/config/sculpin_kernel.yml` like this:

```yaml
sculpin_theme:
    theme: sculpin/bootstrap-3-blog-theme
```

Not Invented Here
-----------------

Largely inspired by [Octopress](http://octopress.org/) classic theme.
