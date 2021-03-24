---
title: Bonsai
---

# Bonsai

<div class="badges">

[![Source](https://img.shields.io/badge/source-caffeinated/bonsai-blue.svg?style=flat-square)](https://github.com/caffeinated/bonsai)
[![Latest Stable Version](https://poser.pugx.org/caffeinated/bonsai/v/stable?format=flat-square)](https://packagist.org/packages/caffeinated/bonsai)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://tldrlegal.com/license/mit-license)
[![Total Downloads](https://img.shields.io/packagist/dt/caffeinated/bonsai.svg?style=flat-square)](https://packagist.org/packages/caffeinated/bonsai)

</div>

**Bonsai** (盆栽, lit. *plantings in tray*, from *bon*, a tray or low-sided pot and *sai*, a planting or plantings, is a Japanese art form using miniature trees grown in containers.

Bonsai gives you the ability to register assets to be loaded at runtime within your Laravel projects.

[[toc]]

## Installation
Simply install the package through Composer. From here the package will automatically register its service provider and `Bonsai` facade.

```
composer require caffeinated/bonsai
```

## Basic Usage
First, plant your bonsai, you can use view composer. You may optionally register assets during this time as well.

```php
Bonsai::plant(function($asset) {
	$asset->add('assets/css/bootstrap.css', 'bootstrap');
	$asset->add('assets/css/test.css')->dependsOn('bootstrap');
	$asset->add('assets/css/bootstrap.css', 'bootstrap');                // Duplicate assets will be caught and ignored.
	$asset->add('assets/js/jquery.js', 'jquery');
	$asset->add('assets/js/bootstrap.js', 'bootstrap')->dependsOn('jquery');
});
```

Now, to add assets at anytime (and anywhere in your code), simply call `Bonsai:add()`:

```php
Bonsai::add('assets/css/example.css');
```

Also, you can use json files

```php
Bonsai::add('assets/json/main.bonsai.json'); 		// extension must be ".bonsai.json"
```

The above json file may content:

```json
{
    "assets/css/bootstrap.css":{"namespace":"bootstrap"},
    "assets/css/test.css":{"dependency":"bootstrap"},
    "assets/css/example.css":{},
    "assets/js/jquery.js":{"namespace":"jquery"},
    "assets/js/bootstrap.js":{"namespace":"bootstrap","dependency":"jquery"}
}
```

## Defining Dependencies
Assets may depend on other assets being loaded before them. You can easily tell Bonsai about any dependencies your asset files may have against each other by using the `dependsOn()` method.

```php
Bonsai::add('assets/css/example.css')->dependsOn('bootstrap');
Bonsai::add('assets/css/bootstrap.css', 'bootstrap');
```

The above will generate the following CSS:

```html
<link rel="stylesheet" href="assets/css/bootstrap.css">
<link rel="stylesheet" href="assets/css/example.css">
```

## Rendering Assets
To echo out your assets within your layout, simply use the `@bonsai` Blade directive, specifying the asset type you wish to output:

```html
@bonsai('css')

@bonsai('js')
```
