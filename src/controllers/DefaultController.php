<?php
/**
 * Element Links plugin for Craft CMS 3.x
 *
 * A simple plugin to provide easier edit, view, download and more to element fields (entries, categories, assets).
 *
 * @link      https://github.com/fvaldes33
 * @copyright Copyright (c) 2019 Franco Valdes
 */

namespace fvaldes33\enhancedelementlinks\controllers;

use fvaldes33\enhancedelementlinks\EnhancedElementLinks;

use Craft;
use craft\web\Controller;

/**
 * DefaultController Controller
 *
 * Generally speaking, controllers are the middlemen between the front end of
 * the CP/website and your plugin’s services. They contain action methods which
 * handle individual tasks.
 *
 * A common pattern used throughout Craft involves a controller action gathering
 * post data, saving it on a model, passing the model off to a service, and then
 * responding to the request appropriately depending on the service method’s response.
 *
 * Action methods begin with the prefix “action”, followed by a description of what
 * the method does (for example, actionSaveIngredient()).
 *
 * https://craftcms.com/docs/plugins/controllers
 *
 * @author    Franco Valdes
 * @package   EnhancedElementLinks
 * @since     1.0.0
 */
class DefaultController extends Controller
{

    // Protected Properties
    // =========================================================================

    /**
     * @var    bool|array Allows anonymous access to this controller's actions.
     *         The actions must be in 'kebab-case'
     * @access protected
     */
    protected $allowAnonymous = false;

    // Public Methods
    // =========================================================================

    /**
     * Handle a request going to our plugin's index action URL,
     * e.g.: actions/element-links/default-controller
     *
     * @return mixed
     */
    public function actionElementUrl()
    {
        $this->requirePostRequest();
        $this->requireAcceptsJson();

        $request = Craft::$app->getRequest();
        $id = (int) $request->getBodyParam('elementId');
        $type = $request->getBodyParam('elementType');
        $siteId = (int) $request->getBodyParam('siteId');

        $element = EnhancedElementLinks::$plugin->service->getElement($type, $id, $siteId);
        
        return $this->asJson(array_merge([
            'success' => true
        ], $element));
    }
}
