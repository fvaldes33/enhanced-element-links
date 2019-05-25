<?php
/**
 * Element Links plugin for Craft CMS 3.x
 *
 * A simple plugin to provide easier edit, view, download and more to element fields (entries, categories, assets).
 *
 * @link      https://github.com/fvaldes33
 * @copyright Copyright (c) 2019 Franco Valdes
 */

namespace fvaldes33\enhancedelementlinks\services;

use fvaldes33\enhancedelementlinks\EnhancedElementLinks;

use Craft;
use craft\base\Component;
use craft\db\Query;

/**
 * LinkService Service
 *
 * @author    Franco Valdes
 * @package   EnhancedElementLinks
 * @since     1.0.0
 */
class LinkService extends Component
{
    // Public Methods
    // =========================================================================

    /**
     * This function gets the element and it's relationships.
     * 
     * @param type string
     * @param id int
     * @param siteId int
     * 
     * @return array
     */
    public function getElement(string $type, int $id, int $siteId): array
    {
        $element = Craft::$app->getElements()->getElementById($id, $type, $siteId);
        
        $otherRelations = (new Query)
            ->select(['sourceId', 'sourceSiteId'])
            ->from('{{%relations}}')
            ->where([
                'or',
                ['sourceSiteId' => $siteId],
                ['sourceSiteId' => null]
            ])
            ->andWhere(['targetId' => $id]);
        
        $relatedElements = [];
        if ($otherRelations->count() > 1) {
            $rels = $otherRelations->all();
            foreach ($rels as $key => $rel) {
                $relatedElement = Craft::$app->getElements()->getElementById($rel['sourceId'], null, $rel['sourceSiteId'] ?? $siteId);
                if ($relatedElement && $relatedElement->title) {
                    array_push($relatedElements, $relatedElement->title);
                }
            }
        }

        return [
            'elementTitle' => $element->title,
            'elementUrl' => $element->url ?? null,
            'elementCpUrl' => $element->cpEditUrl ?? null,
            'elementAssetUrl' => $type === "craft\\elements\\Asset" ? $element->getUrl() : null,
            'relatedElements' => array_values(array_unique($relatedElements))
        ];
    }
}
