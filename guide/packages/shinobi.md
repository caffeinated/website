---
title: Shinobi
---

# Shinobi

<div class="badges">

[![Source](https://img.shields.io/badge/source-caffeinated/shinobi-blue.svg?style=flat-square)](https://github.com/caffeinated/shinobi)
[![Latest Stable Version](https://poser.pugx.org/caffeinated/shinobi/v/stable?format=flat-square)](https://packagist.org/packages/caffeinated/shinobi)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://tldrlegal.com/license/mit-license)
[![Total Downloads](https://img.shields.io/packagist/dt/caffeinated/shinobi.svg?style=flat-square)](https://packagist.org/packages/caffeinated/shinobi)

</div>

Shinobi brings a simple and light-weight role-based permissions system to Laravel's built in Auth system.

[[toc]]

## ACL (Access Control List)

- Every user can have zero or more permissions.
- Every user can have zero or more roles.
- Every role can have zero or more permissions.
- Every role can have one of two special flags, `all-access` and `no-access`

## Installation
Simply install the package through Composer. From here the package will automatically register its service provider and `Shinobi` facade.

```
composer require caffeinated/shinobi
```

We will document both versions `3.4` and `4.0`. Both versions support Laravel `5.8`. If you are currently on the `3.x` release, please take this time to upgrade to the latest version :v:

### Middleware
Shinobi provides middleware that you may assign to specific routes in your application. To register, simply append the following middleware to your `app/Http/Kernel.php` file under the `$routeMiddleware` property.

#### Check If User Has A Given Role
```php
'has.role' => \Caffeinated\Shinobi\Middleware\UserHasRole::class,
```

#### Check If User Has A Given Permission
This is available in Shinobi `3.4`. `4.0` does not include this as it hooks in to Laravel's gate system. If using Laravel `5.8` and Shinobi `4.0`, simply use Laravel's `can` middleware to check permissions.

```php
'has.permission' => \Caffeinated\Shinobi\Middleware\UserHasPermission::class,
```

### Migrations
Publish the provided migration files with the `vendor:publish` Artisan command.

```
php artisan vendor:publish --provider="Caffeinated\Shinobi\ShinobiServiceProvider"
```

## Usage

### `4.0`
Add the `HasRolesAndPermissions` trait to your `User` model.

```php
use Illuminate\Foundation\Auth\User as Authenticatable;
use Caffeinated\Shinobi\Concerns\HasRolesAndPermissions;

class User extends Authenticatable
{
    use HasRolesAndPermissions;

    ...
}
```

#### `roles`
Returns assigned roles for the given user.

```php
$roles = auth()->user()->roles;
```

#### `hasRole`
Checks if the given user has the specified role.

```php
$isEditor = auth()->user()->hasRole('editor');
```

#### `assignRoles`
Assign the given role(s) to the user, by their slug.

```php
auth()->user()->assignRoles('editor', 'vip');
```

#### `removeRoles`
Remove the given role(s) from the user, by their slug.

```php
auth()->user()->removeRoles('vip');
```

#### `syncRoles`
Sync the given role(s) for the user, by their slug. Any roles not provided will be removed from the user.

```php
auth()->user()->syncRoles('moderator');
```

#### `permissions`
Returns assigned permissions for the given user (or role).

```php
$permissions = auth()->user()->permissions;
```

#### `hasPermissionTo`
Checks if the given user (or role) has the specified permission.

```php
$isEditor = auth()->user()->hasPermissionTo('edit.pages');
```

#### `can`
The `can` method provided by Laravel may also be used. Behind the scenes, the gate policies Shinobi registers runs permissions through the `hasPermissionTo` method detailed above :v:

#### `givePermissionTo`
Give the user (or role) specific permission(s).

```php
auth()->user()->givePermissionTo('edit.pages', 'create.pages', 'delete.pages');
```

#### `revokePermissionTo`
Revoke the given permission(s) from the user (or role).

```php
auth()->user()->revokePermissionTo('access.admin');
```

#### `syncPermissions`
Sync the given permission(s) against the user (or role). Any permissions not specified will be revoked.

```php
auth()->user()->syncPermissions('edit.users', 'create.users', 'delete.users', 'view.users');
```

### `3.4`
Add the `ShinobiTrait` trait to your `User` model.

```php
use Caffeinated\Shinobi\Traits\ShinobiTrait;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use ShinobiTrait;

    ...
}
```

## Roles vs. Permissions
It's better for your application in the long run to simply check against permissions rather than specific roles. Roles are interchangeable and dynamic, having the ability to be assigned fine-grained permissions.

So instead of checking if a user has an `admin` role, check for a `access.admin` permission. In the future you may want to add Editors or Moderators that will need access to your admin section. If you hard coded the role in your code, you'd have to backtrack every instance where it checks for an `admin` role and add in conditionals for `editor` and `moderator`. Much easier to simply assign the `access.admin` permission to your Editor and Moderator roles and be done :v: