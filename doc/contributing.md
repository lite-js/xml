Contributing
============

## Construction

## Scripts

### Dev Server

```shell
$ gulp
```

Start a development server, pages below would be activated (file changes will trigger building automatically).

* Homepage: http://127.0.0.1:2047/
* Tests: http://127.0.0.1:2047/spec/

### Building(Packing)

```shell
$ gulp pack
```

Packing, generates products into directory `/dist`.

### Linting

```shell
$ gulp lint
# equals gulp eslint && gulp htmlhint
```

Linting.

### Templates

```shell
$ gulp template2module
```

Converting templates (`/src/template/*` and `/lib/template/*`) into js modules.

### Others

* `$ gulp commonjs2es6` (be careful)
* `$ gulp jsdoc`
* `$ gulp svg-sprite` (not ready yet)
