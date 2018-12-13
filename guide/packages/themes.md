---
title: Themes
---

# Themes

<div class="badges">

[![Source](https://img.shields.io/badge/source-caffeinated/themes-blue.svg?style=flat-square)](https://github.com/caffeinated/themes)
[![Latest Stable Version](https://poser.pugx.org/caffeinated/themes/v/stable?format=flat-square)](https://packagist.org/packages/caffeinated/themes)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://tldrlegal.com/license/mit-license)
[![Total Downloads](https://img.shields.io/packagist/dt/caffeinated/themes.svg?style=flat-square)](https://packagist.org/packages/caffeinated/themes)

</div>

Gives your application the means to group together a set of views and assets. Giving you an easy way to further decouple the way your application looks from your code base.

[[toc]]

## Installation
Simply install the package through Composer. From here the package will automatically register its service provider and `Theme` facade.

```
composer require caffeinated/themes
```

### Config
To publish the config file, run the following:

```
php artisan vendor:publish --provider="Caffeinated\Themes\ThemesServiceProvider" --tag="config"
```

Below you will find the contents of the provided config file for reference.

```php
<?php

return [

	/*
	|--------------------------------------------------------------------------
	| Theme Path
	|--------------------------------------------------------------------------
	|
	| Define the path where your themes will reside. By default we will assign
	| themes to live at base of your Laravel application. Because themes
	| can extend Laravel, this makes the most sense as the default.
	*/

	'path' => base_path('themes'),

	/*
	|--------------------------------------------------------------------------
	| Default Active Theme
	|--------------------------------------------------------------------------
	|
	| Assign the default active theme to be used if one is not set during
	| runtime. This is especially useful if you're developing a very basic
	| application that does not require dynamically changing the theme.
	|
	*/

	'active' => 'bootstrap',

	/*
	|--------------------------------------------------------------------------
	| Default Author
	|--------------------------------------------------------------------------
	|
	| Define your default author name. This is used when generating themes.
	| We will use this value in the generated theme manifest file so that
	| you may reference the author of your themes in your application.
	|
	*/

	'author' => '',

	/*
	|--------------------------------------------------------------------------
	| Default Vendor
	|--------------------------------------------------------------------------
	|
	| Define your default vendor name. This is used when generating themes.
	| We will use this value in the generated composer file so that you
	| may register your themes as a composer package as well.
	|
	*/
	
	'vendor' => 'vendor',

];
```

## Basic Usage

### Creating Themes
Themes can be created by the use of the `make:theme` Artisan command:

```
php artisan make:theme Bootstrap
```

This command will generate all the necessary files and folders to get you up and running quickly at `themes/Bootstrap`.

You'll notice that the structure of themes resemble that of Composer packages. This is intentional and should feel immediately familiar to you. Nothing too scary here!

### Manifest
One of the important files that **must** be present at the root of every theme, is the theme's manifest file: `theme.json`. This file contains the info and identification of your theme. You may also use this to store theme-specific settings if you wish. Let's look at the contents provided out of the box and go over each in detail:

```json
{
	"name": "Bootstrap",
	"slug": "bootstrap",
    "description": "Bootstrap your application with this awesome theme.",
    "author": "John Doe",
	"version": "1.0",
}
```

| Property | Description |
|----------|-------------|
| name **\*** | The human-readable name of your theme. |
| slug **\*** | The slug of your theme used to reference in commands and code. |
| version | The version of your theme. |
| description | A simple description of your theme. |
| author | The author of your theme. |

**\*** These properties are required in every manifest.

### Service Providers
One of the cool things about themes, is their ability to provide their own set of resources and routes to your application. This is great for one-off application needs that may be tied directly to your theme. Keeps all the logic contained without muddying up your main application.

A `ThemeServiceProvider` and `RouteServiceProvider` is provided out of the box. Feel free to modify these files or create your own service providers as needed.

::: tip NOTE
Be sure to register your custom service providers within your `ThemeServiceProvider`. Refer to Laravel's service provider [documentation](https://laravel.com/docs/5.7/providers) as needed.
:::

## API Reference
The base theme class is actually an extension of Laravel's Collection class. So, by proxy you will have access to all the methods provided by [Collections](https://laravel.com/docs/5.7/collections) as well as the additions outlined below.

<div class="collection-method-list">

[set](#set)
[path](#path)
[getLayout](#getLayout)
[setLayout](#setLayout)
[setCurrent](#setCurrent)
[getCurrent](#getCurrent)
[isCurrently](#isCurrently)

</div>

### set
Set the currently active theme.

```php
Theme::set('bootstrap');
```

### path
Get the path of the given theme file. By default will reference the currently set theme. You may optionally pass the second parameter through with the slug of the theme you wish to target.

```php
Theme::path('resources/js/bootstrap.js');

Theme::path('resources/js/bootstrap.js', 'bootstrap');
```

### getLayout
Return the currently set theme layout property.

```php
Theme::getLayout();
```

### setLayout
Set the active theme layout property.

```php
Theme::setLayout('admin');
```

### setCurrent
Manually set the currently active theme property. Recommended means of setting the currently active theme is through the `set` method to properly resolve your theme resources.

```php
Theme::setCurrent('bootstrap');
```

### getCurrent
Return the slug of the currently active theme.

```php
Theme::getCurrent();
```

### isCurrently
Checks if the passed slug is the currently active theme. Returns a boolean value.

```php
if (Theme::isCurrently('bootstrap')) {
    // Do something
}
```