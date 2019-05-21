---
title: Modules
---

# Modules

<div class="badges">

[![Source](https://img.shields.io/badge/source-caffeinated/modules-blue.svg?style=flat-square)](https://github.com/caffeinated/modules)
[![Latest Stable Version](https://poser.pugx.org/caffeinated/modules/v/stable?format=flat-square)](https://packagist.org/packages/caffeinated/modules)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://tldrlegal.com/license/mit-license)
[![Total Downloads](https://img.shields.io/packagist/dt/caffeinated/modules.svg?style=flat-square)](https://packagist.org/packages/caffeinated/modules)
[![Travis (.org)](https://img.shields.io/travis/caffeinated/modules.svg?style=flat-square)](https://travis-ci.org/caffeinated/modules)

</div>

Extract and modularize your code for maintainability. Essentially creates "mini-laravel" structures to organize your application.

[[toc]]

## Installation
Simply install the package through Composer. From here the package will automatically register its service provider and `Module` facade.

```
composer require caffeinated/modules
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
    | Default Location
    |--------------------------------------------------------------------------
    |
    | This option controls the default module location that gets used while
    | using this package. This location is used when another is not explicitly
    | specified when exucuting a given module function or command.
    |
    */

    'default_location' => 'app',

    /*
    |--------------------------------------------------------------------------
    | Locations
    |--------------------------------------------------------------------------
    |
    | Here you may define all of the module locations for your application as
    | well as their drivers and other configuration options. This gives you
    | the flexibility to structure modules as you see fit in each location.
    |
    */

    'locations' => [
        'app' => [
            'driver'    => 'local',
            'path'      => app_path('Modules'),
            'namespace' => 'App\\Modules\\',
            'enabled'   => true,
            'provider'  => 'ModuleServiceProvider',
            'manifest'  => 'module.json',
            'mapping'   => [
                
                // Here you may configure the class mapping, effectively
                // customizing your generated default module structure.

                'Config'              => 'Config',
                'Database/Factories'  => 'Database/Factories',
                'Database/Migrations' => 'Database/Migrations',
                'Database/Seeds'      => 'Database/Seeds',
                'Http/Controllers'    => 'Http/Controllers',
                'Http/Middleware'     => 'Http/Middleware',
                'Providers'           => 'Providers',
                'Resources/Lang'      => 'Resources/Lang',
                'Resources/Views'     => 'Resources/Views',
                'Routes'              => 'Routes'
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Default Driver
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default module storage driver that should be
    | used by the package. A "local" driver is available out of the box that
    | uses the local filesystem to store and maintain module manifests.
    |
    */

    'default_driver' => 'local',

    /*
     |--------------------------------------------------------------------------
     | Drivers
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
	"description": "Only the best blog module in the world!",
}
```

| Property | Description |
|----------|-------------|
| name **\*** | The human-readable name of your module. |
| slug **\*** | The slug of your module used to reference in commands and code. |
| version **\*** | The version of your module. |
| description **\*** | A simple description of your module. |
| order | You may also optionally pass in the order in which your module is loaded. Defaults to `9001`. |

**\*** These properties are required in every manifest.

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

### Migrations
We've extended Laravel's migrations system to make it easier to work with migrations for your modules. Particularly, you're able to run, rollback, reset, and refresh migrations for individual modules separate from your application (or other modules). This makes it super easy to work with modules during development.

#### Generating Migrations
To create a module migration, use the `make:module:migration` Artisan command:

```
php artisan make:module:migration blog create_posts_table
```

The new migration will be placed in your defined migrations directory (by default this is `Database/Migrations`). Migrations follow the same workflow and structure as any other Laravel migration, so be sure to check out the documention on them [here](https://laravel.com/docs/5.7/migrations) for reference.

#### Running Migrations
To run all of your outstanding module migrations, execute the `module:migrate` Artisan command:

```
php artisan module:migrate
```

You may optionally specificy the exact module you'd like to run migrations against by passing through the slug:

```
php artisan module:migrate blog
```

Lastly, every module migrate command accepts the use of the `--location` flag to specify which module location to target.

#### Rolling Back Migrations
To rollback the latest migration operation, you use the `module:migrate:rollback` command.

```
php artisan module:migrate:rollback
```

The rollback command also supports the `step` option to rollback a certain number of migrations:

```
php artisan module:migrate:rollback --step=5
```

You may also specify the module you wish to rollback, specifically:

```
php artisan module:migrate:rollback blog
```

The `module:migrate:reset` command will roll back all of your module migrations or the migrations of the module you pass through:

```
php artisan module:migrate:reset

php artisan module:migrate:reset blog
```

### Enabling Modules
Modules may be enabled either through the `module:enable` artisan command or through the facade with `enable()`:

```
php artisan module:enable blog
```

```php
Module::enable('blog');
```

### Disabling Modules
Modules may be disabled either through the `module:disable` artisan command or through the facade with `disable()`:

```
php artisan module:disable blog
```

```php
Module::disable('blog');
```

## Digging Deeper

### Locations
You may configure as many locations for your modules as necessary. For example, you may to split up your "core" modules from optional "add-on" modules.

The location configuration is found in the `config/modules.php` file under "locations". Here you may customize locations as needed. By default, the package is configured to store and reference modules from the `app/Modules` directory.

Each location may have its own configuration options on how you'd like to structure your modules:

| Property | Description |
|----------|-------------|
| driver | The module driver to use for this location. |
| path | The root path where you wish to store modules for this location. |
| namespace | The root namespace used when generating modules for this location. |
| enabled | Whether or not modules are enabled by default or not in this location. |
| provider | The master provider class name for modules in this location. |
| manifest | The manifest filename for modules in this location. Must be a JSON file. |
| mapping | The custom mapping of directories for modules in this location. |

### Publishing Resources
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

### Provided Middleware
The bundled **Identify Module** middleware provides the means to pull and store module manifest information within the session on each page load. This provides the means to identify routes from specific modules.

#### Register
Simply register as a route middleware with a short-hand key in your `app/Http/Kernel.php` file.

```php
protected $routeMiddleware = [
    ...
    'module' => \Caffeinated\Modules\Middleware\IdentifyModule::class,
];
```

#### Usage
Now, you may simply use the `middleware` key in the route options array. The **IdentifyModule** middleware expects the slug of the module to be passed along in order to locate and load the relevant manifest information.

```php
Route::group(['prefix' => 'blog', 'middleware' => ['module:blog']], function() {
    Route::get('/', function() {
        dd(
            'This is the Blog module index page.',
            session()->all()
        );
    });
});
```

#### Results
If you `dd()` your session, you'll see that you have a new `module` array key with your module's manifest information available.

```
"This is the Blog module index page."
array:2 [▼
  "_token" => "..."
  "module" => array:6 [▼
    "name" => "Blog"
    "slug" => "blog"
    "version" => "1.0"
    "description" => "This is the description for the Blog module."
    "enabled" => true
    "order" => 9001
  ]
]
```

### Helpers
Caffeinated Modules includes a handful of global "helper" PHP functions. These are used by the package itself; however, you are free to use them in your own code if you find them convenient.

---

<div class="collection-method-list">

[modules](#modules-2)
[module_path](#module-path)
[module_class](#module-class)

</div>

---

#### modules
The `modules` function returns a collection of all modules and their accompanying manifest information.

```php
$modules = modules();
```

#### module_path
The `module_path` function returns the fully qualified path to the specified module's directory. You may also use the `module_path` function to generate a fully qualified path to a file relative to the module:

```php
$path = module_path('blog');

$path = module_path('blog', 'Http/Controllers/BlogController.php');
```

If your module is not found within your configured default location, you may pass a third option to specify the location:

```php
$path = module_path('blog', 'Http/Controllers/BlogController.php', 'add-on');
```

#### module_class
The `module_class` function returns the full namespace path of the specified module and class.

```php
$namespace = module_class('blog', 'Http\Controllers\BlogController');
```

If your module is not found within your configured default location, you may pass a third option to specify the location:

```php
$namespace = module_class('blog', 'Http\Controllers\BlogController', 'add-on');
```

## API Reference

<div class="collection-method-list">

[all](#all)
[slugs](#slugs)
[where](#where)
[sortBy](#sortby)
[sortByDesc](#sortbydesc)
[exists](#exists)
[count](#count)
[getManifest](#getmanifest)
[get](#get)
[set](#set)
[enabled](#enabled)
[disabled](#disabled)
[isEnabled](#isenabled)
[isDisabled](#isdisabled)
[enable](#enable)
[disable](#disable)

</div>

---

### all
Get all modules, returned as a `Collection`.

```php
$modules = Module::all();
```

### slugs
Get all modules, returned as a `Collection`.

```php
$modules = Module::slugs();
```

### where
Find a module based on a where clause, returns a `Collection`.

```php
$blogModule = Module::where('slug', 'blog');
```

### sortBy
Get all modules sorted by key in ascending order, returned as a `Collection`.

```php
$modules = Module::sortBy('name');
```

### sortByDesc
Get all modules sorted by key in descending order, returned as a `Collection`.

```php
$modules = Module::sortByDesc('name');
```

### exists
Check if given module exists, returns a `Boolean`.

```php
if (Module::exists('blog')) {
    // Do something with it
}
```

### count
Returns a count of all modules.

```php
$count = Module::count();
```

### getManifest
Get a module's manifest contents, returned as a `Collection`.

```php
$manifest = Module::getManifest('blog');
```

### get
Returns the given module manifest property value. If a value is not found, you may define a default value as the second parameter.

```php
$name = Module::get('blog::post_limit', 15);
```

### set
Set the given module manifest property value.

```php
Module::get('blog::description', 'This is a fresh new description of the blog module.');
```

### enabled
Gets all enabled modules, returned as a `Collection`.

```php
$enabled = Module::enabled();
```

### disabled
Gets all disabled modules, returned as a `Collection`.

```php
$disabled = Module::disabled();
```

### isEnabled
Checks if the given module is enabled, returns a `Boolean`.

```php
if (Module::isEnabled('blog')) {
    // Do something
}
```

### isDisabled
Checks if the given module is disabled, returns a `Boolean`.

```php
if (Module::isDisabled('blog')) {
    // Do something
}
```

### enable
Enable the given module.

```php
Module::enable('blog');
```

### disable
Disable the given module.

```php
Module::disable('blog');
```
