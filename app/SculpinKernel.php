<?php
require __DIR__ . DIRECTORY_SEPARATOR . 'Sort.php';

class SculpinKernel extends \Sculpin\Bundle\SculpinBundle\HttpKernel\AbstractKernel
{
    protected function getAdditionalSculpinBundles()
    {
        return array(
        );
    }
}
