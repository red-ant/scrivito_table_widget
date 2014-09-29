(function($, App) {
  'use strict';

  var activeElement = null;
  var initialized = false;
  var activeTable = null;
  var keysBound = false;
  var rows = 0;
  var cols = 0;

  $.fn.edittable = function(opts) {
    $.fn.edittable.options = $.extend({
      css_class: 'table table-responsive table-striped',
      header: true
    }, opts);

    activeTable = this.prop("tagName") == "DIV" ? this : this.parents("[data-editor=table-editor]");

    if(!keysBound) {
      $.fn.edittable.bindKeys();
    }

    if(!initialized || activeTable != this) {
      $.fn.edittable.initialize(this);
    }

    activeElement = this.prop("tagName") == "DIV" ? this.find("td, th").first() : this;
    activeElement.attr("contenteditable", true);


    rows = $.fn.edittable.getRowCount();
    cols = $.fn.edittable.getColCount();
  };

  $.fn.edittable.getRowCount = function() {
    return activeTable.find("tbody tr").length;
  };

  $.fn.edittable.getColCount = function() {
    return activeTable.find("tbody tr").first().children().length;
  };

  $.fn.edittable.initialize = function(element) {
    if(element.prop("tagName") == "DIV" && element.html() === "") {
      $.fn.edittable.createNewTable(element);
    }
    initialized = true;
  };

  $.fn.edittable.table = function(element) {
    var tableContent = activeTable.html();

    activeElement.removeAttr("contenteditable");
    activeElement = null;
    activeTable = null;
    initialized = false;

    rows = 0;
    cols = 0;
    return tableContent;
  };

  $.fn.edittable.createNewTable = function(element) {
    if($.fn.edittable.options.header) {
      element.html("<table class='"+ $.fn.edittable.options.css_class +"'><thead><tr><th>TableHead</th></tr></thead><tbody><tr><td>Content</td></tr></tbody></table>");
    } else {
      element.html("<table class='"+ $.fn.edittable.options.css_class +"'><tbody><tr><td>Content</td></tr></tbody></table>");
    }
  };

  $.fn.edittable.bindKeys = function() {
    $('body').keydown(function(e) {
      if (e.ctrlKey || e.metaKey) {
        if(e.keyCode == 8) { // CMD + Backspace
          e.preventDefault();
          $.fn.edittable.removeColumn();
        }
        if(e.keyCode == 13) { // CMD + Enter
          e.preventDefault();
          $.fn.edittable.removeRow();
        }
      }
      if(e.altKey) {
        if(e.keyCode == 9) { // Alt+Tab
          e.preventDefault();
          $.fn.edittable.addColumn();
        }
        if(e.keyCode == 13) { // Alt+Enter
          e.preventDefault();
          $.fn.edittable.addRow();
        }
      }
    });
    keysBound = true;
  };

  $.fn.edittable.addRow = function() {
    var newRow = "<tr>"+ new Array(cols + 1).join("<td>Content</td>"); +"</tr>";
    if(activeElement.prop("tagName") == "TH") {
      activeTable.find("tbody").prepend(newRow);
    } else {
      activeElement.parents("tr").first().after(newRow);
    }
    rows += 1;
  };

  $.fn.edittable.addColumn = function() {
    var pos = activeElement.index();
    $(activeTable.find("thead tr").find("th")[pos]).after("<th>TableHead</th>");
    activeTable.find("tbody tr").each(function(index, row) {
      $($(row).find("td")[pos]).after("<td>Content</td>");
    });
    cols += 1;
  };

  $.fn.edittable.removeColumn = function() {
    var pos = activeElement.index();
    if(window.confirm("Delete this column?")) {
      activeTable.find("tr").each(function(index, row) {
        $(row).children()[pos].remove();
      });
    }
  };

  $.fn.edittable.removeRow = function() {
    if(window.confirm("Delete this row?")) {
      activeElement.parents("tr").remove();
    }
  };

})(jQuery, this);