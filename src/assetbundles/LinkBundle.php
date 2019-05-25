<?php
/**
 * Element Links plugin for Craft CMS 3.x
 *
 * A simple plugin to provide easier edit, view, download and more to element fields (entries, categories, assets).
 *
 * @link      https://github.com/fvaldes33
 * @copyright Copyright (c) 2019 Franco Valdes
 */

namespace fvaldes33\enhancedelementlinks\assetbundles;

use Craft;
use craft\web\AssetBundle;
use craft\web\assets\cp\CpAsset;

class LinkBundle extends AssetBundle
{
    // Public Methods
    // =========================================================================

    /**
     * @inheritdoc
     */
    public function init()
    {
        $this->sourcePath = "@fvaldes33/enhancedelementlinks/assetbundles/dist";

        $this->depends = [
            CpAsset::class,
        ];
        
        $this->js = [
            'element-links.js',
        ];

        $this->css = [
            'element-links.css',
        ];

        parent::init();
    }
}