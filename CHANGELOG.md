# Enhanced Element Links Changelog

All notable changes to this project will be documented in this file.

## 1.0.2- 2019-05-28
### Updated
- For performance sake, limited the related entries query to 5 elements but kept the total count intact.
- Refactored the javascript for my sanity

### Fixed
- Fixed an issue where craft was throwing a 302 intermitently

### Removed
- Removed fetching link data for User element type

## 1.0.1 - 2019-05-27
### Fixed
- Changed `Craft.postActionRequest` to `Craft.queueActionRequest` to prevent random 302 redirects from posting via ajax too quickly.

## 1.0.0 - 2019-05-23
### Added
- Initial release
