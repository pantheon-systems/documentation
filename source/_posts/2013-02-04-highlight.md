---
title: Syntax Highlighting
categories:
    - features

---
You're all programmers, right? And you're writing code snippets on your Sculpin
powered blog? Yeah. So you want some highlighting with your static site generation?
Here you go!

    namespace Foo;

    /**
     * Awesome Contrived Example.
     */
    class Bar implements BarInterface
    {
        private $baz;

        public function __construct(BazInterface $baz)
        {
            $this->baz = $baz;
        }

        public function doIt()
        {
            return $this->baz->do('it');
        }
    }

You can also use [fenced code blocks][fcb] with a syntax declaration at the top.
The markers are `~` instead of <code>`</code>.

[fcb]: http://michelf.ca/projects/php-markdown/extra/#fenced-code-blocks

~~~php
if ($fencedCodeBlock->syntax !== 'PHP') {
    throw new UnexpectedValueException("wat");
}
~~~
Like this addition to the skeleton? You can thank for [@Pawka](https://github.com/Pawka)
for suggesting it. :)
