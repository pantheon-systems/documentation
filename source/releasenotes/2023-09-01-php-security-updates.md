---
title: PHP Security Updates
published_date: "2023-09-01"
categories: [infrastructure, security, action-required]
---
Pantheon has deployed PHP versions [8.2.9](https://www.php.net/ChangeLog-8.php#8.2.9), [8.1.22](https://www.php.net/ChangeLog-8.php#8.1.22), and [8.0.30](https://www.php.net/ChangeLog-8.php#8.0.30) to customer sites running on the platform. These releases address vulnerabilities disclosed in [CVE-2023-3823](https://nvd.nist.gov/vuln/detail/CVE-2023-3823) and [CVE-2023-3824](https://nvd.nist.gov/vuln/detail/CVE-2023-3824).

If you are using PHP 8.2, 8.1 or 8.0, there is nothing further that you need to do. If you are still on PHP 7.4 or earlier, though, you should schedule some time to upgrade to a supported version.While the vulnerabilities patched in these latest releases are not reported to affect PHP 7.4, the fact remains that there could be (and probably are) unpatched vulnerabilities in the end-of-life versions. Read more about it in Greg Anderson’s [blog post](https://pantheon.io/blog/php-829-security-release-demonstrates-pantheons-commitment-protecting-your-sites).
