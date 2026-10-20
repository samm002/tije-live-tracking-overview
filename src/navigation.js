(function (root) {
  'use strict';
  function normalize(state, scenes) {
    const index = Math.max(0, Math.min(scenes.length - 1, Number.isFinite(state.index) ? Math.trunc(state.index) : 0));
    return {index, step: Math.max(0, Math.min(scenes[index].steps.length - 1, Number.isFinite(state.step) ? Math.trunc(state.step) : 0))};
  }
  function parse(hash, scenes) {
    const id = String(hash || '').replace(/^#/, '');
    return normalize({index: Math.max(0, scenes.findIndex(s => s.id === id)), step: 0}, scenes);
  }
  function next(state, scenes) {
    const s = normalize(state, scenes);
    if (s.step < scenes[s.index].steps.length - 1) s.step++;
    else if (s.index < scenes.length - 1) {s.index++; s.step = 0;}
    return s;
  }
  function previous(state, scenes) {
    const s = normalize(state, scenes);
    if (s.step > 0) s.step--;
    else if (s.index > 0) {s.index--; s.step = scenes[s.index].steps.length - 1;}
    return s;
  }
  function hash(state, scenes) {return '#' + scenes[state.index].id;}
  root.TrackingNavigation = {normalize, parse, next, previous, hash};
})(typeof window === 'undefined' ? globalThis : window);
