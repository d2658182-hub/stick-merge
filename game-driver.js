/*
 * game-driver.js — neutral offline replacement for the Poki SDK (poki-sdk.js v2).
 * Used by the offline builds of the Phaser 3 + Spine original (TinyDobbins) and
 * "Dreadhead Parkour" (Construct 3, gametornado).
 *
 * Implements the exact API surface both games call:
 *   init, setDebug, gameLoadingStart, gameLoadingProgress, gameLoadingFinished,
 *   gameplayStart, gameplayStop, commercialBreak, rewardedBreak,
 *   happyTime, customEvent, displayAd, destroyAd, captureError, measure
 *
 * Offline behaviour:
 *   - init() resolves {loaded:true, adBlock:false} immediately. Dreadhead's
 *     Poki plugin destructures {loaded, adBlock} from the promise, so a plain
 *     resolve() would disable the rewarded path; resolving the object keeps
 *     every feature alive.
 *   - commercialBreak() resolves immediately — a pending promise here would
 *     freeze the game at the next interstitial.
 *   - rewardedBreak() resolves true immediately (reward auto-granted).
 *   - displayAd/destroyAd are no-ops (no banner ad server offline).
 */
(function () {
  'use strict';
  if (window.PokiSDK && window.PokiSDK.__offlineDriver) return;

  var log = function () {
    try { console.info.apply(console, ['[GameDriver]'].concat([].slice.call(arguments))); } catch (e) {}
  };

  var driver = {
    __offlineDriver: true,

    init: function () {
      log('init (offline) -> {loaded:true, adBlock:false}');
      return Promise.resolve({ loaded: true, adBlock: false });
    },

    setDebug: function (value) {
      log('setDebug', value, '(ignored, offline)');
    },

    gameLoadingStart: function () { log('gameLoadingStart'); },
    gameLoadingProgress: function () { /* no-op offline */ },
    gameLoadingFinished: function () { log('gameLoadingFinished'); },

    gameplayStart: function () { /* analytics: no-op offline */ },
    gameplayStop: function () { /* analytics: no-op offline */ },

    // Interstitial: resolve immediately so the game never stalls.
    commercialBreak: function () {
      log('commercialBreak (skipped, offline)');
      return Promise.resolve();
    },

    // Rewarded: no ad to watch offline — grant the reward right away.
    rewardedBreak: function () {
      log('rewardedBreak (auto-granted, offline)');
      return Promise.resolve(true);
    },

    happyTime: function () { /* analytics: no-op */ },
    customEvent: function () { /* analytics: no-op */ },
    captureError: function (err) { log('captureError', err && (err.message || err)); },
    measure: function () { /* analytics: no-op */ },

    // Banner ads: nothing to display offline.
    displayAd: function (container, size) {
      log('displayAd (skipped, offline)', size);
      if (container && container.style) container.style.display = 'none';
    },
    destroyAd: function (container) {
      if (container && container.style) container.style.display = 'none';
    },

    isAdBlocked: function () { return false; }
  };

  window.PokiSDK = driver;

  // Some Poki wrapper glues call a host-page callback the real wrapper never
  // defines either; give it a safe no-op so boot doesn't throw.
  if (typeof window.continueToGame !== 'function') {
    window.continueToGame = function () { /* offline: nothing to wait for */ };
  }
})();
