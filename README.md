# ScrivitoTableWidget

A Scrivito widget representing a table you can place onto your pages. Lets you edit table cells comfortably, add and remove rows and columns, apply different styles and more.

## Installation

Add this line to your application's `Gemfile`:

    gem 'scrivito_table_widget'

Add this line to your editing JavaScript manifest:

    //= require scrivito_table_widget

Add this line to your application stylesheet manifest:

    *= require scrivito_table_widget

You have to activate the table editor in your select editor JavaScript:

```js
scrivito.select_editor(function(element, editor) {
  editor.use("table_editor");
});
```

## Configuration

You can change the list of available background colors setting the defaults like:

```js
$.fn.edittable.defaults.colorClasses = ['your', 'background', 'class', 'names']
```

Please make sure, that you have set the background colors for the named class in your css.
