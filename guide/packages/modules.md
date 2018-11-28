---
title: Modules
---

# Modules
Extract and modularize your code for maintainability. Essentially creates "mini-laravel" structures to organize your application.

[[toc]]

## Installation
Simply install the package through Composer. From here the package will automatically register its service provider.

```
composer require caffeinated/modules
```

### Facade
Optionally, you may also register the accompanying facade for easier access to the underlying API. Inside your project's `config/app.php` file, add the following to the array of facades:

```php
'Module' => Caffeinated\Modules\Facades\Module::class,
```

### Config
To publish the config file, run the following:

```
php artisan vendor:publish --provider="Caffeinated\Modules\ModulesServiceProvider" --tag="config"
```

Below you will find the contents of the provided config file for reference.

```php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Path to Modules
    |--------------------------------------------------------------------------
    |
    | Define the path where you'd like to store your modules. Note that if you
    | choose a path that's outside of your public directory, you will need to
    | copy your module assets (CSS, images, etc.) to your public directory.
    |
    */

    'default_location' => 'modules',

    'locations' => [
        'modules' => [
            'driver'    => 'local',
            'path'      => app_path('Modules'),
            'namespace' => 'App\\Modules\\',
            'enabled'   => true,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Modules Default State
    |--------------------------------------------------------------------------
    |
    | When a previously unknown module is added, if it doesn't have an 'enabled'
    | state set then this is the value which it will default to. If this is
    | not provided then the module will default to being 'enabled'.
    |
    */

    'enabled' => true,

    /*
    |--------------------------------------------------------------------------
    | Modules Default Service Provider class name
    |--------------------------------------------------------------------------
    |
    | Define class name to use as default module service provider.
    |
    */

    'provider_class' => 'Providers\\ModuleServiceProvider',

    /*
    |--------------------------------------------------------------------------
    | Default Module Driver
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default module storage druver that should be
    | used by the package. A "local" driver is available out of the box that
    | uses the local filesystem to store and maintain module manifests.
    |
    */

    'default_default' => 'local',

    /*
     |--------------------------------------------------------------------------
     | Module Drivers
     |--------------------------------------------------------------------------
     |
     | Here you may configure as many module drivers as you wish. Use the
     | local driver class as a basis for creating your own. The possibilities
     | are endless!
     |
     */

    'drivers' => [
        'local' => 'Caffeinated\Modules\Repositories\LocalRepository',
    ],

    /*
    |--------------------------------------------------------------------------
    | Remap Module Subdirectories
    |--------------------------------------------------------------------------
    |
    | Redefine how module directories are structured. The mapping here will
    | be respected by all commands and generators.
    |
    */

    'pathMap' => [
        // To change where migrations go, specify the default
        // location as the key and the new location as the value:
        // 'Database/Migrations' => 'src/Database/Migrations',
    ],
];
```

## Basic Usage
When it comes to larger applications, instead of mixing and matching your controllers, models, etc. across the various domains of your project, modules can group related logic together into a tidy "package". Out of the box, modules are stored in the `app/Modules` directory. Later on we'll go over how you can change this location or even add additional locations to store your modules.

### Creating Modules
Modules can be created by the use of the `make:module` Artisan command:

```
php artisan make:module Blog
```

This command will generate all the necessary files and folders to get you up and running quickly at `app/Modules/Blog`.

You'll notice that the structure of modules closely resemble the default Laravel folder structure. This is intentional and should feel immediately familiar to you. Nothing too scary here!

### Manifest
One of the important files that **must** be present at the root of every module, is the module's manifest file: `module.json`. This file contains the info and identification of your module. You may also use this to store module-specific settings if you wish. Let's look at the contents provided out of the box and go over each in detail:

```json
{
	"name": "Blog",
	"slug": "blog",
	"version": "1.0",
	"author": "The Doctor",
	"license": "MIT",
	"description": "Only the best blog module in the world!",
	"order": 100
}
```

| Property | Description |
|----------|-------------|
| name **\*** | The human-readable name of your module. |
| slug **\*** | The slug of your module used to reference in commands and code. |
| version **\*** | The version of your module. |
| author | The author of your module. |
| license | The license that the module falls under. |
| description **\*** | A simple description of your module. |
| order | The order in which your module is loaded. Defaults to `9999`. |

The only required properties are `name`, `slug`, `description`, and `version`. You may optionaly remove or add any other property as you see fit.

Once you've made a change to a manifest file, you will need to re-optimize your module manifest cache. You can do this by running the following Artisan command:

```
php artisan module:optimize
```

### Service Providers
Just as the case with Laravel packages, service providers are the connection points between your module and Laravel. A service provider is responsible for binding things into Laravel's service container and information Laravel where to load module resources such as views, configuration, and localization files.

A `ModuleServiceProvider` and `RouteServiceProvider` is provided out of the box with some defaults configured for your module's localization, view, migration, configuration, factory, and route files. Feel free to modify these files or create your own service providers as needed.

You may generate a new provider via the `make:module:provider` command:

```
php artisan make:module:provider blog PublisherServiceProvider
```

::: tip NOTE
Be sure to register your custom service providers within your `ModuleServiceProvider`. Refer to Laravel's service provider [documentation](https://laravel.com/docs/5.7/providers) as needed.
:::

## Publishing Resources
Typically, you will need to publish your module's resources to the application's own directories. This will allow users of your module to easily override your default resources.

To publish your module's resources to the application, you may call the service provider's `publishes` method within the `boot` method of your service provider. The `publishes` method accepts an array of module paths and their desired publish locations. For example, to publish a config file for your `blog` module, you may do the following:

```php
/**
 * Perform post-registration booting of services.
 *
 * @return void
 */
public function boot()
{
    $this->publishes([
        module_path('blog', 'config/blog.php') => config_path('blog.php'),
    ]);
}
```