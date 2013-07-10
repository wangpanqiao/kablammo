"use strict";


function Kablammo() {
  var self = this;

  this._iface         = new Interface();
  this._grapher       = new Grapher();
  this._parser        = new BlastParser();
  this._loader        = new BlastResultsLoader(this._parser);
  this._results_table = '#hits';

  this._iface.configure_query_form(function(blast_results_filename) {
    self._loader.load_from_server(blast_results_filename, function(results) {
      self._display_results(results);
    });
  }, function(local_file) {
    self._loader.load_local_file(local_file, function(results) {
      self._display_results(results);
    });
  });

  // Uncomment the line below to load results from server when application first launches.
  //self._iface.display_results();
}

Kablammo.prototype._display_results = function(results) {
  this._grapher.display_blast_iterations(results.filtered_iterations, this._results_table, this._iface);
  this._iface.update_results_info(results);
  Interface.hide_curtain();
  Interface.scroll_to('#results-container');
}

function main() {
  new Kablammo();
}

main();